<template>
    <v-card class="h-100 rounded-0 text-white" flat color="transparent">
        <table class="bg-transparent h-100" id="schedule-table">
            <thead>
                <tr>
                    <th width="350" class="bg-transparent pa-2" v-for="week, n in weekNames" :key="week">
                        <v-card class="py-3 rounded-lg" :class="n == 1 ? 'bg-primary' : 'bg-transparent'" flat>
                            <h6 class="text-center text-uppercase">{{ week }}</h6>
                            <h1 class="text-center text-h3 font-weight-medium">{{ n + 10 }}</h1>
                        </v-card>
                    </th>
                </tr>
            </thead>
            <tbody>
                <schedule-calendar-schedule-row v-for="schedule in schedules" :schedule="schedule" :key="schedule._id"></schedule-calendar-schedule-row>
                <tr>
                    <td class="py-3 px-2" v-for="week, n in weekNames" :width="100 / 7 + '%'" :key="week">
                        <v-card @click="" class="py-2 rounded-lg " variant="tonal">
                            <h5 class="text-center font-weight-medium">
                                <v-icon>mdi-plus</v-icon>
                                Add Schedule
                            </h5>
                        </v-card>
                    </td>
                </tr>
                <tr class="h-100" style="background-color: rgba(255, 255, 255, .2)">
                    <td class="py-3 px-2" v-for="week, n in weekNames" :width="100 / 7 + '%'" :key="week">
                        <!-- <v-card class="py-4 rounded-lg" variant="tonal" >
                            <h5 class="text-center">
                                <v-icon>mdi-plus</v-icon>
                                Add Schedules
                            </h5>
                        </v-card> -->
                    </td>
                </tr>
            </tbody>
        </table>
    </v-card>
</template>

<script setup lang="ts">
const {schedules} = storeToRefs(useScheduleStore())
const weekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const currentDay = new Date()
const weekDay = []
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