
<template>
    <div>
        <schedule-navigation-drawer :show-navigation="showRightNavigation"></schedule-navigation-drawer>
        <v-app-bar class="d-flex  align-center text-white" density="compact"
            style="background-color: rgba(0,0,0,.4);z-index: 50 !important;" flat absolute @vue:mounted="appbar = true">
            <v-app-bar-nav-icon @click="showRightNavigation = !showRightNavigation"></v-app-bar-nav-icon>
            <div id="app-bar-schedule" class="d-flex align-center w-100 pr-2"></div>
        </v-app-bar>
        <v-main class="h-screen">
            <v-card class="w-100 h-100 rounded-0" id="schedule-main" style="background-color: rgba(0, 0, 0, 0.2) !important">
                <nuxt-page></nuxt-page>
                <v-dialog contained width="460" :model-value="!!$route.query.delete" no-click-animation persistent>
                    <schedule-delete-card></schedule-delete-card>
                </v-dialog>
                <v-overlay class="d-flex justify-end" contained width="400" height="100%" :model-value="!!$route.query.edit" no-click-animation persistent transition="slide-x-reverse-transition" @click:outside="$router.push({query: {}})">
                    <v-card class="h-100 rounded-0">
                        <schedule-edit-container></schedule-edit-container>
                    </v-card>
                </v-overlay>
                <v-overlay class="d-flex justify-end" contained width="400" height="100%" :model-value="!!$route.query.date" no-click-animation persistent transition="slide-x-reverse-transition" @click:outside="$router.push({query: {}})">
                    <v-card class="h-100 rounded-0">
                        <schedule-create-container></schedule-create-container>
                    </v-card>
                </v-overlay>
            </v-card>
        </v-main>
    </div>
</template>

<script setup lang="ts">
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
useHead({
    title: 'Schedules'
})
definePageMeta({
    layout: 'authenticated',
    middleware: ['auth'],
    pageTransition: false
})
const {user} = storeToRefs(useUserStore())
const appbar = ref(false)
provide('appbar', appbar)
const showRightNavigation = ref(true)
const $schedule = useScheduleStore()
const { schedule, schedules } = storeToRefs($schedule)
const route = useRoute()

$schedule.getAll().then(() => {
    if (route.query.edit) {
        const find = schedules.value.find(item => item._id == route.query.edit)
        if (find) {
            schedule.value = find
        }
    }
})


onMounted(() => {
    if(user.value && !user.value.guide.schedule){
        const driverObj = driver({
          showProgress: true,
          steps: [
              {
                element: '#upcoming-schedule-container',
                popover: {
                    title: "Schedule Drawer Navigation",
                    description: "Access your upcoming schedules for today and view them organized by tags. Stay on top of your tasks and appointments with this convenient navigation drawer, allowing you to easily manage your schedule and prioritize your time effectively."
                }
              },
              {
                element: '#upcoming-schedule-container #container',
                popover: {
                    title: "Upcoming Today Schedule",
                    description: "View all your scheduled tasks and appointments for today in this container. Stay organized and on track with your daily agenda by easily accessing and managing your upcoming schedule."
                }
              },
              {
                element: '#upcoming-schedule-container #list-upcoming',
                popover: 
                {
                    title: "Upcoming Schedule Card",
                    description: "Check your upcoming schedule and appointments for today with this card. Each schedule item displays an indicator of the time it will occur, allowing you to plan your day effectively. You can also mark schedules as finished once completed."
                }
              },
              {
                element: '#list-tags-title',
                popover: {
                    title: "List Tag Container",
                    description: "View all the tags available for your schedules and tasks in this container. Tags help you organize and categorize your items efficiently, allowing for easier management and identification."
                }
              },
              {
                element: '#list-tags',
                popover: {
                    title: "List Tags",
                    description: "Browse through all the tags available for your schedules and tasks. You can delete tags that are no longer needed, helping you keep your tag list organized and relevant to your current needs."
                }
              },
              {
                element: '#list-tag-text-field',
                popover:
                {
                    title: "Add Tags",
                    description: "Use the text field to add new tags to your list. Tags help you categorize and organize your schedules and tasks, making it easier to manage and find them when needed."
                }
              },
              {
                element: '#app-bar-schedule-title',
                popover:{
                    title: "Today's Schedule",
                    description: "View your upcoming schedule for today. The date indicator at the top of the app bar shows the current date, helping you stay organized and prepared for the day's events."
                }
              },
              {
                element: '#schedule-create-button',
                popover:{
                    title: "Create New Schedule",
                    description: "Click here to create a new schedule. Whether it's a meeting, study session, or any other event, you can easily add it to your schedule to stay on track."
                }
              },
              {
                element: '#schedule-view-options',
                popover:{
                    title: "View Options",
                    description: "Switch between different views to organize your schedule the way you prefer. Choose from monthly, weekly, or daily views to easily manage your tasks and events."
                }
              },
              {
                element: '#schedule-actions',
                popover:{
                    title: "Schedule Actions",
                    description: "Access additional actions to manage your schedule. Use the arrow buttons to navigate between dates or simply click the 'Today' button to quickly jump to the current date."
                }
              },
              {
                element: '#schedule-main',
                popover:{
                    title: "Schedule View",
                    description: "Select your preferred view mode to visualize your schedule. Choose between weekly, monthly, or daily views to efficiently manage your time and plan ahead.",
                    onNextClick(){
                        if(user.value){
                            user.value.guide.schedule = true
                        }
                        driverObj.destroy();

                    }
                }
              },
          ],
          onDestroyStarted: () => {
              if (!driverObj.hasNextStep() || confirm("Do you want to skip this all?")) {
                if(user.value){
                            user.value.guide.schedule = true
                        }
                driverObj.destroy();
              }
          },
      });

      driverObj.drive()
    }
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