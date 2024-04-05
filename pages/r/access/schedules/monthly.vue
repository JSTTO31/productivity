<template>
    <v-layout class="h-100" >
         <v-app-bar height="45" class="d-flex border-b" flat color="transparent" style="border-color: rgba(255,255,255,.1) !important;">
             <v-col v-for="name in weekNames" :key="name" class="text-subtitle-2 text-center text-white">{{ name }}</v-col>
         </v-app-bar>
         <v-main class="h-100">
             <v-container fluid class="pa-0 flex-wrap h-100 d-flex w-100">
                 <schedule-monthly-card v-for="day in days" :key="day.toDateString()" :style="day.getMonth() != currentMonth ? 'opacity: .5;' : ''" :day="day"></schedule-monthly-card>
             </v-container>
         </v-main>
         <v-dialog transition="slide-y-reverse-transition" width="800" height="100%" @click:outside="$router.push({name: 'r-access-schedules-monthly'})" :model-value="$route.name == 'r-access-schedules-monthly-date'" contained  style="z-index: 5000;">
            <v-card class="h-100 rounded">
                <NuxtPage></NuxtPage>
            </v-card>
        </v-dialog>
        <div v-if="appbar">
            <Teleport to="#app-bar-schedule">
            <v-app-bar-title class="d-flex font-weight-bold align-center">
                <span class="mr-5">{{ titleDate }}</span>
                <v-btn size="small" @click="$router.push({query: {date: new Date().toISOString()}})" variant="flat" class=" mr-2 text-capitalize px-3" append-icon="mdi-plus-circle-outline" color="primary">Create</v-btn>
            </v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn :to="{ name: 'r-access-schedules-monthly' }"
                :variant="$route.name == 'r-access-schedules-monthly' ? 'flat' : 'tonal'" class="text-capitalize mr-2"
                size="small">Monthly</v-btn>
            <v-btn :to="{ name: 'r-access-schedules' }" class="text-capitalize mr-2" size="small"
                :variant="$route.name == 'r-access-schedules' ? 'flat' : 'tonal'" :active="false">Weekly</v-btn>
            <v-btn :to="{ name: 'r-access-schedules-daily' }"
                :variant="$route.name == 'r-access-schedules-daily' ? 'flat' : 'tonal'" class="text-capitalize"
                size="small">Daily</v-btn>
            <v-divider inset vertical class="mx-3"></v-divider>
            <v-btn size="x-small" variant="tonal" class="rounded-lg mr-2" icon="mdi-chevron-left"
                @click="decreaseDate"></v-btn>
            <v-btn @click="reset" class="text-capitalize mr-2"
                size="small">Today</v-btn>
            <v-btn size="x-small" variant="tonal" class="rounded-lg" icon="mdi-chevron-right"
                @click="increaseDate"></v-btn>
            </Teleport>
        </div>
    </v-layout>
 </template>
 
 <script setup lang="ts">
 import { computed } from 'vue';
 definePageMeta({
     pageTransition: {
         name: 'slide',
         mode: 'out-in'
     }
 })
const appbar = inject('appbar')
const currentMonth = ref(new Date().getMonth())
const titleDate = computed(() => {
    const currentDate = new Date()
    currentDate.setMonth(currentMonth.value)
    return months[currentDate.getMonth()] + ' ' + currentDate.getFullYear()
})
const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

 const weekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
 const days = computed(() => {
     let day = 0
     const now = new Date()
     now.setMonth(currentMonth.value)
     const container : Date[] = []
 
     while(day < 35){
         const currentDate = new Date(now)
         currentDate.setDate(day)
         container.push(currentDate)
         day++
     } 
 
     return container
 })

 function increaseDate() {
    currentMonth.value++
}
function decreaseDate() {
    currentMonth.value--
}
function reset(){
    const day = new Date()
    currentMonth.value = day.getMonth()
}
 </script>
 
 <style scoped>

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