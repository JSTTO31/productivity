<template>
  <v-app class="h-screen w-screen">
    <NuxtLoadingIndicator></NuxtLoadingIndicator>
    <ClientOnly v-if="!mobile">
      <NuxtLayout>
        <NuxtPage></NuxtPage>
      </NuxtLayout>
      <template #fallback>
        <Loading></Loading>
      </template>
    </ClientOnly>
    <ClientOnly v-else>
      <div>
        <v-dialog persistent scrim="error" :model-value="mobile">
          <v-card color="error" class="rounded pa-15 d-flex justify-center align-center">
            <v-icon size="150" >mdi-alert-circle</v-icon>
            <h2>Device Not Supported</h2>
            <p class="text-center">Sorry, our app is currently optimized for desktop use only. For the best experience, please access it from a desktop or laptop computer.</p>
          </v-card>
        </v-dialog>
      </div>
    </ClientOnly>
  </v-app>
</template>
<script setup>
import { useColorStore } from './stores/color';
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
const { setBackgroundColor } = useColorStore()
const { selectedBackgroundColor } = storeToRefs(useColorStore())

onMounted(() => {
  setBackgroundColor(selectedBackgroundColor.value)
})

watch(selectedBackgroundColor, (current) => {
  setBackgroundColor(current)
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