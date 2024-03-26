<template>
  <v-app class="h-screen w-screen">
    <NuxtLoadingIndicator></NuxtLoadingIndicator>
    <ClientOnly>
      <NuxtLayout>
          <NuxtPage></NuxtPage>
      </NuxtLayout>
      <template #fallback>
        <Loading></Loading>
      </template>
    </ClientOnly>
  </v-app>
</template>
<script setup>
import { useColorStore } from './stores/color';
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? titleChunk + ' | Efficiently' : 'Efficiently'
  },
  link: [
    {
      rel:"icon",  type: "image/x-icon", href:"/favicon.png", 
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
  ]
})
const $color = useColorStore()
const {setBackgroundColor} = useColorStore()
const {selectedBackgroundColor} = storeToRefs(useColorStore())

onMounted(() => {
  setBackgroundColor(selectedBackgroundColor.value)
})

watch(selectedBackgroundColor, (current) => {
  setBackgroundColor(current)
})

</script>
<style>

.scale-enter-from, .scale-leave-to{
  
  opacity: .5;
}


.page-enter-active, .page-leave-active{
  position: static;
  transition: opacity .25s linear, transform .55s ease;
}

.page-enter-from, .page-leave-to{
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