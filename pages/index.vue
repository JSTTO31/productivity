<template>
  <v-main class="pt-0">
    <v-container
      style="padding-top: 180px;padding-inline: 250px;z-index: 200;;"
      fluid class="d-flex pb-15 flex-column" :style="current.dark ? '' : 'background-image: linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);'">
      <h1 class="text-h2 font-weight-bold text-center" style="line-height: 1.2;">
        Boost productivity with <span class="text-primary">Efficiently</span>. Stay organized, focused, and efficient.
      </h1>
      <h3 class="font-weight-regular mt-5 px-15 text-center">Transform Your Daily Routine into a
        Productivity Powerhouse:
        Seamlessly Manage Tasks, Enhance Focus, and Unleash Your Efficiency Potential with Our Cutting-Edge App</h3>
      <div class="d-flex justify-center mt-12">
        <v-btn color="primary" class="font-weight-bold rounded-lg text-capitalize" size="x-large" flat @click="$router.push({name: 'auth-login'})">Get's started for free</v-btn>
        <!-- <v-btn variant="plain" append-icon="mdi-play" class="font-weight-bold text-capitalize ml-5" size="large">Watch
            our video</v-btn> -->
      </div>
      <div id="screenshots" class="py-10" style="width: 100%;height: 648px;position: relative;">
        <v-card id="screenshot-home" class="rounded-lg" elevation="5">
          <v-card height="50" class="pa-2 rounded-0 border-b d-flex align-center">
            <div class="d-flex mr-15 ml-2">
              <v-icon class="ml-1" color="success" size="18">mdi-circle</v-icon>
              <v-icon class="ml-1" color="warning" size="18">mdi-circle</v-icon>
              <v-icon class="ml-1" color="error" size="18">mdi-circle</v-icon>
            </div>
            <div class="w-25">
              <v-text-field density="compact" readonly hide-details variant="solo-filled" flat
                prepend-inner-icon="mdi-magnify" single-line label="Search..."></v-text-field>
            </div>
          </v-card>
          <v-img src="/screenshots/home.png"></v-img>
        </v-card>
        <v-card id="screenshot-project" class="rounded-lg" elevation="5">
          <v-card height="50" class="pa-2 rounded-0 border-b d-flex align-center">
            <div class="d-flex mr-15 ml-2">
              <v-icon class="ml-1" color="success" size="18">mdi-circle</v-icon>
              <v-icon class="ml-1" color="warning" size="18">mdi-circle</v-icon>
              <v-icon class="ml-1" color="error" size="18">mdi-circle</v-icon>
            </div>
            <div class="w-25">
              <v-text-field density="compact" readonly hide-details variant="solo-filled" flat
                prepend-inner-icon="mdi-magnify" single-line label="Search..."></v-text-field>
            </div>
          </v-card>
          <v-img src="/screenshots/project.png"></v-img>
        </v-card>
        <v-card id="screenshot-schedule" class="rounded-lg" elevation="5">
          <v-card height="50" class="pa-2 rounded-0 border-b d-flex align-center">
            <div class="d-flex mr-15 ml-2">
              <v-icon class="ml-1" color="success" size="18">mdi-circle</v-icon>
              <v-icon class="ml-1" color="warning" size="18">mdi-circle</v-icon>
              <v-icon class="ml-1" color="error" size="18">mdi-circle</v-icon>
            </div>
            <div class="w-25">
              <v-text-field density="compact" readonly hide-details variant="solo-filled" flat
                prepend-inner-icon="mdi-magnify" single-line label="Search..."></v-text-field>
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
            <div class="w-25">
              <v-text-field density="compact" readonly hide-details variant="solo-filled" flat
                prepend-inner-icon="mdi-magnify" single-line label="Search..."></v-text-field>
            </div>
          </v-card>
          <v-img src="/screenshots/statistics.png"></v-img>
        </v-card>
      </div>
    </v-container>
    <v-container fluid class="w-100 bg-grey-lighten-4 px-0">
      <marquee>
        <div class="d-flex align-center py-2">
          <v-icon size="55" class="mx-15" color="grey-darken-2">mdi-vuejs</v-icon>
          <v-icon size="55" class="mx-15" color="grey-darken-2">mdi-nuxt</v-icon>
          <v-icon size="55" class="mx-15" color="grey-darken-2">mdi-vuetify</v-icon>
          <v-icon size="55" class="mx-15" color="grey-darken-2">mdi-github</v-icon>
          <v-icon size="55" class="mx-15" color="grey-darken-2">mdi-post</v-icon>
          <v-icon size="55" class="mx-15" color="grey-darken-2">mdi-microsoft-visual-studio-code</v-icon>
        </div>
      </marquee>
    </v-container>
    <v-container fluid style="padding-inline: 130px;" class="pt-15 pb-15">
      <div class="d-flex flex-column">
        <h3 class="text-center font-weight-bold mb-2 text-grey-darken-2">Features</h3>
        <h1 class="text-center text-h4 font-weight-bold" style="font-family: 'Lato', sans-serif;">Relaxing background
        </h1>
        <p class="text-center">Immerse Yourself in Calming Backgrounds, Letting Serenity Guide Your Path to Productive
          Study Sessions</p>
        <v-btn variant="outlined" class="mx-auto mt-5 text-capitalize" size="large" color="primary">try it, it's free</v-btn>
      </div>
      <div class="d-flex">
        <v-card  color="grey-lighten-1" class="rounded-xl w-100 d-flex mt-15 align-center justify-center"
          elevation="5">
          <video class="w-100" loop autoplay muted src="/video/background-features.mp4"></video>
        </v-card>
      </div>
    </v-container>
    <v-container fluid
      style="padding-inline: 115px;padding-bottom: 80px;"
      class="pt-15 bg-blue">
      <div class="d-flex flex-column">
        <h1 class="text-center text-h4 font-weight-bold text-white" style="font-family: 'Lato', sans-serif;">Hear What Others Are
          Saying</h1>
        <p class="text-center text-h6 text-white mt-2">Real Experiences, Real Results - Discover How Our App Transforms Lives</p>
      </div>
      <div class="d-flex mt-15 pt-15">
        <v-col cols="4" class="pt-10" v-for="t, n in testimonial.slice(2)" :key="t.name">
          <v-card elevation="5" :style="{filter: n == 3 ? 'blur(5px)' : ''}" class="pa-5 pt-0 d-flex flex-column rounded-xl" height="400" style="overflow: visible;">
            <v-avatar size="200" class="mx-auto" style="margin-top: -100px;box-shadow: 0 0 18px #888;">
              <v-img :src="`https://source.unsplash.com/random/150x150/?selfie,${t.gender}&example=` + n"></v-img>
            </v-avatar>
            <div>
              <h1 class=" text-center mt-8">{{ t.name }}</h1>
            <h4 class="text-center text-grey-darken-1 font-weight-regular">{{ t.major }}</h4>
            <p class="text-center mt-5 text-subtitle-2 text-grey-darken-2 font-weight-regular">{{ t.testimonial }}</p>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-rating color="primary" density="comfortable" hover length="5" size="64" :model-value="t.rating"
                readonly></v-rating>
              <v-spacer></v-spacer>
            </v-card-actions>
            </div>
          </v-card>
        </v-col>
      </div>
    </v-container>
    <v-container fluid style="padding-inline: 115px;padding-bottom: 60px;" class="pt-15 bg-grey-lighten-5">
      <h3 class="text-center font-weight-bold mb-2 text-grey-darken-2">How it works</h3>
      <h1 class="text-center text-h4 font-weight-bold" style="font-family: 'Ubuntu', sans-serif;">Your Guide to
        Productivity Mastery</h1>
      <p class="text-center text-h6 mt-2 font-weight-regular">Discover the Secrets Behind Seamless Task
        Management and Time Mastery</p>
      <div class="d-flex py-15 flex-wrap">
        <v-col cols="4">
          <v-card class="rounded-lg pa-5 d-flex flex-column" height="250">
            <v-card-text class="px-4">
              <h2 class="mb-2">Customizing background and theme</h2>
              <p class="">Personalize your experience by customizing backgrounds and themes to suit your unique style and preferences.</p>
            </v-card-text>
            <v-card-actions class="border-t">
              <v-btn append-icon="mdi-chevron-right" class="text-capitalize " color="blue-darken-1">Learn more</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="rounded-lg pa-5 d-flex flex-column" height="250">
            <v-card-text class="px-4">
              <h2 class="mb-2">Managing your tasks</h2>
              <p class="">Empower yourself with our detailed task management guide, designed to walk you through the ins and outs of efficiently organizing and overseeing your tasks.</p>
            </v-card-text>
            <v-card-actions class="border-t">
              <v-btn append-icon="mdi-chevron-right" class="text-capitalize " color="blue-darken-1">Learn more</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="rounded-lg pa-5 d-flex flex-column" height="250">
            <v-card-text class="px-4">
              <h2 class="mb-2">Planning your goals</h2>
              <p class="">Discover how our scheduling system optimizes your time and enhances productivity with our comprehensive guide.</p>
            </v-card-text>
            <v-card-actions class="border-t">
              <v-btn append-icon="mdi-chevron-right" class="text-capitalize " color="blue-darken-1">Learn more</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="rounded-lg pa-5 d-flex flex-column" height="250">
            <v-card-text class="px-4">
              <h2 class="mb-2">Collaborate with your team</h2>
              <p class="">Enhance teamwork and streamline collaboration with our intuitive platform designed to facilitate seamless communication and coordination among team members.</p>
            </v-card-text>
            <v-card-actions class="border-t">
              <v-btn append-icon="mdi-chevron-right" class="text-capitalize " color="blue-darken-1">Learn more</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="rounded-lg pa-5 d-flex flex-column" height="250">
            <v-card-text class="px-4">
              <h2 class="mb-2">Extension Installation</h2>
              <p class="">Effortlessly install our extension to seamlessly integrate our platform with your preferred browsers, expanding your productivity capabilities with ease.</p>
            </v-card-text>
            <v-card-actions class="border-t">
              <v-btn append-icon="mdi-chevron-right" class="text-capitalize " color="blue-darken-1">Learn more</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </div>
    </v-container>
  </v-main>
  <v-footer color="grey-lighten-3 pa-5 py-10">
    <AppLogo class="text-h5"></AppLogo>
    <v-spacer></v-spacer>
    <span class="mr-10 font-weight-bold">Home</span>
    <span class="mr-10 font-weight-bold">Features</span>
    <span class="mr-10 font-weight-bold">Testimonial</span>
    <span class="mr-10 font-weight-bold">Guides</span>
    <span class="mr-10 font-weight-bold">Pricing</span>
    <span class="mr-10 font-weight-bold">FAQ</span>
    <v-icon class="mr-5 ml-10">mdi-facebook</v-icon>
    <v-icon class="mr-5">mdi-twitter</v-icon>
    <v-icon class="mr-5">mdi-instagram</v-icon>
    <v-icon class="mr-5">mdi-github</v-icon>
  </v-footer>
  <v-footer color="grey-darken-4" class="d-flex justify-center">
    © Efficiently 2024. All Rights Reserved. | Privacy Policy | Terms of Service | Contact Us
  </v-footer>
