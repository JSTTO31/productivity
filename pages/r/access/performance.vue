<template>
 <div>
  <v-main>
    <v-card flat class="h-100 rounded-0 pt-5" color="transparent">
      <v-container class="h-100">
        <v-row class="">
          <v-col cols="4">
            <v-card
              height="150"
              class="d-flex h-100 align-center rounded-lg pa-5"
            >
              <v-avatar
                size="90"
                style="position: absolute"
                color="yellow-lighten-4 text-h4"
              >
                JS
              </v-avatar>
              <div class="w-100 ml-10 mt-n5" style="padding-left: 70px">
                <h2 class="font-weight-medium">Joshua Sotto</h2>
                <v-progress-linear
                  height="35"
                  :model-value="timespentProgress"
                  color="warning"
                  class="rounded mt-2 mb-n5"
                  > {{timeSpendToString}}</v-progress-linear
                >
              </div>
             
            </v-card>
          </v-col>
          <v-col>
            <v-card
              height="150"
              class="d-flex pa-5 align-center rounded-lg"
              style="gap: 5px"
              flat
            >
              <v-tooltip >
                <template #activator="{props}">
                  <div v-bind="props" class="w-33 d-flex align-center justify-center">
                    <v-avatar size="50" class="mr-4 rounded-0">
                      <v-img src="/icons/project.png"></v-img>
                    </v-avatar>
                    <h1 class="ml-5 text-h3 font-weight-medium">{{ projects.length }}</h1>
                  </div>
                </template>
                Total of projects
              </v-tooltip>
              <v-divider vertical class="h-100 mx-5"></v-divider>
              <v-tooltip >
                <template #activator="{props}">
                  <div v-bind="props" class="w-33 d-flex align-center justify-center">
                    <v-avatar size="50" class="mr-4 rounded-0">
                      <v-img src="/icons/schedule.png"></v-img>
                    </v-avatar>
                    <h1 class="ml-5 text-h3 font-weight-medium">{{ schedules.length }}</h1>
                  </div>
                </template>
                Total of schedules
              </v-tooltip>
              <v-divider vertical class="h-100 mx-5"></v-divider>
              <v-tooltip >
                <template #activator="{props}">
                  <div v-bind="props" class="w-33 d-flex align-center justify-center">
                    <v-avatar size="50" class="mr-4 rounded-0">
                      <v-img src="/icons/hour-glass.png"></v-img>
                    </v-avatar>
                    <h1 class="ml-5 text-h3 font-weight-medium">{{ minutes }}</h1>
                  </div>
                </template>
                Time spent
              </v-tooltip>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="h-75 mt-6">
          <v-col cols="8">
            <v-card height="400" class=" rounded-lg w-100 pa-5 pb-15">
              <v-card-title class="pa-0 pb-4">Time spent</v-card-title>
              <LIneChart></LIneChart>
            </v-card>
          </v-col>
          <v-col cols="4" class="pb-0 d-flex flex-column">
            <v-card height="400" class="pa-5 rounded-lg d-flex flex-column">
              <v-card-title class="pa-0 text-capitalize" style="font-size: 18px"
                >task completion rate</v-card-title
              >
              <v-progress-circular
                class="mb-n15 mt-7 mx-auto rounded text-subtitle-1"
                :color="color"
                size="250"
                width="10"
                :model-value="completion"
              >
                <div
                  class="d-flex flex-column font-weight-medium text-capitalize align-center"
                >
                  <span class="text-h4 font-weight-medium"> {{ completion.toFixed(1) }}% </span>
                  <span>completion</span>
                </div>
              </v-progress-circular>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-main>
 </div>
</template>

<script setup lang="ts">
import { useTimeSpentStore } from '~/stores/timeSpent';

useHead({
  title: "Performance",
});
definePageMeta({
  layout: "authenticated",
  middleware: ["auth"],
});
const {total, hours, minutes, todayTimeSpent} = storeToRefs(useTimeSpentStore())
const { schedules } = storeToRefs(useScheduleStore());
const {projects} = storeToRefs(useProjectStore())
const $project = useProjectStore()
const timespentProgress = computed(() => (((todayTimeSpent.value?.spent || 0) / 1000 * 60) % 60) / 2)
const timeSpendToString = computed(() => {
  if(!todayTimeSpent.value) return ''
  const hours = Math.floor((todayTimeSpent.value?.spent / (1000 * 60)) / 60)
  const minutes = Math.floor((todayTimeSpent.value?.spent / ((1000 * 60) ) % 60))

  return `${hours} hours and ${minutes} minutes`
})


$project.getAll()
const $schedule = useScheduleStore()
$schedule.getAll()
const completion = computed(() => {
    const data = projects.value.reduce((data, project) => {
        const section = project.sections.reduce((data, section) => {
            data.completed += section.tasks.filter(task => task.completed).length 
            data.count += section.tasks.length 

            return data
        }, {count: 0, completed: 0})

        data.completed += section.completed
        data.count += section.count

        return data
    }, {count: 0, completed: 0})

    return data.completed / data.count * 100
})

const color = computed(() => completion.value > 49 ? 'success' : completion.value > 15 ? 'warning' : 'error')
</script>

<style scoped></style>
