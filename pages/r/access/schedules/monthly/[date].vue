<template>
    <v-layout class="h-100" >
        <v-app-bar density="comfortable" class="border-b" flat>
            <v-app-bar-title class="font-weight-medium">
                {{ new Date(route.params.date.toString()).toDateString() }}
            </v-app-bar-title>
            <v-btn icon="mdi-close" @click="$router.push({name: 'r-access-schedules-monthly'})"></v-btn>
        </v-app-bar>
        <v-main class="h-100">
            <v-card class="pa-4 h-100" height="500" style="overflow-y: auto;" id="date-list-container">
               <schedule-date-list-item v-for="schedule in getSchedules" :key="schedule._id" :schedule="schedule"></schedule-date-list-item>
               <v-btn @click="showCreateSchedule = true" block prepend-icon="mdi-plus" class="text-capitalize" size="large" variant="tonal">Add Schedule</v-btn>
               <v-dialog style="position: fixed;" contained v-model="showCreateSchedule">
                <v-card>
                    <div class="pa-4 pt-1">
                        <v-card-title class="px-0 text-subtitle-1">New Schedule</v-card-title>
                        <schedule-create-schedule-card v-model:menu="showCreateSchedule" :start-at="startAt" :end-at="endAt"></schedule-create-schedule-card>
                    </div>
                </v-card>
            </v-dialog>
            </v-card>
        </v-main>
    </v-layout>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const showCreateSchedule = ref(false)
const route = useRoute()
const {schedules} = storeToRefs(useScheduleStore())
const getSchedules = computed(() => schedules.value.filter(schedule => new Date(schedule.startAt).toDateString() == new Date(route.params.date.toString()).toDateString()))
const startAt = computed(() => getSchedules.value.length > 0 ? new Date(getSchedules.value[getSchedules.value.length - 1].endAt) : new Date(route.params.date.toString()))
const endAt = new Date(route.params.date.toString())
endAt.setHours(22)
endAt.setMinutes(0)


</script>

<style scoped>
 #date-list-container::-webkit-scrollbar{
    width: 8px;
 }
 
 #date-list-container::-webkit-scrollbar-thumb{
    background-color: rgba(0, 0, 0, .3);
    border-radius: 5px;
 }
</style>