<template>
    <v-card id="table-container" class="h-100 rounded-0 text-white" flat color="transparent" style="overflow-y: auto;">
        <table class="bg-transparent" id="schedule-table" style="overflow-y: auto;">
            <thead style="position: sticky;">
                <tr>
                    <th width="350" class="bg-transparent pa-2 px-5">
                    </th>
                    <th width="350" class="bg-transparent pa-2 px-5" v-for="day, n in weekDays" :key="day.getDate()">
                        <v-card class="py-3 rounded-lg" :class="day.toDateString() == today.toDateString() ? 'bg-primary' : 'bg-transparent'" flat>
                            <h6 class="text-center text-capitalize font-weight-regular">{{ weekNames[n] }}</h6>
                            <h1 class="text-center text-h3 font-weight-bold">{{ day.getDate() }}</h1>
                        </v-card>
                    </th>
                </tr>
            </thead>
            <tbody style="overflow-y: auto" >
                <!-- <schedule-calendar-schedule-row v-for="schedule in sortedSchedules" :schedule="schedule" :key="schedule._id"></schedule-calendar-schedule-row> -->
                <tr v-for="row in 13">
                    <td></td>
                    <td class="py-3 px-2" v-for="week, n in weekNames"  width="350"  :key="week">
                        <v-card height="100" @click="" class="py-2 d-flex align-center justify-center rounded" color="background" style="border-style: dashed;" variant="outlined">
                            <span class="text-uppercase font-weight-regular text-caption" style="position: absolute;top: 5px;right: 10px">{{ row + 5 }} {{ row + 5 > 11 ? 'pm' : 'am' }}</span>
                            <v-icon>mdi-plus</v-icon>
                        </v-card>
                    </td>
                </tr>
            </tbody>
            <thead style="position: sticky;">
                <tr>
                    <th width="350" class="bg-transparent pa-2 px-5">
                    </th>
                    <th width="350" class="bg-transparent pa-2 px-5" v-for="day, n in weekDays" :key="day.getDate()">
                        <v-card class="py-3 rounded-lg" :class="day.toDateString() == today.toDateString() ? 'bg-primary' : 'bg-transparent'" flat>
                            <h6 class="text-center text-capitalize font-weight-regular">{{ weekNames[n] }}</h6>
                            <h1 class="text-center text-h3 font-weight-bold">{{ day.getDate() }}</h1>
                        </v-card>
                    </th>
                </tr>
            </thead>
        </table>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{currentDate: Date}>()
const {name} = useDisplay()
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
#table-container::-webkit-scrollbar{
    width: 0px;
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

}
</style>