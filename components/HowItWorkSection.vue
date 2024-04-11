<template>
      <v-container
      id="how-it-works"
      fluid
      style="padding-bottom: 60px"
      class="pt-15"
      :style="{paddingInline: name == 'lg' ? '115px' : '250px'}"
      :class="current.dark ? '' : 'bg-grey-lighten-4'"
    >
      <h3 class="text-center font-weight-bold mb-2 text-grey-darken-2">
        How it works
      </h3>
      <h1
        class="text-center text-h4 font-weight-bold"
        style="font-family: 'Ubuntu', sans-serif"
      >
        Your Guide to Productivity Mastery
      </h1>
      <p class="text-center text-h6 mt-2 font-weight-regular">
        Discover the Secrets Behind Seamless Task Management and Time Mastery
      </p>
      <div class="d-flex py-15 flex-wrap">
        <v-col cols="4">
          <v-card class="rounded-lg pa-5 d-flex flex-column" height="250">
            <v-card-text class="px-4">
              <h2 class="mb-2">Customizing background and theme</h2>
              <p class="">
                Personalize your experience by customizing backgrounds and
                themes to suit your unique style and preferences.
              </p>
            </v-card-text>
            <v-card-actions class="border-t">
              <v-btn
                append-icon="mdi-chevron-right"
                class="text-capitalize"
                color="blue-darken-1"
                >Learn more</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="rounded-lg pa-5 d-flex flex-column" height="250">
            <v-card-text class="px-4">
              <h2 class="mb-2">Managing your tasks</h2>
              <p class="">
                Empower yourself with our detailed task management guide,
                designed to walk you through the ins and outs of efficiently
                organizing and overseeing your tasks.
              </p>
            </v-card-text>
            <v-card-actions class="border-t">
              <v-btn
                append-icon="mdi-chevron-right"
                class="text-capitalize"
                color="blue-darken-1"
                >Learn more</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="rounded-lg pa-5 d-flex flex-column" height="250">
            <v-card-text class="px-4">
              <h2 class="mb-2">Planning your goals</h2>
              <p class="">
                Discover how our scheduling system optimizes your time and
                enhances productivity with our comprehensive guide.
              </p>
            </v-card-text>
            <v-card-actions class="border-t">
              <v-btn
                append-icon="mdi-chevron-right"
                class="text-capitalize"
                color="blue-darken-1"
                >Learn more</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="rounded-lg pa-5 d-flex flex-column" height="250">
            <v-card-text class="px-4">
              <h2 class="mb-2">Collaborate with your team</h2>
              <p class="">
                Enhance teamwork and streamline collaboration with our intuitive
                platform designed to facilitate seamless communication and
                coordination among team members.
              </p>
            </v-card-text>
            <v-card-actions class="border-t">
              <v-btn
                append-icon="mdi-chevron-right"
                class="text-capitalize"
                color="blue-darken-1"
                >Learn more</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="rounded-lg pa-5 d-flex flex-column" height="250">
            <v-card-text class="px-4">
              <h2 class="mb-2">Extension Installation</h2>
              <p class="">
                Effortlessly install our extension to seamlessly integrate our
                platform with your preferred browsers, expanding your
                productivity capabilities with ease.
              </p>
            </v-card-text>
            <v-card-actions class="border-t">
              <v-btn
                append-icon="mdi-chevron-right"
                class="text-capitalize"
                color="blue-darken-1"
                >Learn more</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </div>
    </v-container>
</template>

<script setup lang="ts">
const {current} = useTheme()
const {name} = useDisplay()
</script>

<style scoped>

</style>