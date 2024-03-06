<template>
    <v-card class="h-100 rounded-0 text-white" flat color="transparent">
        <table class="bg-transparent h-100" id="schedule-table">
            <thead>
                <tr>
                    <th width="350" class="bg-transparent pa-2" v-for="day, n in weekDays" :key="day.getDate()">
                        <v-card class="py-3 rounded-lg" :class="day.toDateString() == today.toDateString() ? 'bg-primary' : 'bg-transparent'" flat>
                            <h6 class="text-center text-uppercase">{{ weekNames[n] }}</h6>
                            <h1 class="text-center text-h3 font-weight-medium">{{ day.getDate() }}</h1>
                        </v-card>
                    </th>
                    <!-- <th colspan="8">
                        <v-card class="py-3 rounded-0 bg-primary"  flat>
                            <h6 class="text-center text-uppercase">{{ weekNames[1] }}</h6>
                            <h1 class="text-center text-h3 font-weight-medium">{{ 2 }}</h1>
                        </v-card>
                    </th> -->
                </tr>
            </thead>
            <tbody>
                <schedule-calendar-schedule-row v-for="schedule in sortedSchedules" :schedule="schedule" :key="schedule._id"></schedule-calendar-schedule-row>
                <tr>
                    <td class="py-3 px-2" v-for="week, n in weekNames" :width="100 / 7 + '%'" :key="week">
                        <v-card @click="" class="py-2 rounded-lg" color="background" variant="tonal">
                            <h5 class="text-center font-weight-medium">
                                <v-icon>mdi-plus</v-icon>
                                Add Schedule
                            </h5>
                        </v-card>
                    </td>
                </tr>
                <tr class="h-100" style="background-color: rgba(255, 255, 255, .2)">
                    <td class="py-3 px-2" v-for="week, n in weekNames" :width="100 / 7 + '%'" :key="week">
                    </td>
                </tr>
            </tbody>
        </table>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{currentDate: Date}>()
const {schedules} = storeToRefs(useScheduleStore())
const weekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const today = new Date()
const weekDays = computed(() => {
    const currentDate = props.currentDate
    const day = currentDate.getDay()

    const startDay = new Date(currentDate)
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







//@ts-ignore
const sortedSchedules = computed(() => schedules.value.sort((a,b) => new Date(b.startAt) - new Date(a.startAt)))
</script>

<style scoped>
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

#schedule-table td:last-child, #schedule-table th:last-child  {
    border-right: none;
}

#schedule-table td:first-child, #schedule-table th:first-child  {
    border-left: none;

}

#schedule-table tr:last-child td {
    border-top: none;

}

#schedule-table tr:nth-child(-n+2) td {
    border-bottom: none;

}
</style>