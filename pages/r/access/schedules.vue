<template>
    <div>
        <schedule-navigation-drawer :show-navigation="showRightNavigation"></schedule-navigation-drawer>
        <v-app-bar class="d-flex  align-center text-white" density="compact"
            style="background-color: rgba(0,0,0,.4);z-index: 50 !important;" flat absolute>
            <v-app-bar-nav-icon @click="showRightNavigation = !showRightNavigation"></v-app-bar-nav-icon>
            <v-app-bar-title class="d-flex font-weight-bold align-center">
                <span class="mr-5">{{ titleDate }}</span>
                <v-menu v-model="menu" :close-on-content-click="false">
                    <template #activator="{props}">
                        <v-btn v-bind="props" size="small" variant="flat" class=" mr-2 text-capitalize px-3" append-icon="mdi-chevron-down" color="primary">Create</v-btn>
                    </template>
                    <v-card width="345" class="mt-2">
                        <v-card-title class=" d-flex align-center" style="font-size: 18px">
                            Add Schedule
                            <v-spacer></v-spacer>
                            <v-btn icon="mdi-close" size="small" flat @click="menu = false"></v-btn>
                        </v-card-title>
                        <v-card-text>
                            <schedule-create-schedule-card v-model:menu="menu" :start-at="startAt" :end-at="endAt" ></schedule-create-schedule-card>
                        </v-card-text>
                    </v-card>
                </v-menu>
            </v-app-bar-title>
            <v-btn :to="{name: 'r-access-schedules-monthly'}" :variant="$route.name == 'r-access-schedules-monthly' ? 'flat' : 'tonal'"
                class="text-capitalize mr-2" size="small">Monthly</v-btn>
            <v-btn :to="{name: 'r-access-schedules'}" class="text-capitalize mr-2" size="small" :variant="$route.name == 'r-access-schedules' ? 'flat' : 'tonal'" :active="false">Weekly</v-btn>
            <v-btn  :to="{name: 'r-access-schedules-daily'}" :variant="$route.name == 'r-access-schedules-daily' ? 'flat' : 'tonal'"
                class="text-capitalize" size="small">Daily</v-btn>
            <v-divider inset vertical class="mx-3"></v-divider>
            <v-btn size="x-small" variant="tonal" class="rounded-lg mr-2" icon="mdi-chevron-left"
            @click="decreaseDate"></v-btn>
            <v-btn @click="today" :variant="viewMode == 'daily' ? 'flat' : 'tonal'"
                class="text-capitalize mr-2" size="small">Today</v-btn>
            <v-btn size="x-small" variant="tonal" class="rounded-lg" icon="mdi-chevron-right"
                @click="increaseDate"></v-btn>
        </v-app-bar>
        <v-main class="h-screen">
            <v-card class="w-100 h-100 rounded-0" style="background-color: rgba(0, 0, 0, 0.2) !important">
                    <nuxt-page :currentDate="currentDate"></nuxt-page>
                    <v-dialog contained width="460"  :model-value="!!$route.query.delete" no-click-animation persistent >
                        <v-card>
                        </v-card>
                    </v-dialog>
            </v-card>
        </v-main>
    </div>
</template>

<script setup lang="ts">
useHead({
    title: 'Schedules'
})
definePageMeta({
    layout: 'authenticated',
    middleware: ['auth'],
})
const menu = ref(false)
const startAt = new Date()
const endAt = new Date()
startAt.setHours(6)
startAt.setMinutes(0)
endAt.setHours(22)
endAt.setMinutes(0)
const showRightNavigation = ref(true)
const $schedule = useScheduleStore()
const viewMode = ref('weekly')
const { schedule, schedules } = storeToRefs($schedule)
const route = useRoute()
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
const currentDate = ref(new Date());

const titleDate = computed(() => {
    const date = new Date(currentDate.value.toISOString())
    date.setDate(date.getDate() - date.getDay())
    const startMonth = date.getMonth()
    date.setDate(date.getDate() + 6)
    const endMonth = date.getMonth()
    return (startMonth == endMonth ? months[startMonth] : months[startMonth] + ' - ' + months[endMonth]) + ' ' + date.getFullYear()
})

$schedule.getAll().then(() => {
    if (route.query.edit) {
        const find = schedules.value.find(item => item._id == route.query.edit)
        if (find) {
            schedule.value = find
        }
    }
})

function decreaseDate() {
    const newDate = new Date(currentDate.value)
    newDate.setDate(newDate.getDate() - 7)
    currentDate.value = newDate
}

function increaseDate() {
    const newDate = new Date(currentDate.value)
    newDate.setDate(newDate.getDate() + 7)
    currentDate.value = newDate
}

function today(){
    const newDate = new Date()
    newDate.setDate(newDate.getDate() - newDate.getDay())
    currentDate.value = newDate
}

onBeforeRouteUpdate((to, from, next) => {
    if (to.query.schedule && !from.query.schedule) {
        const find = schedules.value.find(item => item._id == to.query.schedule)
        if (find) {
            schedule.value = find
        }
    }

    return next()
})

</script>

<style scoped>

.slide-enter-active,
.slide-leave-active {
  position: static;
  transition: opacity .25s linear, transform .55s ease;
}

.slide-enter-from,
.slide-leave-to {
  position: absolute;

  opacity: 0;
  transform: translateX(10%);
}
</style>