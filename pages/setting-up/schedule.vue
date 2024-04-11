<template>
    <v-layout class="h-100 w-100">
        <v-main style="font-family: 'Roboto', sans-serif">
            <v-container fluid class=" h-100 w-100" :style="{paddingInline: name == 'lg' ? '100px' : '250px'}" style="padding-top: 100px;">
                <h1 class="text-center">Select Your Daily Routine Recommendations</h1>   
                <h4 class="text-center font-weight-regular mb-8">Craft Your Path to Productivity and Well-being with Our Daily Routine Recommendations</h4>
                <v-row>
                    <transition-group name="scale">
                        <v-col cols="3" v-for="routine in recommendedRoutines" :key="routine.title">
                            <v-hover v-slot="{props, isHovering}">
                                    <v-card v-ripple="false" v-bind="props" @click="toggleSelect(routine.id)"  style="overflow: visible;transition: background .5s;" :color="container.some(item => item == routine.id) ? 'primary' : ''" class="pa-5 rounded-lg">
                                        <v-avatar class="pa-1 border" size="42" v-if="!isHovering && !container.some(item => item == routine.id)">
                                            <v-img :src="routine.icon"></v-img>
                                        </v-avatar>
                                        <v-avatar size="42" v-else>
                                            <v-img :src="routine.animation"></v-img>
                                        </v-avatar>
                                        <h3 class="mt-2">{{ routine.title }}</h3>
                                        <v-card-subtitle class="px-0 text-caption">{{ routine.description }}</v-card-subtitle>
                                        <div class="text-caption mt-2 font-weight-medium">
                                            <v-icon class="mr-1">mdi-clock-outline</v-icon>
                                            {{ new Date(routine.startAt).toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit'})  }}
                                            -
                                            {{ new Date(routine.endAt).toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit'})  }}
                                        </div>
                                        <div class="text-caption mt-2 font-weight-medium">
                                            <v-icon class="mr-1">mdi-home-outline</v-icon>
                                            {{ routine.location }}
                                        </div>
                                    </v-card>
                            </v-hover>
                            </v-col>
                    </transition-group>
                </v-row>
                <div class="w-100 d-flex justify-center" style="margin-top: 50px;">
                    <V-btn size="large" class="text-capitalize mx-2" flat color="primary" append-icon="mdi-check-circle-outline" @click="finalize" :disabled="loading" :loading="loading" >Finalize Setup</V-btn>
                </div>
            </v-container>
        </v-main>
        <v-overlay class="bg-blue d-flex justify-center align-center" :model-value="completed" no-click-animation persistent width="600">
            <v-card class="pa-5 py-15 rounded-lg">
                <v-img src="/animate-icons/fireworks.gif" class="w-50 mx-auto"></v-img>
                <h2 class="text-center font-weight-medium">Setup Complete!</h2>
                <p class="text-center mt-10">
                    You're all set to begin your journey to productivity and well-being. Happy exploring!
                </p>
                <div class="mt-5 text-subtitle-1 font-weight-bold mx-auto text-center text-capitalize">Click any, to continue in our app</div>
            </v-card>
        </v-overlay>
        <span id="step-indicator" class="text-h6  font-weight-regular">
            Add Your Weekly Schedule (4 of 4)
        </span>
    </v-layout>
</template>

<script setup lang="ts">
useHead({
    title: "Set your background",
});
definePageMeta({
    layout: false,
    middleware: "setting-up",
    pageTransition: {
        name: 'slide',
        mode: 'out-in'
    },
});
const {name} = useDisplay()
const $user = useUserStore()
const $schedule = useScheduleStore()
const completed = ref(false)
const loading = ref(false)
const container = ref<number[]>([])

function toggleSelect(value: number){
    if(container.value.some(item => item == value)){
        container.value = container.value.filter(item => item != value)
    }else{
        container.value.push(value)
    }
}

async function finalize(){
    loading.value = true
    return await $schedule.recommendation(container.value).then(() => {
        loading.value = false
        completed.value = true
    })
}

document.onclick = () => {
    if(completed.value){
        $user.setupComplete()
    }
}


const recommendedRoutines = [
  {
    id: 1,
    title: "Morning Routine",
    tag: "Self-Care",
    location: "Home",
    recurrence: "daily",
    startAt: new Date().setHours(7, 0, 0, 0), // Set start time to 7:00 AM
    endAt: new Date().setHours(8, 0, 0, 0), // Set end time to 8:00 AM
    description: "Start the day feeling refreshed and focused.",
    icon: '/animate-icons/sun.png',
    animation: '/animate-icons/sun.gif'
  },
  {
    id: 2,
    title: "Study Session 1",
    tag: "Study",
    location: "Library",
    recurrence: "daily",
    startAt: new Date().setHours(9, 0, 0, 0), // Set start time to 9:00 AM
    endAt: new Date().setHours(11, 0, 0, 0), // Set end time to 11:00 AM
    description: "Concentrate and understand course material effectively.",
    icon: '/animate-icons/read.png',
    animation: '/animate-icons/read.gif'
  },
  {
    id: 3,
    title: "Lunch Break",
    tag: "Social",
    location: "Cafeteria",
    recurrence: "daily",
    startAt: new Date().setHours(12, 0, 0, 0), // Set start time to 12:00 PM
    endAt: new Date().setHours(13, 0, 0, 0), // Set end time to 1:00 PM
    description: "Recharge and socialize with friends.",
    icon: '/animate-icons/sandwich.png',
    animation: '/animate-icons/sandwich.gif'
  },
  {
    id: 4,
    title: "Study Session 2",
    tag: "Study",
    location: "Home",
    recurrence: "daily",
    startAt: new Date().setHours(14, 0, 0, 0), // Set start time to 2:00 PM
    endAt: new Date().setHours(16, 0, 0, 0), // Set end time to 4:00 PM
    description: "Continue academic pursuits in a comfortable environment.",
    icon: '/animate-icons/closed-book.png',
    animation: '/animate-icons/closed-book.gif'
  },
  {
    id: 5,
    title: "Exercise",
    tag: "Exercise",
    location: "Gym",
    recurrence: "daily",
    startAt: new Date().setHours(17, 0, 0, 0), // Set start time to 5:00 PM
    endAt: new Date().setHours(18, 0, 0, 0), // Set end time to 6:00 PM
    description: "Stay active and boost mood with physical activity.",
    icon: '/animate-icons/running.png',
    animation: '/animate-icons/running.gif'
  },
  {
    id: 6,
    title: "Evening Wind Down",
    tag: "Relaxation",
    location: "Home",
    recurrence: "daily",
    startAt: new Date().setHours(19, 0, 0, 0), // Set start time to 7:00 PM
    endAt: new Date().setHours(20, 0, 0, 0), // Set end time to 8:00 PM
    description: "Relax and unwind before a restful night's sleep.",
    icon: '/animate-icons/mental-health.png',
    animation: '/animate-icons/mental-health.gif'
  },
  {
    id: 7,
    title: "Review and Planning",
    tag: "Productivity",
    location: "Home",
    recurrence: "daily",
    startAt: new Date().setHours(20, 0, 0, 0), // Set start time to 8:00 PM
    endAt: new Date().setHours(21, 0, 0, 0), // Set end time to 9:00 PM
    description: "Reflect on achievements and plan for the day ahead.",
    icon: '/animate-icons/strategy.png',
    animation: '/animate-icons/strategy.gif'
  }
];

</script>

<style scoped>
body::-webkit-scrollbar {
    width: 0;
}

#select-theme-card {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: 0.25s ease;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity .25s linear, transform .55s ease;
}

.slide-enter-from{
  transform: translateX(100%);

}
.slide-leave-to {
  transform: translateX(-100%);
}

.scale-enter-active,
.scale-leave-active {
  transition: opacity .25s linear, transform .55s ease;
}

.scale-enter-from, .scale-leave-to {
  transform: scale(.2);

}

.action {
    position: fixed;
    bottom: 10px;
    right: 10px;
}

#step-indicator{
    position: fixed;
    top: 25px;
    left: 50%;
    transform: translateX(-50%);
}
</style>
