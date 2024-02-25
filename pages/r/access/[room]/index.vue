<template>
  <v-hover v-slot="{props, isHovering}">
    <v-navigation-drawer v-bind="props" :width="isHovering ? 150 : 25" style="transition: .25s ease;" class="animate-opacity">
      <div class="w-100 h-100 d-flex align-center justify-end" v-if="!isHovering">
        <v-icon>mdi-chevron-right</v-icon>
      </div>
      <div class="d-flex flex-column justify-center px-2 h-100" v-if="isHovering">
        <v-card v-for="n in 3" height="125" color="grey-lighten-1" class="my-2 d-flex align-center justify-center">
          <h1>{{ n }}</h1>
        </v-card>
      </div>
    </v-navigation-drawer>
  </v-hover>
  <v-main>
    <!-- <v-card id="clock" class="bg-transparent rounded-lg d-flex justify-center flex-column align-center" flat v-if="true">
      <h1 style="line-height: 1;font-family: 'Orbitron', sans-serif;font-weight:200;font-size: 100px;opacity: .8;">09:30
      </h1>
      <div class="d-flex align-center">
        <h5 class="text-center font-weight-regular ">{{ new Date().toDateString() }}</h5>
      </div>
    </v-card> -->
    <v-container class="h-screen bg-transparent" fluid
      style="position: fixed; top: 0;left:0;width: 100%;padding: 90px 280px 15px 210px;">
      <v-row class="h-100 d-flex ma-0">
        <v-col class="h-100 d-flex flex-column text-white" cols="12">
          <v-container fluid class="pa-0 h-100">
            <v-row class="h-100 pb-0">
              <v-col class="px-5 h-100 py-0" cols="7">
                <HomeCardTask></HomeCardTask>
              </v-col>
              <v-col cols="5" class="h-100  py-0 d-flex flex-column" style="grid-row-gap: 35px;">
                <HomeCardDailyProgress></HomeCardDailyProgress>
                <HomeCardTimer></HomeCardTimer>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
    
<script setup lang="ts">
useHead({
  title: 'Efficiently | Home'
})

definePageMeta({
  layout: false,
  layoutTransition: false,
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
/* } */</style>
    