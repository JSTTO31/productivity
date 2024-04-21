<template>
 <div>
  <v-main>
    <v-card flat class="h-100 rounded-0 pt-5" color="transparent">
      <v-container class="h-100" :style="{paddingInline: name == 'lg' ? '' : '250px'}">
        <v-row class="">
          <v-col cols="4">
            <v-card
              v-if="user"
              height="150"
              class="d-flex h-100 align-center rounded-lg pa-5"
              id="daily-spend"
            >
              <v-avatar
                size="90"
                style="position: absolute"
                color="yellow-lighten-4 text-h4"
              >
                <v-img :src="user.picture"></v-img>
              </v-avatar>
              <div class="w-100 ml-10 mt-n5" style="padding-left: 70px">
                <h2 class="font-weight-medium">{{user.name}}</h2>
                <v-progress-linear
                  height="35"
                  :model-value="timespentProgress"
                  color="warning"
                  class="rounded mt-2 mb-n5"
                  > {{ timespentProgress >= 100 ?  'Daily Spend Completed' : timeSpendToString}}</v-progress-linear
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
              id="statistics"
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
                Total projects
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
                Total schedules
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
            <v-card id="monthly-usage" height="400" class=" rounded-lg w-100 pa-5 pb-15">
              <v-card-title class="pa-0 pb-4">Time spent</v-card-title>
              <MonthlyUsageLineChart :data="data"></MonthlyUsageLineChart>
            </v-card>
          </v-col>
          <v-col cols="4" class="pb-0 d-flex flex-column">
            <v-card id="tasks-completion" height="400" class="pa-5 rounded-lg d-flex flex-column">
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
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useTimeSpentStore } from '~/stores/timeSpent';
const {name} = useDisplay()
useHead({
  title: "Performance",
});
definePageMeta({
  layout: "authenticated",
  middleware: ["auth"],
});
const {user} = storeToRefs(useUserStore())
const {minutes, todayTimeSpent} = storeToRefs(useTimeSpentStore())
const { schedules } = storeToRefs(useScheduleStore());
const {projects} = storeToRefs(useProjectStore())
const $project = useProjectStore()
const date = new Date()
const timespentProgress = computed(() => {
  if(!todayTimeSpent.value) return 0
  const toSpendTime = 1000 * 60 * 60 * 2 // 2 hours
  return todayTimeSpent.value.spent / toSpendTime * 100
})
const timeSpendToString = computed(() => {
  if(!todayTimeSpent.value) return ''
  const hours = Math.floor((todayTimeSpent.value?.spent / (1000 * 60)) / 60)
  const minutes = Math.floor((todayTimeSpent.value?.spent / ((1000 * 60) ) % 60))
  return `${hours} hours and ${minutes} minutes`
})
const data = computed(() => [0,0,0,minutes.value,0,0,0,0])


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

    return (data.completed / data.count * 100) || 0
})

const color = computed(() => completion.value > 49 ? 'success' : completion.value > 15 ? 'warning' : 'error')
onMounted(() => {
  if(user.value && !user.value.guide.performance){
    const driverObj = driver({
          showProgress: true,
          steps: [
              {
                element: '#daily-spend',
                popover: {
                  title: "Fulfill Your Daily Spend",
                  description: "Stay on track with your daily spend goal to ensure productive and efficient use of your time while using the app. By fulfilling your daily spend, you can maximize your productivity and achieve your academic goals more effectively."
                }
              },
              {
                element: '#statistics',
                popover: 
                {
                  title: "Track Your Progress",
                  description: "Monitor the number of projects you've created, your scheduled tasks, and your total usage time within the app. Tracking your progress allows you to stay organized and make informed decisions about managing your time effectively."
                }
              },
              {
                element: '#monthly-usage',
                popover: 
                {
                  title: "Track Your Progress",
                  description: "Monitor the number of projects you've created, your scheduled tasks, and your total usage time within the app. Tracking your progress allows you to stay organized and make informed decisions about managing your time effectively."
                }
              },
              {
                element: '#tasks-completion',
                popover: {
                  title: "Tasks Completion Progress",
                  description: "Track your progress with a visual representation of tasks completion. This progress bar shows you how many tasks you've completed compared to your total tasks, helping you stay motivated and focused on achieving your goals.",
                  onNextClick(){
                    if(user.value){
                        user.value.guide.performance = true
                    }
                    driverObj.destroy();

                  }
                }
              },
          ],
          onDestroyStarted: () => {
              if (!driverObj.hasNextStep() || confirm("Do you want to skip this all?")) {
                  if(user.value){
                      user.value.guide.performance = true
                  }
                  driverObj.destroy();
                  
              }
          },
      });

      driverObj.drive()
  }
})
</script>

<style scoped></style>
