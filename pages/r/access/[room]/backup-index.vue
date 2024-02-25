<template>
  <!-- <v-navigation-drawer width="500" class="pa-10" color="transparent" floating>
      <h1 class="text-white" style="font-family: 'Roboto', sans-serif;font-size: 100px;line-height: 1;">Good Morning</h1>
  </v-navigation-drawer> -->
  <v-main>
    <UtilsThemeBackground ref="video" style="position: fixed;top: 0;left: 0;"></UtilsThemeBackground>
    <v-card id="clock" class="bg-transparent rounded-lg d-flex justify-center flex-column align-center" flat>
        <h1 style="line-height: 1;font-family: 'Orbitron', sans-serif;font-weight:200;font-size: 100px;opacity: .8;">09:30</h1>
        <div class="d-flex align-center">
          <h5 class="text-center font-weight-regular ">{{ new Date().toDateString() }}</h5>
        </div>
    </v-card>
    <v-container class="h-screen bg-transparent" fluid
      style="position: fixed; top: 0;left:0;width: 100%;padding: 60px 80px 0px 10px;">
      <v-row class="h-100 d-flex ma-0">
        
        <v-col class="h-100 d-flex flex-column text-white" cols="8">
          <div v-if="false">
            <h2 class="ml-2">Hello, Joshua!👋</h2>
            <h1 class="text-h2 font-weight-bold">Good Morning</h1>
            <h3 class="mt-3 ml-2 font-weight-regular">I hope your day is off to a wonderful start and filled
              with
              positivity and productivity!</h3>
          </div>
          
          <v-spacer></v-spacer>
          <v-container fluid class="pa-0 h-50 pt-10">
            <v-row class="h-100 pb-0">
              <v-col class="px-5 h-100 py-0" cols="5">
                <v-hover v-slot="{ props, isHovering }">
                  <v-card v-bind="props" :style="{ opacity: isHovering ? 1 : .7 }" elevation="10"
                    class="rounded-lg h-100 " color="yellow">
                    <v-card-title class="d-flex align-center" style="font-size: 22px">
                      Notes
                      <v-spacer></v-spacer>
                      <v-btn append-icon="mdi-plus" variant="tonal" size="small" class="text-capitalize">new</v-btn>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text contenteditable="true" class="px-5 py-1 text-decoration-underline"
                      style="line-height: 2;font-family: 'Reenie Beanie', cursive;font-size: 35px;font-weight: 600;outline: none;">
                      The sun set behind the mountains as a lone traveler found solace in the whispering winds.
                    </v-card-text>
                  </v-card>
                </v-hover>
              </v-col>
              <v-col class="h-100 pl-5 pr-10 py-0">
                <v-card class="h-100 rounded-lg bg-transparent pa-5" flat>
                  <v-card height="80" width="80" class="d-flex justify-center align-center rounded-xl">
                    <v-icon>mdi-plus</v-icon>
                  </v-card>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col cols="4">
          <div>
      <v-hover v-slot="{ props, isHovering }" v-for="n in 5">
        <v-card flat style="font-family: 'Roboto';direction: ltr;" class="rounded-lg mb-2 pa-4"
          v-bind="props">
          <div class="d-flex justify-space-between">
            <v-chip class="rounded mb-2" color="green" size="x-small" variant="elevated">Message</v-chip>
            <h6 class="d-flex font-weight-regular justify-space-between">
              <v-icon class="mr-2">mdi-clock-outline</v-icon>
              {{ new Date().toDateString() }}
            </h6>
          </div>
          <h5>John doe message you</h5>
          <h5 class=" font-weight-regular">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error doloremque voluptatum ipsum voluptas.
          </h5>
        </v-card>
      </v-hover>
    </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
  <v-navigation-drawer v-if="false" width="425" location="right" color="transparent" class="pa-5 pb-0 text-white" permanent floating absolute>
    <!-- <v-card class="pa-5 rounded-lg mb-2" variant="tonal">
      <v-icon>mdi-bell</v-icon>
      Notification
    </v-card> -->
    <div>
      <v-hover v-slot="{ props, isHovering }" v-for="n in 5">
        <v-card flat style="font-family: 'Roboto';direction: ltr;" class="bg-white rounded-lg mb-2 pa-4"
          :variant="isHovering ? 'elevated' : 'tonal'" v-bind="props" :color="isHovering ? 'primary' : 'white'">
          <div class="d-flex justify-space-between">
            <v-chip class="rounded mb-2" color="green" size="x-small" variant="elevated">Message</v-chip>
            <h6 class="d-flex font-weight-regular justify-space-between">
              <v-icon class="mr-2">mdi-clock-outline</v-icon>
              {{ new Date().toDateString() }}
            </h6>
          </div>
          <h5>John doe message you</h5>
          <h5 class=" font-weight-regular">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error doloremque voluptatum ipsum voluptas.
          </h5>
        </v-card>
      </v-hover>
    </div>

  </v-navigation-drawer>
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
#clock{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-70%, -50%);
}
#motivation-card{
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

.animate-opacity {
  transition: opacity .25s ease;
  opacity: .76;
}

.animate-opacity:hover {
  opacity: 1;

}

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
    