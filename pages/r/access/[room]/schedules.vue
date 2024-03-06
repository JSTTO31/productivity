<template>
    <schedule-navigation-drawer :show-navigation="showRightNavigation"></schedule-navigation-drawer>

    <v-app-bar class="d-flex  align-center text-white border-b" density="compact"
        style="background-color: rgba(0,0,0,.2);z-index: 50 !important;" flat absolute>
        <v-app-bar-nav-icon class="rounded-0 " @click="showRightNavigation = !showRightNavigation"></v-app-bar-nav-icon>
        <v-app-bar-title class="d-flex font-weight-bold align-center">
            <span class="mr-5">{{ titleDate }}</span>
        </v-app-bar-title>
        <v-btn size="x-small" variant="tonal" class="rounded-lg mr-2" icon="mdi-chevron-left" @click="decreaseDate"></v-btn>
        <v-btn @click="viewMode = 'monthly'" :variant="viewMode == 'monthly' ? 'flat' : 'tonal'" class="text-capitalize mr-2" size="small">Monthly</v-btn>
        <v-btn @click="viewMode = 'weekly'" :variant="viewMode == 'weekly' ? 'flat' : 'tonal'" class="text-capitalize mr-2" size="small">Weekly</v-btn>
        <v-btn @click="viewMode = 'daily'" :variant="viewMode == 'daily' ? 'flat' : 'tonal'" class="text-capitalize mr-2" size="small">Daily</v-btn>
        <v-btn size="x-small" variant="tonal" class="rounded-lg mr-2" icon="mdi-chevron-right" @click="increaseDate"></v-btn>

        <v-spacer></v-spacer>
        <v-btn size="small" variant="flat" class=" mr-2 text-capitalize" prepend-icon="mdi-plus" color="primary" @click="showAddScheduleDialog = true">Create Schedule</v-btn>
        <v-btn class="text-capitalize mr-2" prepend-icon="mdi-filter-outline" variant="tonal" size="small">
            Filter
        </v-btn>
        <!-- <v-divider vertical class="mx-2"></v-divider>
        <v-btn class="rounded-lg" icon="mdi-menu" size="small" @click="showRightNavigation = !showRightNavigation">
        </v-btn> -->
    </v-app-bar>
    <v-main class="">
        <schedule-dialog-create v-model:show-dialog="showAddScheduleDialog"></schedule-dialog-create>
        <schedule-dialog-edit :show-dialog="!!$route.query.edit && !!schedule" :key="schedule?._id || 'null'"></schedule-dialog-edit>
        <schedule-calendar-table :current-date="currentDate"></schedule-calendar-table>
    </v-main>
</template>

<script setup lang="ts">
const showRightNavigation = ref(true)
const showAddScheduleDialog = ref(false)
const $schedule = useScheduleStore()
const viewMode = ref('weekly')
const {schedule, schedules} = storeToRefs($schedule)
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
    const date = new Date(currentDate.value)
    const startMonth = date.getMonth()
    date.setDate(date.getDate() + 6)
    const endMonth = date.getMonth()

    return (startMonth == endMonth ? months[startMonth] : months[startMonth] + ' - ' + months[endMonth]) + ' ' + date.getFullYear()
})








$schedule.getAll().then(() => {
    if(route.query.edit){
        const find = schedules.value.find(item => item._id == route.query.edit)
        if(find){
            schedule.value = find
        }
    }
})

function decreaseDate(){
    const newDate = new Date(currentDate.value)
    newDate.setDate(newDate.getDate() - 7)
    currentDate.value = newDate
}

function increaseDate(){
    const newDate = new Date(currentDate.value)
    newDate.setDate(newDate.getDate() + 7)
    currentDate.value = newDate
}

onBeforeRouteUpdate((to, from, next) => {
    if(to.query.edit && !from.query.edit){
        const find = schedules.value.find(item => item._id == to.query.edit)
        if(find){
            schedule.value = find
        }
    }

    return next()
})

</script>

<style scoped>

</style>