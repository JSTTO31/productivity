<template>
  <v-main class="pt-0">
    <v-container
      style="padding-top: 180px; padding-inline: 250px; z-index: 200"
      fluid
      class="d-flex pb-15 flex-column"
      :style="
        current.dark
          ? ''
          : 'background-image: linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);'
      "
    >
      <h1 class="text-h2 font-weight-bold text-center" style="line-height: 1.2">
        Boost productivity with <span class="text-primary">Efficiently</span>.
        Stay organized, focused, and efficient.
      </h1>
      <h3 class="font-weight-regular mt-5 px-15 text-center">
        Transform Your Daily Routine into a Productivity Powerhouse: Seamlessly
        Manage Tasks, Enhance Focus, and Unleash Your Efficiency Potential with
        Our Cutting-Edge App
      </h3>
      <div class="d-flex justify-center mt-12">
        <v-btn
          color="primary"
          class="font-weight-bold rounded-lg text-capitalize"
          size="x-large"
          flat
          @click="$router.push({ name: 'auth-login' })"
          >Get's started for free</v-btn
        >
        <!-- <v-btn variant="plain" append-icon="mdi-play" class="font-weight-bold text-capitalize ml-5" size="large">Watch
            our video</v-btn> -->
      </div>
      <div
        id="screenshots"
        class="py-10"
        style="width: 100%; height: 648px; position: relative"
      >
        <v-card id="screenshot-home" class="rounded-lg" elevation="5">
          <v-card
            height="50"
            class="pa-2 rounded-0 border-b d-flex align-center"
          >
            <div class="d-flex mr-15 ml-2">
              <v-icon class="ml-1" color="success" size="18">mdi-circle</v-icon>
              <v-icon class="ml-1" color="warning" size="18">mdi-circle</v-icon>
              <v-icon class="ml-1" color="error" size="18">mdi-circle</v-icon>
            </div>
            <div class="w-25">
              <v-text-field
                density="compact"
                readonly
                hide-details
                variant="solo-filled"
                flat
                prepend-inner-icon="mdi-magnify"
                single-line
                label="Search..."
              ></v-text-field>
            </div>
          </v-card>
          <v-img src="/screenshots/home.png"></v-img>
        </v-card>
        <v-card id="screenshot-project" class="rounded-lg" elevation="5">
          <v-card
            height="50"
            class="pa-2 rounded-0 border-b d-flex align-center"
          >
            <div class="d-flex mr-15 ml-2">
              <v-icon class="ml-1" color="success" size="18">mdi-circle</v-icon>
              <v-icon class="ml-1" color="warning" size="18">mdi-circle</v-icon>
              <v-icon class="ml-1" color="error" size="18">mdi-circle</v-icon>
            </div>
            <div class="w-25">
              <v-text-field
                density="compact"
                readonly
                hide-details
                variant="solo-filled"
                flat
                prepend-inner-icon="mdi-magnify"
                single-line
                label="Search..."
              ></v-text-field>
            </div>
          </v-card>
          <v-img src="/screenshots/project.png"></v-img>
        </v-card>
        <v-card id="screenshot-schedule" class="rounded-lg" elevation="5">
          <v-card
            height="50"
            class="pa-2 rounded-0 border-b d-flex align-center"
          >
            <div class="d-flex mr-15 ml-2">
              <v-icon class="ml-1" color="success" size="18">mdi-circle</v-icon>
              <v-icon class="ml-1" color="warning" size="18">mdi-circle</v-icon>
              <v-icon class="ml-1" color="error" size="18">mdi-circle</v-icon>
            </div>
            <div class="w-25">
              <v-text-field
                density="compact"
                readonly
                hide-details
                variant="solo-filled"
                flat
                prepend-inner-icon="mdi-magnify"
                single-line
                label="Search..."
              ></v-text-field>
            </div>
          </v-card>
          <v-img src="/screenshots/schedule.png"></v-img>
        </v-card>
        <v-card id="screenshot-report" class="rounded-lg" elevation="5">
          <v-card class="pa-2 rounded-0 d-flex align-center">
            <div class="d-flex mr-15 ml-2">
              <v-icon class="ml-1" color="success" size="18">mdi-circle</v-icon>
              <v-icon class="ml-1" color="warning" size="18">mdi-circle</v-icon>
              <v-icon class="ml-1" color="error" size="18">mdi-circle</v-icon>
            </div>
            <div class="w-25">
              <v-text-field
                density="compact"
                readonly
                hide-details
                variant="solo-filled"
                flat
                prepend-inner-icon="mdi-magnify"
                single-line
                label="Search..."
              ></v-text-field>
            </div>
          </v-card>
          <v-img src="/screenshots/statistics.png"></v-img>
        </v-card>
      </div>
    </v-container>
    <v-container
      fluid
      class="w-100 px-0"
      :class="current.dark ? 'bg-surface' : 'bg-grey-lighten-4'"
    >
      <marquee>
        <div class="d-flex align-center py-2">
          <v-icon size="55" class="mx-15" color="grey-darken-2"
            >mdi-vuejs</v-icon
          >
          <v-icon size="55" class="mx-15" color="grey-darken-2"
            >mdi-nuxt</v-icon
          >
          <v-icon size="55" class="mx-15" color="grey-darken-2"
            >mdi-vuetify</v-icon
          >
          <v-icon size="55" class="mx-15" color="grey-darken-2"
            >mdi-github</v-icon
          >
          <v-icon size="55" class="mx-15" color="grey-darken-2"
            >mdi-post</v-icon
          >
          <v-icon size="55" class="mx-15" color="grey-darken-2"
            >mdi-microsoft-visual-studio-code</v-icon
          >
        </div>
      </marquee>
    </v-container>
    <!-- Features start -->
    <v-container
      id="features"
      fluid
      style="padding-inline: 130px"
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
        <FeatureVideoContainer src="/video/home.mp4"></FeatureVideoContainer>

      </div>
    </v-container>
    <v-container
      id="features"
      fluid
      style="padding-inline: 130px"
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
        <FeatureVideoContainer src="/video/project.mp4"></FeatureVideoContainer>
      </div>
    </v-container>
    <v-container
      id="features"
      fluid
      style="padding-inline: 130px"
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
       <FeatureVideoContainer src="/video/schedule.mp4"></FeatureVideoContainer>
      </div>
    </v-container>
    <v-container
      fluid
      style="padding-inline: 130px"
      class="pt-5 pb-15"
    >
      <div class="d-flex flex-column">
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
          class="rounded-lg pb-5 w-50 pa-5 align-center justify-center"
          elevation="3"
          height="400"
        >
          <LIneChart></LIneChart>
        </v-card>
        <span></span>
        <div class="w-50 pl-8">
          <v-card height="400" elevation="3" class="pa-5 w-100 rounded-lg d-flex flex-column">
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
    <!-- Features end -->
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
          v-for="(t, n) in testimonial.slice(2)"
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
                :src="
                  `https://source.unsplash.com/random/200x200/?selfie,${t.gender}&example=` +
                  n
                "
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
    <v-container
      id="how-it-works"
      fluid
      style="padding-inline: 115px; padding-bottom: 60px"
      class="pt-15"
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
    <v-container
      id="faq"
      fluid
      style="padding-inline: 115px; padding-bottom: 60px"
      class="pt-15"
      :class="current.dark ? '' : 'white'"
    >
      <h3 class="text-center font-weight-bold mb-2 text-grey-darken-2">
        Frequently Ask Questions
      </h3>
      <h1
        class="text-center text-h4 font-weight-bold"
        style="font-family: 'Ubuntu', sans-serif"
      >
        Welcome to Our Help Center
      </h1>
      <p class="text-center text-h6 mt-2 font-weight-regular">
        Here, You'll Find the Answers You Need and More to Navigate Through Your
        Productivity Journey with Ease.
      </p>
      <div class="pa-5">
        <v-expansion-panels >
          <v-expansion-panel
          elevation="0"
            v-for="faq, n in faqs"
            :key="n"
          >
            <template #title>
              <span class="text-subtitle-1 font-weight-medium">{{ faq.question }}</span>
            </template>
            <template #text>
              <span class="text-subtitle-1 font-weight-regular">{{ faq.answer }}</span>
              
            </template>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-container>
    <v-container
      fluid
      style="padding-inline: 115px; padding-bottom: 60px;;overflow: hidden;"
      class="pt-15 h-screen d-flex bg-secondary"
    >
      <v-col cols="7" class="pt-15">
        <h1
          class="text-h3 font-weight-bold"
          style="font-family: 'Ubuntu', sans-serif"
        >
          Take Control of Your Productivity Journey!
        </h1>
        <h3 class="mt-5 font-weight-regular">Unlock your productivity potential with Efficiently. Sign up now to streamline task management, schedule effectively, and achieve your goals effortlessly. Experience the difference today!</h3>
        <v-btn rounded size="x-large" color="black" class="mt-15 text-capitalize" @click="$router.push({ name: 'auth-login' })">Try it now, it's free</v-btn>
      </v-col>
      <v-col cols="5">
        <v-card color="transparent" flat width="800">
          <v-img src="/undraw/team.svg"></v-img>
        </v-card>
      </v-col>
    </v-container>
  </v-main>
  <v-footer
    color="pa-5 py-10 border-t"
    :class="current.dark ? 'bg-surface' : 'bg-grey-lighten-3'"
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
useHead({
  title: "Efficiently | Gets started to our app",
});

