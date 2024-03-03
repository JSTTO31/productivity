<template>
    <UtilsThemeBackground ref="video" style="position: fixed;top: 0;left: 0;"></UtilsThemeBackground>

    <v-app-bar class="pa-0 border-b pr-5 bg-surface" :color="name == 'dark' ? '' : 'primary'" density="compact" flat>
      <!-- <UtilsThemeBackground ref="video" style="position: fixed;top: 0;left: 0;"></UtilsThemeBackground> -->
      <v-btn class="rounded-lg h-75" size="small"
        @click="$router.push({ name: 'r-user', params: { user: 'joshuasotto@example.example' } })">
        <v-icon style="transform: rotate(25deg)" size="20">mdi-lightning-bolt</v-icon>
      </v-btn>
      <v-divider vertical inset class="mx-2 mr"></v-divider>
      <v-btn size="small" style="opacity: .8;" class="text-capitalize rounded-lg mr-2 font-weight-regular"
        @click="$router.push({ name: 'r-access-room', params: { room: 'aD3Vwed6abuoPE2BzInnTKcTKYp' } })" prepend-icon="mdi-home">Home</v-btn>
      <v-divider vertical inset class="mr-2"></v-divider>
      <v-btn size="small" style="opacity: .8;" class="text-capitalize rounded-lg mr-2 font-weight-regular" prepend-icon="mdi-square-edit-outline" :to="{ name: 'r-access-room-my-task', params: { room: 'aD3Vwed6abuoPE2BzInnTKcTKYp' } }" >My Tasks</v-btn>
      <v-btn size="small" style="opacity: .8;" class="text-capitalize rounded-lg mr-2 font-weight-regular" prepend-icon="mdi-calendar" :to="{ name: 'r-access-room-schedules', params: { room: 'aD3Vwed6abuoPE2BzInnTKcTKYp' } }" >Schedules</v-btn>
      <v-divider vertical inset class="mr-2"></v-divider>
      <v-btn size="small" style="opacity: .8;" class="text-capitalize rounded-lg mr-2 font-weight-regular" prepend-icon="mdi-dock-left">Documentation</v-btn>
      <v-btn size="small" style="opacity: .8;" class="text-capitalize rounded-lg mr-2 font-weight-regular" prepend-icon="mdi-dock-left">Flash Card</v-btn>
      <v-spacer></v-spacer>
      <h5 class="mr-5 font-weight-medium" >Development of productivity system <v-icon>mdi-pencil-outline</v-icon></h5>
      <v-card @click="" class=" pa-1 mr-2 text-caption px-2">
        <v-icon class="mr-2">mdi-magnify</v-icon>
        <kbd>Ctrl+k</kbd>
      </v-card>
      <v-badge dot color="red"  class="mr-3">
        <v-icon size="20">mdi-bell-outline</v-icon>
      </v-badge>
    
      <!-- <v-btn size="small" class="text-capitalize mx-2" color="secondary" variant="elevated"
        append-icon="mdi-plus" prepend-icon="mdi-account-multiple">Members</v-btn> -->
      <v-avatar size="35" class="border text-caption font-weight-bold ml-2" color="#F5E8C7" style="z-index: 20;">
        JS
      </v-avatar>
      <!-- <v-avatar size="35" class="border text-caption font-weight-bold ml-n4" color="green" style="z-index: 10">
        CC
      </v-avatar> -->
    </v-app-bar>
    <navigationDrawerRight></navigationDrawerRight>
    <ClientOnly>
      <NuxtPage></NuxtPage>
    </ClientOnly>
</template>
  
<script setup lang="ts">
useHead({
  title: 'Development of productivity system'
})
definePageMeta({
  layout: false,
  layoutTransition: false,
  middleware: ['auth']
})
const {name} = useTheme()
const { audioOutputs: speakers } = useDevicesList({ requestPermissions: true })
const hasHeadphone = computed(() => speakers.value.some(item => /Default - Headphones/.test(item.label)));
const showNavigationTools = ref(false)


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

const beforeUpdateElement = (node: VNode) => {
  if (node.el) {
    const element = document.getElementById(node.el.id)
    if (element) {
      toFront(element)
    }
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
.slide-enter-active,
.slide-leave-active {
    transition: transform .4s ease-out, opacity .2s linear, height 2s linear;
}


</style>