<template>
    <v-card id="table-container" class="h-100 rounded-0 w-100 text-white" color="transparent" flat  style="overflow-y: auto;">
        <v-container fluid class="container pa-0 h-100 px-5">
            <v-row class="h-100">
                <ScheduleCalendarTableColumn v-for="day, n in weekDays" :key="day.getDate()" :date="day"></ScheduleCalendarTableColumn>
            </v-row>
        </v-container>
        <div v-if="appbar">
            <Teleport to="#app-bar-schedule">
                <v-app-bar-title class="d-flex font-weight-bold align-center" id="app-bar-schedule-title">
                    <span class="mr-5">{{ titleDate }}</span>
                    <v-btn size="small" @click="$router.push({query: {date: new Date().toISOString()}})" variant="flat" class=" mr-2 text-capitalize px-3" append-icon="mdi-plus-circle-outline" color="primary" id="schedule-create-button">Create</v-btn>
                </v-app-bar-title>
                <v-spacer></v-spacer>
                <div id="schedule-view-options">
                    <v-btn :to="{ name: 'r-access-schedules-monthly' }"
                        :variant="$route.name == 'r-access-schedules-monthly' ? 'flat' : 'tonal'" class="text-capitalize mr-2"
                        size="small">Monthly</v-btn>
                    <v-btn :to="{ name: 'r-access-schedules' }" class="text-capitalize mr-2" size="small"
                        :variant="$route.name == 'r-access-schedules' ? 'flat' : 'tonal'" :active="false">Weekly</v-btn>
                    <v-btn :to="{ name: 'r-access-schedules-daily' }"
                        :variant="$route.name == 'r-access-schedules-daily' ? 'flat' : 'tonal'" class="text-capitalize"
                        size="small">Daily</v-btn>
                </div>
                <v-divider inset vertical class="mx-3"></v-divider>
                <div id="schedule-actions">
                    <v-btn size="x-small" variant="tonal" class="rounded-lg mr-2" icon="mdi-chevron-left"
                    @click="decreaseDate"></v-btn>
                    <v-btn @click="reset" class="text-capitalize mr-2"
                        size="small">Today</v-btn>
                    <v-btn size="x-small" variant="tonal" class="rounded-lg" icon="mdi-chevron-right"
                        @click="increaseDate"></v-btn>
                </div>
            </Teleport>
        </div>
    </v-card>
</template>

<script setup lang="ts">
definePageMeta({
    pageTransition: {
        name: 'slide',
        mode: 'out-in'
    }
})
const appbar = inject('appbar')
const currentDate = ref(new Date());
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
const titleDate = computed(() => {
    const date = new Date(currentDate.value.toISOString())
    date.setDate(date.getDate() - date.getDay())
    const startMonth = date.getMonth()
    date.setDate(date.getDate() + 6)
    const endMonth = date.getMonth()
    return (startMonth == endMonth ? months[startMonth] : months[startMonth] + ' - ' + months[endMonth]) + ' ' + date.getFullYear()
})
const weekDays = computed(() => {
    const day = currentDate.value.getDay()

    const startDay = new Date(currentDate.value)
    startDay.setDate(startDay.getDate() - day)

    const weekNumber = 6
    const container = []

    container.push(new Date(startDay))

    for (let index = 0; index < weekNumber; index++) {
        startDay.setDate(startDay.getDate() + 1)
        container.push(new Date(startDay))
    }

    return container
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

function reset() {
    const newDate = new Date()
    newDate.setDate(newDate.getDate() - newDate.getDay())
    currentDate.value = newDate
}


</script>

<style scoped>
#table-container::-webkit-scrollbar {
    width: 5px;
    background-color: rgba(0, 0, 0, 0.2)
}

#table-container::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.5)
}

.container {
    border-collapse: collapse;
}

#schedule-table {
    table-layout: auto;
    border-collapse: collapse !important;
    border: none;
}

#schedule-table th,
#schedule-table td {
    /* table-layout: auto;
    border-collapse: collapse !important; */
    border: 2px solid #ffffff23;
    border-top: none;

}

#schedule-table td:last-child,
#schedule-table th:last-child {
    border-right: none;
}

#schedule-table td:first-child,
#schedule-table th:first-child {
    border-left: none;

}

#schedule-table tr:last-child td {
    border-top: none;

}

.section-active {
    background:
        /* On "top" */
        repeating-linear-gradient(45deg,
            transparent,
            transparent 10px,
            #cccccc17 10px,
            #cccccc1c 20px),
        /* on "bottom" */
        linear-gradient(to bottom,
            #ffffff13,
            #ffffff17);
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
</style>