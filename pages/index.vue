<template>
    <div>
      <div style="padding-inline: 100px;padding-top: 80px" class="d-flex flex-column">
        <h1 class="text-h2 font-weight-bold text-center" style="line-height: 1.2;">
          Boost productivity with <span class="text-primary" style="font-family: 'Lato';font-weight: 800;">Efficiently</span>. Stay organized, focused, and efficient.
        </h1>
        <h3 class="font-weight-regular mt-5 px-15 text-center text-grey-darken-2">Transform Your Daily Routine into a Productivity Powerhouse:
          Seamlessly Manage Tasks, Enhance Focus, and Unleash Your Efficiency Potential with Our Cutting-Edge App</h3>
        <div class="d-flex justify-center mt-12">
          <v-btn color="primary" class="font-weight-bold text-capitalize" size="large">Take the First Step</v-btn>
          <!-- <v-btn variant="plain" append-icon="mdi-play" class="font-weight-bold text-capitalize ml-5" size="large">Watch
            our video</v-btn> -->
        </div>
      </div>
      <div>
      <v-card height="550" color="grey-lighten-1" class="rounded-xl d-flex mt-15 align-center justify-center" elevation="5" style="background-image: url('https://source.unsplash.com/random/1500x550/?collaboration');">
          <v-btn icon="mdi-play" size="x-large" color="white"></v-btn>
      </v-card>
      </div>
    </div>

</template>
<script setup lang="ts">
useHead({
  title: 'Efficiently | Gets started to our app',
})

onMounted(() => {
  document.getElementById('spline')?.addEventListener('load', () => {
    const logo =  document.getElementById('logo')
    if(logo)logo.style.display = 'none'
    
  })
})
</script>
