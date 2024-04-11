<template>
      <v-container
      style="padding-top: 180px; padding-inline: 250px; z-index: 200"
      fluid
      class="d-flex pb-15 flex-column"
      :style="{
        backgroundImage: current.dark ? '' : 'linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%)',
        paddingInline: name == 'lg' ? '250px' : '400px'
    }"  
    >
      <h1 class="text-h2 font-weight-bold text-center" style="line-height: 1.2">
        Boost productivity with <span class="text-primary">Efficiently</span>.
        Stay organized, focused, and efficient.
      </h1>
      <h3 class="font-weight-regular mt-5 px-15 text-center">
        Transform Your Daily Routine into a Productivity Powerhouse: Seamlessly
        Manage Tasks, Enhance Focus, and Unleash Your Efficiency Potential with
        Our Cutting-Edge App
      </h3>
      <div class="d-flex justify-center mt-12">
        <v-btn
          color="primary"
          class="font-weight-bold rounded-lg text-capitalize"
          size="x-large"
          flat
          @click="$router.push({ name: 'auth-login' })"
          >Get's started for free</v-btn
        >
      </div>
      <div
        id="screenshots"
        class="py-10"
        style="width: 100%; height: 648px; position: relative"
      >
        <v-card id="screenshot-home" class="rounded-lg" elevation="5">
          <v-card
            height="40"
            class="pa-2 rounded-0 border-b d-flex align-center"
          >
            <div class="d-flex mr-15 ml-2">
              <v-icon class="ml-1" color="success" size="18">mdi-circle</v-icon>
              <v-icon class="ml-1" color="warning" size="18">mdi-circle</v-icon>
              <v-icon class="ml-1" color="error" size="18">mdi-circle</v-icon>
            </div>
          </v-card>
          <v-img src="/screenshots/home.png"></v-img>
        </v-card>
        <v-card id="screenshot-project" class="rounded-lg" elevation="5">
          <v-card
            height="40"
            class="pa-2 rounded-0 border-b d-flex align-center"
          >
            <div class="d-flex mr-15 ml-2">
              <v-icon class="ml-1" color="success" size="18">mdi-circle</v-icon>
              <v-icon class="ml-1" color="warning" size="18">mdi-circle</v-icon>
              <v-icon class="ml-1" color="error" size="18">mdi-circle</v-icon>
            </div>
          </v-card>
          <v-img src="/screenshots/project.png"></v-img>
        </v-card>
        <v-card id="screenshot-schedule" class="rounded-lg" elevation="5">
          <v-card
            height="40"
            class="pa-2 rounded-0 border-b d-flex align-center"
          >
            <div class="d-flex mr-15 ml-2">
              <v-icon class="ml-1" color="success" size="18">mdi-circle</v-icon>
              <v-icon class="ml-1" color="warning" size="18">mdi-circle</v-icon>
              <v-icon class="ml-1" color="error" size="18">mdi-circle</v-icon>
            </div>
          </v-card>
          <v-img src="/screenshots/schedule.png"></v-img>
        </v-card>
        <v-card id="screenshot-report" class="rounded-lg" elevation="5">
          <v-card class="pa-2 rounded-0 d-flex align-center">
            <div class="d-flex mr-15 ml-2">
              <v-icon class="ml-1" color="success" size="18">mdi-circle</v-icon>
              <v-icon class="ml-1" color="warning" size="18">mdi-circle</v-icon>
              <v-icon class="ml-1" color="error" size="18">mdi-circle</v-icon>
            </div>
          </v-card>
          <v-img src="/screenshots/statistics.png"></v-img>
        </v-card>
      </div>
    </v-container>
    <v-container
      fluid
      class="w-100 px-0"
      :class="current.dark ? 'bg-surface' : 'bg-grey-lighten-4'"
    >
      <marquee>
        <div class="d-flex align-center py-2">
          <v-icon size="55" class="mx-15" color="grey-darken-2"
            >mdi-vuejs</v-icon
          >
          <v-icon size="55" class="mx-15" color="grey-darken-2"
            >mdi-nuxt</v-icon
          >
          <v-icon size="55" class="mx-15" color="grey-darken-2"
            >mdi-vuetify</v-icon
          >
          <v-icon size="55" class="mx-15" color="grey-darken-2"
            >mdi-github</v-icon
          >
          <v-icon size="55" class="mx-15" color="grey-darken-2"
            >mdi-post</v-icon
          >
          <v-icon size="55" class="mx-15" color="grey-darken-2"
            >mdi-microsoft-visual-studio-code</v-icon
          >
        </div>
      </marquee>
    </v-container>
</template>

<script setup lang="ts">
const {current} = useTheme()
const {name} = useDisplay()
</script>

<style scoped>
#screenshots {
  display: flex;
}

#screenshots > * {
  width: 90%;
  height: 492px;
  position: absolute;
  top: 50px;
}

#screenshot-home {
  left: -120px;
  top: 150px;
}

#screenshot-project {
  left: 50%;
  z-index: 100;
  transform: translateX(-50%);
}

#screenshot-schedule {
  left: 120px;
  top: 220px;
  z-index: 50;
}

#screenshot-report {
  left: 220px;
  top: 100px;
  height: 422px;
}
</style>