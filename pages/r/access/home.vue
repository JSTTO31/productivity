<template>
  <v-main class="h-100">
    <v-carousel :show-arrows="false" class="h-100 w-100" hide-delimiter-background hide-delimiters>
      <v-carousel-item>
        <v-card class="bg-transparent rounded-lg d-flex justify-center flex-column align-center h-100" flat>
          <h1 class="text-white"
            style="line-height: 1;font-family: 'Orbitron', sans-serif;font-weight:200;font-size: 100px;opacity: .8;">
            {{ time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: 'h24' }) }}
          </h1>
          <div class="d-flex align-center">
            <h5 class="text-center font-weight-regular text-white">{{ time.toDateString() }}</h5>
          </div>
        </v-card>
      </v-carousel-item>
    </v-carousel>
    <tips-and-guide-dialog v-model:show="showTips"></tips-and-guide-dialog>
  </v-main>
</template>

<script setup lang="ts">
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
const {user} = storeToRefs(useUserStore())
const time = ref(new Date())
const showTips = ref(!user.value?.guide.tips || false)
setInterval(() => {
  time.value = new Date()
}, 1000)
useHead({
  title: 'Home'
})

definePageMeta({
  layout: 'authenticated',
  middleware: 'auth',
})

onMounted(() => {
  watchEffect(() => {
    if(!showTips.value && user.value && !user.value?.guide.home){
      const driverObj = driver({
          showProgress: true,
          steps: [
              {
                element: '#logo',
                popover: {
                  title: "Logo Navigation",
                  description: "Clicking on the logo will navigate you to the landing page of the application. This provides a quick and convenient way to return to the main page from anywhere within the app."
                }
              },
              {
                element: '#navigation-tabs',
                popover: {
                  title: "Navigation Tabs",
                  description: "The navigation tabs at the top of the screen allow you to easily navigate between different sections of the application. You can switch between the Home, Projects, Schedule, and Performance pages by clicking on the respective tabs."
                }
              },
              {
                element: '#sound-button',
                popover: {
                  title: "Sound Button",
                  description: "The sound button allows you to toggle between mute and unmute modes. Clicking on the button will mute or unmute the sound in the application, providing you with control over the audio playback."
                }
              },
              {
                element: '#expand-button',
                popover: {
                  title: "Expand Button",
                  description: "The expand button allows you to expand the screen, providing you with a fullscreen view of the current page or component. Clicking on the button will expand the view, enabling you to focus on the content without any distractions."
                }
              },
              {
                element: '#notification-button',
                popover: {
                  title: "Notification Button",
                  description: "The notification button provides quick access to view all your notifications. Clicking on this button will open a notification panel where you can see a list of all your recent notifications, keeping you updated on important activities and events within the app."
                }
              },
              {
                element: '#profile-picture',
                popover: {
                  title: "Profile Picture",
                  description: "Your profile picture serves as a quick access point for logging out of your account. Clicking on your profile picture will open a menu where you can find the option to log out, enabling you to securely sign out of your account when needed.",
                  onNextClick(){
                    const tools = document.getElementById('tools-container')
                    if(tools){
                      
                      tools.style.bottom = '6px'
                    }
                    driverObj.moveNext()
                  }
                }
              },
              {
                element: '#tools-container #tools',
                popover: {
                  title: "Tools Container",
                  description: "The tools container provides access to various productivity tools to enhance your workflow. Here, you can find tools such as a text editor, to-do list, timer, and settings. These tools are designed to help you stay organized, focused, and productive while using the app.",
                  onNextClick(){
                    if(user.value){
                      user.value.guide.home = true
                    }
                    driverObj.destroy()
                  }
                }
              }
          ],
          onDestroyStarted: () => {
              if (!driverObj.hasNextStep() || confirm("Do you want to skip this all?")) {
                if(user.value){
                  user.value.guide.home = true
                }
                driverObj.destroy();
              }
          },
      });

      driverObj.drive()
    }
  })
})

</script>


<style scoped>
#clock {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-70%, -50%);
}

#motivation-card {
  position: fixed;
  bottom: 15px;
  left: 15px;
}

.animate-opacity {
  transition: opacity .25s ease;
  opacity: .76;
}

.animate-opacity:hover {
  opacity: 1;

}
</style>