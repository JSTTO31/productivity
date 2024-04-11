<template>
    <v-container
      fluid
      id="testimonial"
      style="padding-inline: 115px; padding-bottom: 80px"
      class="pt-15 bg-blue"
    >
      <div class="d-flex flex-column">
        <h1
          class="text-center text-h4 font-weight-bold text-white"
          style="font-family: 'Lato', sans-serif"
        >
          Hear What Others Are Saying
        </h1>
        <p class="text-center text-h6 text-white mt-2">
          Real Experiences, Real Results - Discover How Our App Transforms Lives
        </p>
      </div>
      <div class="d-flex mt-15 pt-15">
        <v-col
          cols="4"
          xl="3"
          class="pt-10"
          v-for="(t, n) in testimonial"
          :key="t.name"
        >
          <v-card
            elevation="5"
            class="pa-5 pt-0 d-flex flex-column rounded-xl"
            height="400"
            style="overflow: visible"
          >
            <v-avatar
              size="200"
              class="mx-auto"
              style="margin-top: -100px; box-shadow: 0 0 18px #888"
            >
              <v-img
                lazy-src="/dummy-profile.jpg"
                :src="t.picture"
              ></v-img>
            </v-avatar>
            <div>
              <h1 class="text-center mt-8">{{ t.name }}</h1>
              <h4 class="text-center text-grey-darken-1 font-weight-regular">
                {{ t.major }}
              </h4>
              <p
                class="text-center mt-5 text-subtitle-2 text-grey-darken-2 font-weight-regular"
              >
                {{ t.testimonial }}
              </p>
              <v-spacer></v-spacer>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-rating
                  color="primary"
                  density="comfortable"
                  hover
                  length="5"
                  size="64"
                  :model-value="t.rating"
                  readonly
                ></v-rating>
                <v-spacer></v-spacer>
              </v-card-actions>
            </div>
          </v-card>
        </v-col>
      </div>
    </v-container>
</template>

<script setup lang="ts">
const {name} = useDisplay()
const testimonial = [
  {
    name: "Emma Johnson",
    gender: "female",
    major: "Computer Science",
    testimonial:
      "🌟 Your productivity app has been a game-changer for me. The relaxing background, intuitive task management, comprehensive scheduling, insightful reports, and productivity tools have significantly enhanced my organization and focus. 😊👍",
    picture: '/persons/image1.jfif',
    rating: 5,
  },
  {
    name: "David Smith",
    gender: "male",
    major: "Engineering",
    testimonial:
      "🌟 Impressed by the effectiveness of your app. Calming background, streamlined task management, seamless scheduling, detailed reports, and productivity tools have boosted my efficiency. 🚀💡",
    picture: '/persons/image2.jfif',
    rating: 4.8,
  },
  {
    name: "Sophia Lee",
    gender: "female",
    major: "Business Administration",
    testimonial:
      "🌟 Your app has helped me stay organized and focused. Soothing background, easy task management, flexible scheduling options, insightful reports, and productivity tools. 💼✅",
    picture: '/persons/image3.jfif',
    rating: 4.7,
  },
  {
    name: "Ethan Brown",
    gender: "male",
    major: "Psychology",
    testimonial:
      "🌟 Using your app has been a pleasant experience. Calming background, user-friendly task management, customizable scheduling features, informative reports, and productivity tools. 📊🔧",
    picture: '/persons/image4.jfif',
    rating: 4.5,
  },
  {
    name: "Sophie Williams",
    gender: "female",
    major: "Environmental Science",
    testimonial:
      "🌟 Your app has been a lifesaver! Serene backgrounds, efficient task management, flexible scheduling, detailed reports, and array of productivity tools. 🌿🕒",
    picture: '/persons/image5.jfif',
    rating: 4.9,
  },
  {
    name: "Michael Johnson",
    gender: "male",
    major: "Mechanical Engineering",
    testimonial:
      "🌟 Can't imagine my life without your app now. It's like having a personal assistant at my fingertips! Calming backgrounds, powerful task management, insightful reports. 💪🔍",
    picture: '/persons/image6.jfif',
    rating: 4.8,
  },
];

</script>

<style scoped>

</style>