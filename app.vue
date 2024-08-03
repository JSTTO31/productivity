<template>
  <v-app class="h-screen w-screen">
    <NuxtLoadingIndicator></NuxtLoadingIndicator>
    <ClientOnly>
      <NuxtLayout>
        <NuxtPage></NuxtPage>
        <v-dialog persistent class="bg-red" :model-value="mobile" v-if="mobile">
          <v-card color="error" variant="outlined" class="rounded-lg bg-white pa-15 d-flex justify-center align-center">
            <v-icon size="150" color="error">mdi-alert-circle-outline</v-icon>
            <h2>Device Not Supported</h2>
            <p class="text-center text-subtitle-2 font-weight-regular">Sorry, our app is currently optimized for desktop use only. For the best experience, please access it from a desktop or laptop computer.</p>
          </v-card>
        </v-dialog>
      </NuxtLayout>
      <template #fallback>
        <Loading></Loading>
      </template>
    </ClientOnly>
  </v-app>
</template>
<script setup>
import mongoose, { mongo } from 'mongoose';

const {mobile} = useDisplay()
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? titleChunk + ' | Efficiently' : 'Efficiently'
  },
  link: [
    {
      rel: "icon", type: "image/x-icon", href: "/favicon.png",
    },
    {
      "rel": "preconnect",
      "href": "https://fonts.googleapis.com"
    },
    {
      "rel": "preconnect",
      "href": "https://fonts.gstatic.com",
      "crossorigin": true
    },
    {
      "href": "https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Orbitron:wght@400..900&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Protest+Revolution&family=Reenie+Beanie&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap",
      "rel": "stylesheet"
    }
  ],
  script: [
    {
      src: 'https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.3/tsparticles.confetti.bundle.min.js'
    }
  ]
})

useSeoMeta({
  title: 'Arellano Connect: Building Alumni Connections with Communication and Job Opportunities',
  ogTitle: 'Arellano Connect: Building Alumni Connections with Communication and Job Opportunities',
  description: 'Arellano Connect is a platform that strengthens the Arellano University alumni community. It facilitates seamless communication, networking, and offers job opportunities, enhancing graduates\' career prospects. Awarded first runner-up at the Arellano Colloquium, Arellano Connect is dedicated to fostering a supportive alumni network.',
  ogDescription: 'Arellano Connect is a platform that strengthens the Arellano University alumni community. It facilitates seamless communication, networking, and offers job opportunities, enhancing graduates\' career prospects. Awarded first runner-up at the Arellano Colloquium, Arellano Connect is dedicated to fostering a supportive alumni network.',
  ogImage: '/landing-page.png'
})

const $user = useUserStore()
const {user} = storeToRefs(useUserStore())
const {preference} = storeToRefs(usePreferenceStore())
const $preference = usePreferenceStore()
let timeout = null




onMounted(() => {
  $preference.setBackgroundColor()
  if(!!user.value){
    preference.value = user.value.preference
    watch(() => user.value.preference, () => {
      if(timeout) clearTimeout(timeout)
      timeout = setTimeout(() => {
        $user.updatePreference().then(() => {
          clearTimeout(timeout)
        })
      }, 2500);
    }, {deep: true})

  }

})

watch(() => preference.value.theme.color, () => {
  $preference.setBackgroundColor()
})


</script>
<style>
body{
  scroll-behavior: smooth;
}
.scale-enter-from,
.scale-leave-to {

  opacity: .5;
}


.page-enter-active,
.page-leave-active {
  position: static;
  transition: opacity .25s linear, transform .55s ease;
}

.page-enter-from,
.page-leave-to {
  position: absolute;

  opacity: 0;
  transform: translateX(10%);
}

@keyframes blinking {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.2;
  }

  100% {
    opacity: 1;
  }
}
</style>