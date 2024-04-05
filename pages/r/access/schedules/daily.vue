<template>
    <v-layout class="h-100 w-100 rounded-0 text-white" flat style="overflow-y: auto;">
        <v-app-bar fluid class="py-0 px-5 d-flex align-center" color="transparent" flat height="100">
            <v-col class="" v-for="day, n in days" :key="day.getDate()">
                <v-card @click="today = day" flat class="rounded h-100 text-white"
                    :variant="day.toDateString() == today.toDateString() ? 'tonal' : 'plain'" :style="day.toDateString() == today.toDateString() ? '' : 'opacity: .3'">
                    <div class="py-3">
                        <h5 class="text-center text-capitalize font-weight-regular">{{ months[day.getMonth()] }}</h5>
                        <h1 class="text-center text-h3 font-weight-bold">{{ day.getDate() }}</h1>
                        <h6 class="text-center text-capitalize font-weight-regular">{{ weekNames[n] }}</h6>
                    </div>
                </v-card>
            </v-col>
        </v-app-bar>
        <v-main style="overflow-y: hidden">
            <v-container id="daily-container-card" style="overflow-y: auto" fluid>
                <v-row class="d-flex h-100 w-100 pt-0">
                    <transition-group name="scale">
                        <v-col cols="3" v-for="schedule, n in getSchedules" :key="schedule._id">
                            <ScheduleDailyCard  :schedule="schedule"></ScheduleDailyCard>
                        </v-col>
                        <v-col cols="3" :style="'transition-delay: 5s'" :key="'column'"> 
                            <v-card @click="$router.push({query: {date: startAt.toISOString()}})" height="55" class=" d-flex align-center justify-center"
                                variant="tonal" style="border: 2px dashed">
                                <v-icon size="25">mdi-plus</v-icon>
                            </v-card>
                        </v-col>
                    </transition-group>
                </v-row>
            </v-container>
        </v-main>
        <div v-if="appbar">
            <Teleport to="#app-bar-schedule">
            <v-app-bar-title class="d-flex font-weight-bold align-center">
                <span class="mr-5">{{ titleDate }}</span>
                <v-btn size="small" @click="$router.push({query: {date: new Date().toISOString()}})" variant="flat" class=" mr-2 text-capitalize px-3" append-icon="mdi-plus-circle-outline" color="primary">Create</v-btn>
            </v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn :to="{ name: 'r-access-schedules-monthly' }"
                :variant="$route.name == 'r-access-schedules-monthly' ? 'flat' : 'tonal'" class="text-capitalize mr-2"
                size="small">Monthly</v-btn>
            <v-btn :to="{ name: 'r-access-schedules' }" class="text-capitalize mr-2" size="small"
                :variant="$route.name == 'r-access-schedules' ? 'flat' : 'tonal'" :active="false">Weekly</v-btn>
            <v-btn :to="{ name: 'r-access-schedules-daily' }"
                :variant="$route.name == 'r-access-schedules-daily' ? 'flat' : 'tonal'" class="text-capitalize"
                size="small">Daily</v-btn>
            <v-divider inset vertical class="mx-3"></v-divider>
            <v-btn size="x-small" variant="tonal" class="rounded-lg mr-2" icon="mdi-chevron-left"
                @click="decreaseDate"></v-btn>
            <v-btn @click="reset" class="text-capitalize mr-2"
                size="small">Today</v-btn>
            <v-btn size="x-small" variant="tonal" class="rounded-lg" icon="mdi-chevron-right"
                @click="increaseDate"></v-btn>
            </Teleport>
        </div>
    </v-layout>
</template>

<script setup lang="ts">
definePageMeta({
    pageTransition: {
        name: 'slide',
        mode: 'out-in'
    }
})
const appbar = inject('appbar')
const currentDate = ref(new Date())
const weekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

const today = ref(new Date())
const { schedules } = storeToRefs(useScheduleStore())
const getSchedules = computed(() => schedules.value.filter(schedule => new Date(schedule.startAt).toDateString() == today.value.toDateString()))
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
const titleDate = computed(() => {
    const startDate = new Date(days.value[0])
    const endDate = new Date(days.value[days.value.length - 1])
    if(startDate.getMonth() == endDate.getMonth()) return months[startDate.getMonth()] + ' ' + endDate.getFullYear() 
    return months[startDate.getMonth()] + '-' + months[endDate.getMonth()] + ' ' + endDate.getFullYear() 
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
function reset(){
    const day = new Date()
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