onMounted(() => {
  document.getElementById("spline")?.addEventListener("load", () => {
    const logo = document.getElementById("logo");
    if (logo) logo.style.display = "none";
  });
});

const testimonial = [
  {
    name: "Emma Johnson",
    gender: "female",
    major: "Computer Science",
    testimonial:
      "🌟 Your productivity app has been a game-changer for me. The relaxing background, intuitive task management, comprehensive scheduling, insightful reports, and productivity tools have significantly enhanced my organization and focus. 😊👍",
    rating: 5,
  },
  {
    name: "David Smith",
    gender: "male",
    major: "Engineering",
    testimonial:
      "🌟 Impressed by the effectiveness of your app. Calming background, streamlined task management, seamless scheduling, detailed reports, and productivity tools have boosted my efficiency. 🚀💡",
    rating: 4.8,
  },
  {
    name: "Sophia Lee",
    gender: "female",
    major: "Business Administration",
    testimonial:
      "🌟 Your app has helped me stay organized and focused. Soothing background, easy task management, flexible scheduling options, insightful reports, and productivity tools. 💼✅",
    rating: 4.7,
  },
  {
    name: "Ethan Brown",
    gender: "male",
    major: "Psychology",
    testimonial:
      "🌟 Using your app has been a pleasant experience. Calming background, user-friendly task management, customizable scheduling features, informative reports, and productivity tools. 📊🔧",
    rating: 4.5,
  },
  {
    name: "Sophie Williams",
    gender: "female",
    major: "Environmental Science",
    testimonial:
      "🌟 Your app has been a lifesaver! Serene backgrounds, efficient task management, flexible scheduling, detailed reports, and array of productivity tools. 🌿🕒",
    rating: 4.9,
  },
  {
    name: "Michael Johnson",
    gender: "male",
    major: "Mechanical Engineering",
    testimonial:
      "🌟 Can't imagine my life without your app now. It's like having a personal assistant at my fingertips! Calming backgrounds, powerful task management, insightful reports. 💪🔍",
    rating: 4.8,
  },
];

