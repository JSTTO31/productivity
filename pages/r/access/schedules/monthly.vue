<template>
    <v-layout class="h-100" >
         <v-app-bar height="45" class="d-flex border-b" flat color="transparent" style="border-color: rgba(255,255,255,.1) !important;">
             <v-col v-for="name in weekNames" :key="name" class="text-subtitle-2 text-center text-white">{{ name }}</v-col>
         </v-app-bar>
         <v-main class="h-100">
             <v-container fluid class="pa-0 flex-wrap h-100 d-flex w-100">
                 <schedule-monthly-card v-for="day in days" :key="day.getDate()" :day="day"></schedule-monthly-card>
             </v-container>
         </v-main>
         <v-overlay transition="slide-x-reverse-transition" class="d-flex justify-end" width="400" height="100%" @click:outside="$router.push({name: 'r-access-schedules-monthly'})" :model-value="$route.name == 'r-access-schedules-monthly-date'" contained  style="z-index: 5000;">
            <v-card class="h-100 rounded-0">
                <NuxtPage></NuxtPage>
            </v-card>
        </v-overlay>
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
 const weekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
 const today = new Date()
 const days = computed(() => {
     let day = 0
     const now = new Date()
     const container : Date[] = []
 
     while(day < 35){
         const currentDate = new Date(now)
         currentDate.setDate(day)
         container.push(currentDate)
         day++
     } 
 
     return container
 })
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