</template>
<script setup lang="ts">
const {current} = useTheme()
useHead({
  title: 'Efficiently | Gets started to our app',
})

onMounted(() => {
  document.getElementById('spline')?.addEventListener('load', () => {
    const logo = document.getElementById('logo')
    if (logo) logo.style.display = 'none'

  })
})

const testimonial = [
  {
    "name": "Emma Johnson",
    "gender": "female",
    "major": "Computer Science",
    "testimonial": "🌟 Your productivity app has been a game-changer for me. The relaxing background, intuitive task management, comprehensive scheduling, insightful reports, and productivity tools have significantly enhanced my organization and focus. 😊👍",
    "rating": 5
  },
  {
    "name": "David Smith",
    "gender": "male",
    "major": "Engineering",
    "testimonial": "🌟 Impressed by the effectiveness of your app. Calming background, streamlined task management, seamless scheduling, detailed reports, and productivity tools have boosted my efficiency. 🚀💡",
    "rating": 4.8
  },
  {
    "name": "Sophia Lee",
    "gender": "female",
    "major": "Business Administration",
    "testimonial": "🌟 Your app has helped me stay organized and focused. Soothing background, easy task management, flexible scheduling options, insightful reports, and productivity tools. 💼✅",
    "rating": 4.7
  },
  {
    "name": "Ethan Brown",
    "gender": "male",
    "major": "Psychology",
    "testimonial": "🌟 Using your app has been a pleasant experience. Calming background, user-friendly task management, customizable scheduling features, informative reports, and productivity tools. 📊🔧",
    "rating": 4.5
  },
  {
    "name": "Sophie Williams",
    "gender": "female",
    "major": "Environmental Science",
    "testimonial": "🌟 Your app has been a lifesaver! Serene backgrounds, efficient task management, flexible scheduling, detailed reports, and array of productivity tools. 🌿🕒",
    "rating": 4.9
  },
  {
    "name": "Michael Johnson",
    "gender": "male",
    "major": "Mechanical Engineering",
    "testimonial": "🌟 Can't imagine my life without your app now. It's like having a personal assistant at my fingertips! Calming backgrounds, powerful task management, insightful reports. 💪🔍",
    "rating": 4.8
  }
]

</script>
<style scoped>
.testimonial-card{
  transition: .2s ease;
}

.testimonial-card:hover{
  transform: scale(1.2);
  z-index: 100;
}

#screenshots {
  display: flex;
}


#screenshots>* {
  width: 90%;
  height: 492px;
  position: absolute;
  top: 50px;

}

#screenshot-home {
  left: -120px;
  top: 150px
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