const faqs = [
  {
    question: "What is Efficiently?",
    answer:
      "Efficiently is a productivity app designed to help users effectively manage their tasks, schedules, and priorities, allowing them to stay organized and focused on their goals.",
  },
  {
    question: "What features does Efficiently offer?",
    answer:
      "Efficiently offers a range of features, including task management, scheduling, goal setting, progress tracking, and relaxation tools. Users can create and prioritize tasks, schedule activities, track their progress towards goals, and incorporate relaxation techniques to enhance productivity and well-being.",
  },
  {
    question: "How can Efficiently help me improve my productivity?",
    answer:
      "Efficiently provides users with the tools and resources they need to optimize their time management, prioritize tasks effectively, and maintain focus on their goals. By utilizing features such as task lists, schedules, and goal tracking, users can streamline their workflow, reduce procrastination, and achieve greater productivity.",
  },
  {
    question: "Is Efficiently available on multiple platforms?",
    answer:
      "Yes, Efficiently is available on multiple platforms, including web, iOS, and Android devices. Users can access their tasks and schedules from any device, allowing for seamless integration into their daily routines.",
  },
  {
    question: "Is my data secure on Efficiently?",
    answer:
      "Yes, we take the security and privacy of our users' data seriously. Efficiently employs industry-standard encryption protocols to protect user data and ensures compliance with data protection regulations. Additionally, users have control over their data and can manage privacy settings within the app.",
  },
  {
    question:
      "Can I sync Efficiently with other calendars or productivity tools?",
    answer:
      "Yes, Efficiently offers integration with popular calendar apps and productivity tools, allowing users to sync their tasks and schedules across multiple platforms. This ensures that users have access to their productivity data wherever they go and can easily incorporate Efficiently into their existing workflows.",
  },
  {
    question: "How can I get started with Efficiently?",
    answer:
      "Getting started with Efficiently is easy! Simply download the app from the App Store or Google Play Store, or visit our website to sign up for an account. Once registered, you can start creating tasks, scheduling activities, and experiencing the benefits of improved productivity with Efficiently.",
  },
  {
    question: "Is there a free trial or demo available?",
    answer:
      "Yes, we offer a free trial or demo of Efficiently for new users. This allows you to experience the full range of features and functionality before committing to a subscription. Sign up today to start your free trial and discover how Efficiently can revolutionize your productivity!",
  },
];
</script>
<style scoped>
.testimonial-card {
  transition: 0.2s ease;
}

.testimonial-card:hover {
  transform: scale(1.2);
  z-index: 100;
}

#screenshots {
  display: flex;
}

#screenshots > * {
  width: 90%;
  height: 492px;
  position: absolute;
  top: 50px;
}

#screenshot-home {
  left: -120px;
  top: 150px;
}

#screenshot-project {
  left: 50%;
  z-index: 100;
  transform: translateX(-50%);
}

#screenshot-schedule {
  left: 120px;
  top: 220px;
  z-index: 50;
}

#screenshot-report {
  left: 220px;
  top: 100px;
  height: 422px;
}
</style>
