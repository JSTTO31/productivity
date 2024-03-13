<template>
  <UtilsThemeBackground ref="video" style="position: fixed;top: 0;left: 0;"></UtilsThemeBackground>
  <v-app-bar class="pa-0 border-b pr-5 bg-surface" :color="name == 'dark' ? '' : 'primary'"
    density="compact" flat v-if="true">
    <v-btn size="small" style="opacity: .8;" class="text-capitalize rounded-lg mr-2 font-weight-regular"
      @click="$router.push({ name: 'r-access-room', params: { room: 'aD3Vwed6abuoPE2BzInnTKcTKYp' } })"
      prepend-icon="mdi-home">Home</v-btn>
    <v-btn size="small" style="opacity: .8;" class="text-capitalize rounded-lg mr-2 font-weight-regular"
      prepend-icon="mdi-square-edit-outline"
      :to="{ name: 'r-access-room-projects', params: { room: 'aD3Vwed6abuoPE2BzInnTKcTKYp' } }">Projects</v-btn>
    <v-btn size="small" style="opacity: .8;" class="text-capitalize rounded-lg mr-2 font-weight-regular"
      prepend-icon="mdi-calendar"
      :to="{ name: 'r-access-room-schedules', params: { room: 'aD3Vwed6abuoPE2BzInnTKcTKYp' } }">Schedules</v-btn>
    <v-btn :to="{ name: 'r-access-room-statistics', params: { room: 'aD3Vwed6abuoPE2BzInnTKcTKYp' } }" size="small"
      style="opacity: .8;" class="text-capitalize rounded-lg mr-2 font-weight-regular"
      prepend-icon="mdi-chart-arc">Statistics</v-btn>
      <v-spacer></v-spacer>
      <h5 class="mr-5 font-weight-medium">Development of productivity system <v-icon>mdi-pencil-outline</v-icon></h5>
      <v-card @click="" class=" pa-1 mr-2 text-caption px-2">
        <v-icon class="mr-2">mdi-magnify</v-icon>
        <kbd>Ctrl+k</kbd>
      </v-card>
      <v-badge dot color="red" class="mr-3">
        <v-icon size="20">mdi-bell-outline</v-icon>
      </v-badge>
      <v-avatar size="35" class="border text-caption font-weight-bold ml-2" color="#F5E8C7" style="z-index: 20;">
        JS
      </v-avatar>
    </v-app-bar>
    <ClientOnly>
        <NuxtPage></NuxtPage>
    </ClientOnly>
    <navigationDrawerRight navigationDrawerRight></navigationDrawerRight>
</template>

<script setup lang="ts">
useHead({
  title: 'Development of productivity system',
})
definePageMeta({
  layout: false,
  layoutTransition: false,
  middleware: ['auth'],
})
const { name } = useTheme()
const showNavigationTools = ref(false)
const { hideBar } = storeToRefs(useThemeStore())

const mouseMove = (e: MouseEvent) => {
  if (e.clientX + 10 >= window.innerWidth) {
    showNavigationTools.value = true
  } else {
    showNavigationTools.value = false
  }
}
const toFront = (currentElement: Element) => {
  const cards = document.querySelectorAll('.floating-card')
  const cardNumber = currentElement.getAttribute('element-sort-data')

  if (cardNumber && parseInt(cardNumber) != cards.length - 1) {
    cards.forEach((item) => {
      const itemNumber = item.getAttribute('element-sort-data')
      if (itemNumber && parseInt(itemNumber) > parseInt(cardNumber)) {
        const currentNumber = (parseInt(itemNumber) - 1).toString()
        item.setAttribute('element-sort-data', currentNumber)
        //@ts-ignore
        item.style.zIndex = (currentNumber * 100).toString()
      }
    })

    const newCardNumber = cards.length - 1
    currentElement.setAttribute('element-sort-data', newCardNumber.toString())
    //@ts-ignore
    currentElement.style.zIndex = (newCardNumber * 100).toString()
  }
}


onMounted(() => {
  const cards = document.querySelectorAll('.floating-card')
  cards.forEach((card, key) => {
    card.setAttribute('element-sort-data', key.toString())
    //@ts-ignore
    card.style.zIndex = (key * 100).toString()

    card.addEventListener('mousedown', () => {
      toFront(card)
    })
  })

  window.addEventListener('mousemove', mouseMove)


  window.addEventListener('keydown', (e) => {
     if(e.ctrlKey && e.key == 'ArrowRight'){

     }

     if(e.ctrlKey && e.key == 'ArrowLeft'){
      
    }
  })

})

onBeforeRouteLeave((to, from, next) => {
  removeEventListener('mousemove', mouseMove)
  return next()
})

</script>

<style scoped>
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