<template>
  <v-main class="pt-0">
    <HeroSection></HeroSection>
    <FeatureSections></FeatureSections>
    <TestimonialSection></TestimonialSection>
    <HowItWorkSection></HowItWorkSection>
    
    <v-container
      fluid
      style="padding-bottom: 60px;;overflow: hidden;"
      class="pt-15 h-screen d-flex bg-secondary"
      :style="{paddingInline: name == 'lg' ? '115px' : '250px'}"

    >
      <v-col cols="7" class="pt-15">
        <h1
          class="text-h3 font-weight-bold"
          style="font-family: 'Ubuntu', sans-serif"
        >
          Take Control of Your Productivity Journey!
        </h1>
        <h3 class="mt-5 font-weight-regular">Unlock your productivity potential with Efficiently. Sign up now to streamline task management, schedule effectively, and achieve your goals effortlessly. Experience the difference today!</h3>
        <v-btn size="x-large" color="black" class="mt-15 text-capitalize" @click="$router.push({ name: 'auth-login' })">Try it now, it's free</v-btn>
      </v-col>
      <v-col cols="5">
        <v-card color="transparent" flat width="800">
          <v-img width="750" src="/undraw/team.svg"></v-img>
        </v-card>
      </v-col>
    </v-container>
  </v-main>
  <v-footer
    color="pa-5 py-10 border-t"
    :class="current.dark ? 'bg-surface' : 'bg-grey-lighten-3'"
    :style="{paddingInline: name == 'lg' ? '115px' : '250px'}"

  >
    <AppLogo class="text-h5"></AppLogo>
    <v-spacer></v-spacer>
    <span class="mr-10 font-weight-bold">Home</span>
    <span class="mr-10 font-weight-bold">Features</span>
    <span class="mr-10 font-weight-bold">Testimonial</span>
    <span class="mr-10 font-weight-bold">Guides</span>
    <span class="mr-10 font-weight-bold">Pricing</span>
    <span class="mr-10 font-weight-bold">FAQ</span>
    <v-icon class="mr-5 ml-10">mdi-facebook</v-icon>
    <v-icon class="mr-5">mdi-twitter</v-icon>
    <v-icon class="mr-5">mdi-instagram</v-icon>
    <v-icon class="mr-5">mdi-github</v-icon>
  </v-footer>
  <v-footer
    class="d-flex justify-center"
    :class="current.dark ? 'bg-background' : 'bg-grey-darken-4'"
  >
    © Efficiently 2024. All Rights Reserved. | Privacy Policy | Terms of Service
    | Contact Us
  </v-footer>
</template>
<script setup lang="ts">
const { current } = useTheme();
const {name} = useDisplay()
useHead({
  title: "Efficiently | Gets started to our app",
});
const {lg} = useDisplay()

onMounted(() => {
  document.getElementById("spline")?.addEventListener("load", () => {
    const logo = document.getElementById("logo");
    if (logo) logo.style.display = "none";
  });
});



</script>
<style scoped>
.testimonial-card {
  transition: 0.2s ease;
}

.testimonial-card:hover {
  transform: scale(1.2);
  z-index: 100;
}


</style>
