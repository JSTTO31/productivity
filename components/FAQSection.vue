<template>
   <v-container
      id="faq"
      fluid
      style="padding-bottom: 60px"
      :style="{paddingInline: name == 'lg' ? '115px' : '250px'}"
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
</template>

<script setup lang="ts">
const {current} = useTheme()
const {name} = useDisplay()
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

</style>