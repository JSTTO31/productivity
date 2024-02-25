<template>
    <v-navigation-drawer location="right" rail style="z-index: 5000">
        <v-list class="h-100 d-flex pa-0 flex-column">
            <v-list-item prepend-icon="mdi-tune" style="overflow-x: visible;">
                <v-card height="25" width="25" style="position: absolute;left: -5px;top: 50%;transform: translateY(-50%);" color="red"></v-card>
            </v-list-item>

            <v-menu location="start">
                <template #activator="{ props }">
                    <v-list-item v-bind="props" prepend-icon="mdi-application-settings"></v-list-item>
                </template>
                <UtilsCardTheme class="mr-2 h-100"></UtilsCardTheme>
            </v-menu>
            <v-menu location="start" v-bind:close-on-content-click="false">
                <template #activator="{ props }">
                    <v-list-item v-bind="props" prepend-icon="mdi-palette"></v-list-item>
                </template>
                <UtilsCardBackgroundColor class="h-100 mr-2"></UtilsCardBackgroundColor>
            </v-menu>
            <v-list-item prepend-icon="mdi-movie-open" class="py-4" @click="showMedia = !showMedia"
                :color="showMedia ? 'secondary' : ''"></v-list-item>
            <v-list-item prepend-icon="mdi-timer-outline" class="py-4" @click="showTimer = !showTimer"
                :color="showTimer ? 'secondary' : ''"></v-list-item>
            <v-list-item prepend-icon="mdi-pencil" class="py-4" @click="showTask = !showTask"
                :color="showTask ? 'secondary' : ''"></v-list-item>
            <v-spacer></v-spacer>
            <v-list-item prepend-icon="mdi-cog" class="py-4" @click="showTask = !showTask"
                :color="showTask ? 'secondary' : ''"></v-list-item>
        </v-list>
    </v-navigation-drawer>
    <div class="marker">
        <div></div>
    </div>
    <UtilsCardMedia key="media" class="floating-card" v-model:show-media="showMedia"
        @vue:before-update="beforeUpdateElement"></UtilsCardMedia>
    <UtilsCardSound key="sound" class="floating-card" @vue:before-update="beforeUpdateElement"
        v-model:show-sound="showSound"></UtilsCardSound>
    <UtilsCardTimer key="timer" class="floating-card" @vue:before-update="beforeUpdateElement"
        v-model:show-timer="showTimer"></UtilsCardTimer>
    <UtilsCardTask key="task" class="floating-card" @vue:before-update="beforeUpdateElement" v-model:show-task="showTask">
    </UtilsCardTask>
    <UtilsCardTextEditor key="text-editor" class="floating-card" @vue:before-update="beforeUpdateElement"
        v-model:show-editor="showTextEditor"></UtilsCardTextEditor>
</template>
<script lang="ts" setup>
const { name } = useTheme()
const showNavigation = ref<null | boolean>(null)
const { audioOutputs: speakers } = useDevicesList({ requestPermissions: true })
const hasHeadphone = computed(() => speakers.value.some(item => /Default - Headphones/.test(item.label)));
const showNavigationTools = ref(false)
const showTextEditor = ref(false)
const showTask = ref(false)
const showTimer = ref(false)
const showMedia = ref(false)
const showSound = ref(false)

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
#menu-card{
    position: fixed;
    top: 55px;
    right: 65px;
    height: 91.8vh;
}


#navigation-tools{
    position: fixed;
    right: 0;
    top: 55%;
    z-index: 50000;
    transform: translateY(-50%)
}


.slide-enter-active,
.slide-leave-active {
    transition: transform .4s ease-out, opacity .2s linear, height 2s linear;
}

.slide-enter-from,
.slide-leave-to {
    -webkit-transform: translateX(250%) scaleY(.05);
    transform: translateX(250%) scaleY(.05);
    opacity: 0;
}
</style>