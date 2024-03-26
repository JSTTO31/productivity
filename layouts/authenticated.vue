<template>
  <UtilsThemeBackground id="video" ref="video" style="position: fixed;top: 0;left: 0;"></UtilsThemeBackground>
  <v-app-bar class="pa-0 border-b px-5 bg-surface" :color="name == 'dark' ? '' : 'primary'" :model-value="!hideBar"
    density="compact" flat v-if="user">
    <AppLogo style="font-size: 22px;" @click="$router.push({ name: 'index' })"></AppLogo>
    <v-spacer></v-spacer>
    <v-tabs stacked style="position: absolute;left: 50%;transform:translateX(-50%)">
      <v-tab size="small" style="opacity: .8;" class="text-capitalize" @click="$router.push({ name: 'r-access-home' })">
        <v-icon>mdi-home</v-icon>
        Home
      </v-tab>
      <v-tab size="small" style="opacity: .8;" class="text-capitalize"
        :to="{ name: 'r-access-projects' }">
        <v-icon>mdi-square-edit-outline</v-icon>
        Projects
      </v-tab>
      <v-tab size="small" style="opacity: .8;" class="text-capitalize"
        :to="{ name: 'r-access-schedules' }">
        <v-icon>mdi-square-edit-outline</v-icon>
        Schedules
      </v-tab>
      <v-tab size="small" :to="{ name: 'r-access-statistics' }" style="opacity: .8;"
        class="text-capitalize">
      <v-icon>mdi-chart-arc</v-icon>
      Statistics
    </v-tab>
    </v-tabs>
    <v-spacer></v-spacer>
   
    <v-btn class="ml-2" variant="text"  size="small" icon="mdi-volume-high"></v-btn>
    <v-btn class="ml-2" variant="text"  size="small" icon="mdi-arrow-expand" @click="fullscreen"></v-btn>
    <v-badge dot color="red" class="ml-2">
      <v-btn variant="text"  size="small" icon="mdi-bell"></v-btn>
    </v-badge>
    <v-divider vertical class="mx-4" inset></v-divider>
    <v-menu>
      <template #activator="{ props }">
        <v-avatar v-bind="props" size="35" class="border text-caption font-weight-bold ml-2" color="#F5E8C7"
          style="z-index: 20;">
          JS
        </v-avatar>
      </template>
      <v-card width="150">
        <v-list>
          <v-list-item prepend-icon="mdi-logout" @click="$user.logout">Logout</v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
  <ClientOnly>
    <slot></slot>
    <template #fallback>
      <Loading></Loading>
    </template>
  </ClientOnly>
  <navigationDrawerRight></navigationDrawerRight>
  <NotificationContainer></NotificationContainer>
</template>

<script setup lang="ts">
const $user = useUserStore()
const { user } = storeToRefs(useUserStore())
const { name } = useTheme()
const { hideBar } = storeToRefs(useThemeStore())
// const video = ref()
function fullscreen(){
  if(document.fullscreenElement){
    document.exitFullscreen()
  }else{
    document.documentElement.requestFullscreen()
  }
}
</script>

<style>
body::-webkit-scrollbar {
  width: 0;
}

/* .slide-enter-active,
  .slide-leave-active {
    transition: transform .4s ease-out, opacity .2s linear, height 2s linear;
  }
  
  .slide-enter-from,
  .slide-leave-to {
    opacity: .5;
  } */
</style>