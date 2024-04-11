<template>
    <v-hover v-slot="{props, isHovering}">
        <div id="tools-container"  class="pt-8" v-bind="props" style="height: 80px;" :style="{bottom: isHovering ? '6px' : '-40px', transition: '.2s ease'}">
            <v-card  style="overflow: visible;" class=" justify-space-between rounded-lg pa-2 d-flex" :class="isHovering ? 'pt-2' : 'pt-5'" elevation="5" width="250" height="100" id="tools">
                <v-tooltip location="top">
                    <template #activator="{props}">
                        <v-card v-bind="props"  width="55" flat height="45" @click="showTextEditor = !showTextEditor" class="rounded tool pa-1 bg-transparent">
                            <v-img src="/tools/text-box.png"></v-img>
                        </v-card>
                    </template>
                    <span class="mb-15">Text Editor</span>
                </v-tooltip>
                <v-tooltip location="top">
                    <template #activator="{props}">
                        <v-card v-bind="props"  width="55" flat height="45" @click="showTask = !showTask" class="rounded tool pa-1 bg-transparent">
                            <v-img src="/tools/to-do-list.png"></v-img>
                        </v-card>
                    </template>
                    <span class="mb-15">To do list</span>
                </v-tooltip>
                <v-tooltip location="top">
                    <template #activator="{props}">
                        <v-card v-bind="props"  width="55" flat height="45" @click="showTimer = !showTimer" class="rounded tool pa-1 bg-transparent">
                            <v-img src="/tools/stopwatch.png"></v-img>
                        </v-card>
                    </template>
                    <span class="mb-15">Focus Session</span>
                </v-tooltip>
                <v-tooltip location="top">
                    <template #activator="{props}">
                        <v-card v-bind="props"  width="55" flat height="45" @click="showSettings = !showSettings" class="rounded tool pa-1 mr-n2 bg-transparent">
                            <v-img src="/tools/cogwheel.png"></v-img>
                        </v-card>
                    </template>
                    <span class="mb-15">Settings</span>
                </v-tooltip>
                <!-- <v-card  width="55" flat height="45" @click="showMedia = !showMedia" class="rounded tool pa-1 bg-transparent">
                    <v-img src="/tools/play-button.png"></v-img>
                </v-card> -->
            </v-card>
        </div>
    </v-hover>
    <div class="marker">
        <div></div>
    </div>
  
    <UtilsCardMedia key="media" class="floating-card" v-model:show-media="showMedia"
        @vue:before-update="beforeUpdateElement"></UtilsCardMedia>
    <UtilsCardTimer key="timer" class="floating-card" @vue:before-update="beforeUpdateElement"
        v-model:show-timer="showTimer"></UtilsCardTimer>
    <UtilsCardTask key="task" class="floating-card" @vue:before-update="beforeUpdateElement" v-model:show-task="showTask">
    </UtilsCardTask>
    <UtilsCardSettings key="settings" class="floating-card" @vue:before-update="beforeUpdateElement"
        v-model:show-settings="showSettings"></UtilsCardSettings>
    <UtilsCardTextEditor key="text-editor" class="floating-card" @vue:before-update="beforeUpdateElement"
        v-model:show-editor="showTextEditor"></UtilsCardTextEditor>
  
</template>
<script lang="ts" setup>
const rail = ref(true)
const showSettings = ref(false)
const showTextEditor = ref(false)
const showTask = ref(false)
const showTimer = ref(false)
const showMedia = ref(false)

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


    const navigationButtons = document.querySelectorAll('.nav-btn')


    navigationButtons.forEach((item) => {
        item.addEventListener('mouseenter', () => {
            rail.value = false
        })

        item.addEventListener('mouseleave', () => {
            rail.value = true
        })
    })


})
</script>
  
<style scoped>
.tool{
    transition: .25s ease-in-out;

}
/* .tool:hover{
    transform: scale(1.5) translateY(-10px);
} */

.tool:active{
    transform: scale(1.2);
}
#tools-container{
  position: fixed;
  bottom: -50px;
  height: 180px;
  right: 5%;
  /* transform: translateX(-50%); */
  z-index: 2000;
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
    transition: transform .2s ease-out, opacity .1s linear;
}

.slide-enter-from,
.slide-leave-to {
    -webkit-transform: scale(.5);
    transform: scale(.5);
    opacity: 0;
}
</style>