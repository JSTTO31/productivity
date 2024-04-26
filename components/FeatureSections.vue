<template>
     <v-container
     
      id="features"
      fluid
      :style="{
          paddingInline: name == 'lg' ? '115px' : '250px'
      }"
      class="pt-15 pb-15"
    >
      <div class="d-flex flex-column">
        <h3 class="text-center font-weight-bold mb-2 text-grey-darken-2">
          Features
        </h3>
        <h1
          class="text-center text-h4 font-weight-bold"
          style="font-family: 'Lato', sans-serif"
        >
          Relaxing background
        </h1>
        <p class="text-center">
          Immerse Yourself in Calming Backgrounds, Letting Serenity Guide Your
          Path to Productive Study Sessions
        </p>
        <v-btn
        @click="$router.push({ name: 'auth-login' })"  
        variant="outlined"
          class="mx-auto mt-5 text-capitalize"
          size="large"
          color="primary"
          >try it, it's free</v-btn
        >
      </div>
      <div class="d-flex">
        <FeatureVideoContainer src="https://efficiently-au.netlify.app/video/home.mp4"></FeatureVideoContainer>
      </div>
    </v-container>
    <v-container
    
      id="features"
      fluid
      :style="{
        paddingInline: name == 'lg' ? '115px' : '250px'
      }"
      class="pt-15 pb-15"
    >
      <div class="d-flex flex-column">
        <h3 class="text-center font-weight-bold mb-2 text-grey-darken-2">
          Features
        </h3>
        <h1
          class="text-center text-h4 font-weight-bold"
          style="font-family: 'Lato', sans-serif"
        >
        Efficient Task Management
        </h1>
        <p class="text-center">
          Simplify Your Day, Get Things Done, and Feel Accomplished with Our Intuitive Task Management Solution!
        </p>
        <v-btn
        @click="$router.push({ name: 'auth-login' })"  
        variant="outlined"
          class="mx-auto mt-5 text-capitalize"
          size="large"
          color="primary"
          >try it, it's free</v-btn
        >
      </div>
      <div class="d-flex">
        <FeatureVideoContainer src="https://efficiently-au.netlify.app/video/project.mp4"></FeatureVideoContainer>
      </div>
    </v-container>
    <v-container
    
      id="features"
      fluid
      :style="{
        paddingInline: name == 'lg' ? '115px' : '250px'
      }"
      class="pt-15 pb-15"
    >
      <div class="d-flex flex-column">
        <h3 class="text-center font-weight-bold mb-2 text-grey-darken-2">
          Features
        </h3>
        <h1
          class="text-center text-h4 font-weight-bold"
          style="font-family: 'Lato', sans-serif"
        >
          Your Time Management Solution
        </h1>
        <p class="text-center">
          Take Control of Your Schedule, Maximize Your Productivity, and Make Every Minute Count!
        </p>
        <v-btn
        @click="$router.push({ name: 'auth-login' })"  
        variant="outlined"
          class="mx-auto mt-5 text-capitalize"
          size="large"
          color="primary"
          >try it, it's free</v-btn
        >
      </div>
      <div class="d-flex">
       <FeatureVideoContainer src="https://efficiently-au.netlify.app/video/schedule.mp4"></FeatureVideoContainer>
      </div>
    </v-container>
    <v-container
    
      fluid
      :style="{
        paddingInline: name == 'lg' ? '115px' : '250px'
      }"
      class="pt-5 pb-15"
    >
      <div class="d-flex flex-column">
        <h3 class="text-center font-weight-bold mb-2 text-grey-darken-2">
          Features
        </h3>
        <h1
          class="text-center text-h4 font-weight-bold"
          style="font-family: 'Lato', sans-serif"
        >
          Optimize Your Productivity
        </h1>
        <p class="text-center">
          Track Daily Usage and Task Completion, Utilize Drag-and-Drop Tools such as Timer, Media Player, and Todo List for Enhanced Efficiency.
        </p>
        <v-btn
        @click="$router.push({ name: 'auth-login' })"  
        variant="outlined"
          class="mx-auto mt-5 text-capitalize"
          size="large"
          color="primary"
          >try it, it's free</v-btn
        >
      </div>
      <div class="d-flex w-100 mt-15" style="gap: 25px;">
       <PresentableCardTask></PresentableCardTask>
       <PresentableTimer></PresentableTimer>
       <PresentableMedia></PresentableMedia>
      </div>
      <div class="d-flex mt-5 pa-0">
        <v-card
          class="rounded-lg pb-5 w-50 pa-5 align-center justify-center border"
          flat
          height="400"
        >
          <LIneChart></LIneChart>
        </v-card>
        <span></span>
        <div class="w-50 pl-8">
          <v-card height="400"  flat class="pa-5 w-100 rounded-lg d-flex flex-column border">
              <v-progress-circular
                class="mb-n15 mt-7 mx-auto rounded text-subtitle-1"
                color="success"
                size="290"
                width="10"
                :model-value="85"
              >
                <div
                  class="d-flex flex-column font-weight-medium text-capitalize align-center"
                >
                  <span class="text-h3 font-weight-medium"> {{ 85 }}% </span>
                  <span>completion</span>
                </div>
              </v-progress-circular>
            </v-card>
        </div>
      </div>
    </v-container>
</template>

<script setup lang="ts">
const {name} = useDisplay()
const {current} = useTheme()
</script>

<style scoped>

</style>