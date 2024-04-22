<template>
  <UtilsThemeBackground
    id="video"
    ref="video"
    style="position: fixed; top: 0; left: 0"
  ></UtilsThemeBackground>
  <v-app-bar
    class="pa-0 border-b px-5 bg-surface"
    :color="name == 'dark' ? '' : 'primary'"
    :model-value="!preference.hideBar"
    density="compact"
    flat
    v-if="user"
  >
    <AppLogo
      style="font-size: 22px"
      id="logo"
      @click="$router.push({ name: 'index' })"
    ></AppLogo>
    <v-spacer></v-spacer>
    <v-tabs
      id="navigation-tabs"
      stacked
      style="position: absolute; left: 50%; transform: translateX(-50%)"
    >
      <v-tab
        size="small"
        style="opacity: 0.8"
        class="text-capitalize"
        @click="$router.push({ name: 'r-access-home' })"
      >
        <v-icon>mdi-home</v-icon>
        Home
      </v-tab>
      <v-tab
        size="small"
        style="opacity: 0.8"
        class="text-capitalize"
        :to="{ name: 'r-access-projects' }"
      >
        <v-icon>mdi-square-edit-outline</v-icon>
        Projects
      </v-tab>
      <v-tab
        size="small"
        style="opacity: 0.8"
        class="text-capitalize"
        :to="{ name: 'r-access-schedules' }"
      >
        <v-icon>mdi-calendar</v-icon>
        Schedules
      </v-tab>
      <v-tab
        size="small"
        :to="{ name: 'r-access-performance' }"
        style="opacity: 0.8"
        class="text-capitalize"
      >
        <v-icon>mdi-chart-arc</v-icon>
        Performance
      </v-tab>
    </v-tabs>
    <v-spacer></v-spacer>

    <v-btn
      class="ml-2"
      variant="text"
      size="small"
      :icon="!preference.sounds.all.value ? 'mdi-volume-off' : preference.sounds.all.value < 100 ? 'mdi-volume-medium' : 'mdi-volume-high'"
      @click="toggleMute"
      id="sound-button"
    ></v-btn>
    <v-btn
      class="ml-2"
      variant="text"
      size="small"
      icon="mdi-arrow-expand"
      @click="fullscreen"
      id="expand-button"
    ></v-btn>
    <NotificationMenuCard v-slot="props">
      <v-badge v-bind="props" dot color="red" class="ml-2" :model-value="false">
        <v-btn variant="text" id="notification-button" size="small" icon="mdi-bell"></v-btn>
      </v-badge>
    </NotificationMenuCard>
    <v-divider vertical class="mx-4" inset></v-divider>
    <v-menu>
      <template #activator="{ props }">
        <v-avatar
          id="profile-picture"
          v-bind="props"
          size="35"
          class="border text-caption font-weight-bold ml-2"
          color="#F5E8C7"
          style="z-index: 20"
        >
          <v-img :src="user.picture"></v-img>
        </v-avatar>
      </template>
      <v-card width="150">
        <v-list>
          <v-list-item prepend-icon="mdi-logout" @click="$user.logout"
            >Logout</v-list-item
          >
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
  <ClientOnly>
    <slot></slot>
    <template #fallback>
      <v-main> <Loading></Loading></v-main>
    </template>
  </ClientOnly>
  <tools></tools>
  <NotificationContainer></NotificationContainer>
  <audio id="audio-celebration" src="/audio/celebration.mp3"></audio>
</template>

<script setup lang="ts">
import { useTimeSpentStore } from "../stores/timeSpent";
const $user = useUserStore();
const { user } = storeToRefs(useUserStore());
const {preference} = storeToRefs(usePreferenceStore())
const { name } = useTheme();
const { todayTimeSpent } = storeToRefs(useTimeSpentStore());
const $timespent = useTimeSpentStore();
const $timer = useTimerStore()
function fullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
}
let interval: null | NodeJS.Timeout = null;
let timeout: null | NodeJS.Timeout = null;
const duration = computed(() => ((todayTimeSpent.value?.spent || 0) / (1000 * 60 * 60)) >= 2 ? 1000 * 60 * 25 : 1000 * 60 * 5)
onMounted(() => {
  $timespent.getTimeSpent().then(() => {
    interval = setInterval(() => {
      $timespent.update()
    }, duration.value);
  });

  // document.onvisibilitychange = () => {
  //   if (document.visibilityState == "hidden") {
  //     if (interval) clearInterval(interval);
  //     timeout = setTimeout(() => {
  //       $timespent.update().then(() => {
  //         if(todayTimeSpent.value){
  //           const remaining = (1000 * 60 * 60 * 2) - todayTimeSpent.value.spent
  //           if(remaining){
  //             const hours = Math.floor((remaining / (1000 * 60)) / 60)
  //             const minutes = Math.floor((remaining / (1000 * 60)) % 60)
              
  //             if((hours > 0 || minutes > 0) && preference.value.notifications.dailySpend.value && !preference.value.notifications.all.value){
  //               var notification = new Notification("Daily Usage Reminder", {
  //                 body: `You still have ${Math.floor(hours)}hr and ${Math.floor(minutes)}min remaining time to spend in the app today. Keep up the good work!`,
  //                 icon: "/favicon.png" // Path to the notification icon
  //               });
  //             }
  //           }
  //         }
  //       })
  //     }, 1500);
  //   } else {
  //     if(timeout) return clearTimeout(timeout)
  //     interval = setInterval(() => {
  //       $timespent.update()
  //     },  duration.value);
  //   }
  // };

  window.onbeforeunload = () => {
    $timespent.update()
  }

  window.onmousemove = () => {
    $timer.unsetAlert()
  }
  
  if (Notification.permission == 'default') {
      Notification.requestPermission()
  }

  if(user.value){
    //@ts-ignore
    watch(() => user.value.guide, () => {
      $user.updateGuide()
    }, {deep: true})
  }
});



function toggleMute(){
  const allSound = preference.value.sounds.all.value
  if(!allSound){
    preference.value.sounds.all.value = 100
  }else if(allSound < 99){
    preference.value.sounds.all.value = 100
  }else{
    preference.value.sounds.all.value = 0
  }
}

watch(() => [preference.value.sounds.celebration.value, preference.value.sounds.all.value], () => {
  const audionCelebration : HTMLAudioElement = document.getElementById('audio-celebration') as HTMLAudioElement
  if(audionCelebration){
    console.log('triggered')
    const celebrationSound = preference.value.sounds.celebration.value
    const allSoundPercent = preference.value.sounds.all.value / 100
    const reduceSound = celebrationSound * allSoundPercent
    audionCelebration.volume = 0
  }
})
</script>

<style>
body::-webkit-scrollbar {
  width: 0;
}
</style>
