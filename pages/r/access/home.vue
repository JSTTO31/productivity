<template>
    <v-main class="h-100">
      <v-carousel :show-arrows="false" class="h-100 w-100">
        <v-carousel-item>
          <v-card class="bg-transparent rounded-lg d-flex justify-center flex-column align-center h-100" flat>
            <h1 class="text-white" style="line-height: 1;font-family: 'Orbitron', sans-serif;font-weight:200;font-size: 100px;opacity: .8;">
              {{ time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hourCycle: 'h24'}) }}
            </h1>
            <div class="d-flex align-center">
              <h5 class="text-center font-weight-regular text-white">{{ time.toDateString() }}</h5>
            </div>
          </v-card>
        </v-carousel-item>
        <v-carousel-item>
          <v-container class="h-screen bg-transparent"
            style="padding-inline: 50px;padding-top: 50px; padding-bottom: 100px;" fluid>
            <v-row class="h-100 d-flex ma-0">
              <v-col class="h-100 d-flex flex-column text-white" cols="12">
                <v-container fluid class="pa-0 h-100">
                  <v-row class="h-100 pb-0">
                    <v-col class="px-5 h-100 py-0" cols="4">
                      <HomeCardTask></HomeCardTask>
                    </v-col>
                    <v-col cols="4" class="h-100  py-0 d-flex flex-column" style="grid-row-gap: 35px;">
                      <HomeCardDailyProgress></HomeCardDailyProgress>
                      <HomeCardTimer></HomeCardTimer>
                    </v-col>
                    <v-col cols="4" class="h-100  py-0 d-flex flex-column" style="grid-row-gap: 35px;">
                        <HomeCardSchedule></HomeCardSchedule>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </v-carousel-item>
        <v-carousel-item>
          <v-container class="h-100" style="padding: 150px 400px;">
            <v-card elevation="10" class="rounded-lg h-100 " color="yellow">
              <v-card-title class="d-flex align-center" style="font-size: 18px">
                Notes
                <v-spacer></v-spacer>
                <v-btn append-icon="mdi-plus" variant="tonal" size="small" class="text-capitalize">new</v-btn>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text contenteditable="true" class="px-5 py-1 text-decoration-underline"
                style="line-height: 2;font-family: 'Reenie Beanie', cursive;font-size: 30px;font-weight: 600;outline: none;">
                The sun set behind the mountains as a lone traveler found solace in the whispering winds.
              </v-card-text>
            </v-card>
          </v-container>
        </v-carousel-item>
      </v-carousel>
    </v-main>
  </template>
      
  <script setup lang="ts">
  const time = ref(new Date())
  
  setInterval(() => {
    time.value = new Date()
  }, 1000)
  useHead({
    title: 'Home'
  })
  
  definePageMeta({
    layout: 'authenticated',
    middleware: 'auth'
  })
  
  
  </script>
    
    
  <style scoped>
  #clock {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-70%, -50%);
  }
  
  #motivation-card {
    position: fixed;
    bottom: 15px;
    left: 15px;
  }
  
  /* #greet {
    position: fixed;
    top: 15%;
    left: 2%;
    width: 30%;
    font-family: 'Roboto';
  }
  
  */
  .animate-opacity {
    transition: opacity .25s ease;
    opacity: .76;
  }
  
  .animate-opacity:hover {
    opacity: 1;
  
  }
  
  /*
  #greet h1 {
    font-weight: 700;
  }
  
  #some-text {
    position: fixed;
    bottom: 5%;
    left: 2%;
    width: 27%;
  }
  
  #weather {
    position: fixed;
    top: 15%;
    right: 3%;
    width: 20%;
    font-family: 'Roboto';
    height: 80%;
  }
  
  
  #weather h1 {
    font-weight: 400;
  }
  
  #notes {
    position: fixed;
    top: 5%;
    right: 5%;
    width: 18%;
    font-family: 'Roboto';
  }
  
  
  
  
  #tools-container {
    position: fixed;
    bottom: 0;
    right: 0; */
  /* } */
  </style>
      