<template>
    <v-layout class="h-100 w-100 rounded-0 text-white" flat style="overflow-y: auto;">
        <v-app-bar fluid class="py-0 px-5 d-flex align-center" color="transparent" flat height="100">
            <v-card @click="decreaseDate" variant="text" width="50" class="h-100 d-flex justify-center align-center">
                <v-icon>mdi-chevron-left</v-icon>
            </v-card>
            <v-col class="" v-for="day, n in days" :key="day.getDate()">
                <v-card @click="today = day" flat class="rounded h-100 text-white"
                    :variant="day.toDateString() == today.toDateString() ? 'tonal' : 'plain'">
                    <div class="py-3">
                        <h5 class="text-center text-capitalize font-weight-regular">{{ months[day.getMonth()] }}</h5>
                        <h1 class="text-center text-h3 font-weight-bold">{{ day.getDate() }}</h1>
                        <h6 class="text-center text-capitalize font-weight-regular">{{ weekNames[n] }}</h6>


                    </div>
                </v-card>
            </v-col>
            <v-card @click="increaseDate" variant="text" width="50" class="h-100 d-flex justify-center align-center">
                <v-icon>mdi-chevron-right</v-icon>
            </v-card>
        </v-app-bar>
        <v-main style="overflow-y: hidden">
            <v-container id="daily-container-card" style="overflow-y: auto" fluid>
                <v-row class="d-flex h-100 w-100 pt-0">
                    <transition-group name="scale">
                        <v-col cols="3" v-for="schedule, n in getSchedules" :key="schedule._id">
                            <ScheduleDailyCard  :schedule="schedule"></ScheduleDailyCard>
                        </v-col>
                        <v-col cols="3" :style="'transition-delay: 5s'" :key="'column'"> 
                            <v-menu v-model="menu" location="center center" :close-on-content-click="false">
                                <template #activator="{ props }">
                                    <v-card v-bind="props" height="55" class=" d-flex align-center justify-center"
                                        variant="tonal">
                                        <v-icon size="35">mdi-plus</v-icon>
                                    </v-card>
                                </template>
                                <v-card width="345" class="mt-2">
                                    <v-card-title class=" d-flex align-center" style="font-size: 18px">
                                        Add Schedule
                                        <v-spacer></v-spacer>
                                        <v-btn icon="mdi-close" size="small" flat @click="menu = false"></v-btn>
                                    </v-card-title>
                                    <v-card-text>
                                        <schedule-create-schedule-card v-model:menu="menu" :start-at="startAt"
                                            :end-at="endAt"></schedule-create-schedule-card>
                                    </v-card-text>
                                </v-card>
                            </v-menu>
                        </v-col>
                    </transition-group>
                </v-row>
            </v-container>
        </v-main>
    </v-layout>
</template>

<script setup lang="ts">
definePageMeta({
    pageTransition: {
        name: 'slide',
        mode: 'out-in'
    }
})
const props = defineProps<{ currentDate: Date }>()
const menu = ref(false)
const weekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

const today = ref(new Date())
const { schedules } = storeToRefs(useScheduleStore())
const getSchedules = computed(() => schedules.value.filter(schedule => new Date(schedule.startAt).toDateString() == today.value.toDateString()))
const endAt = new Date()
endAt.setHours(22)
endAt.setMinutes(0)
const startAt = computed(() => {
    const startAt = new Date()
    if (getSchedules.value.length > 0) {
        const lastScheduleEndAt = new Date(getSchedules.value[getSchedules.value.length - 1].endAt)
        startAt.setHours(lastScheduleEndAt.getHours())
        startAt.setMinutes(lastScheduleEndAt.getMinutes())
    }
    return startAt

})
const days = computed(() => {
    let next = 1
    const container = [today.value]
    while (next < 3) {
        const nextDate = new Date(today.value)
        nextDate.setDate(nextDate.getDate() + next)
        container.push(nextDate)
        const prevDate = new Date(today.value)
        prevDate.setDate(prevDate.getDate() - next)
        container.unshift(prevDate)
        next++
    }

    return container
})

function increaseDate() {
    const day = new Date(today.value)
    day.setDate(day.getDate() + 1)
    today.value = day
}
function decreaseDate() {
    const day = new Date(today.value)
    day.setDate(day.getDate() - 1)
    today.value = day
}


</script>

<style scoped>
#daily-container-card::-webkit-scrollbar {
    height: 10px;
}

#daily-container-card::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.2)
}

.slide-enter-active,
.slide-leave-active {
    position: static;
    transition: opacity .25s linear, transform .35s ease;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateX(15%);
}

.scale-enter-active {
    position: static;
    transition: opacity .25s linear, transform .35s ease;
}

.scale-enter-from {
    opacity: 0;
    transform: scale(.2);
}
</style>