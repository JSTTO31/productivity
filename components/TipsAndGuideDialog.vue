<template>
  <v-dialog :model-value="show" width="650" no-click-animation persistent>
    <v-card height="700">
      <v-layout class="h-100 w-100">
        <v-app-bar class=" pl-4 pt-1 d-flex align-center" density="compact" flat>
          Tips & guide
          <v-spacer></v-spacer>
          <v-btn icon="mdi-close" variant="text" size="small" @click="close"></v-btn>
        </v-app-bar>
        <v-main>
          <div class="d-flex align-center justify-center h-100 flex-column" v-if="selected == 0">
            <v-avatar class="rounded-0 mx-auto" size="200">
              <v-img src="/icons/confetti2.png"></v-img>
            </v-avatar>
            <h1 class="text-center mt-2 mt-5" style="font-family: 'Roboto', sans-serif;">Welcome <span
                class="text-capitalize text-primary" v-if="user">{{ user.name }}</span></h1>
            <p class="text-center">Explore helpful tips and guides to get started.</p>
          </div>
          <div class="d-flex align-center justify-center h-100 flex-column" v-else-if="selected == 1">
            <v-avatar class="rounded-0 mx-auto" size="200">
              <v-img src="/undraw/study.svg"></v-img>
            </v-avatar>
            <h2 class="text-center mt-2 mt-5 text-decoration-underline" style="font-family: 'Roboto', sans-serif;">
              Build Your Study Routine</h2>
            <p class="text-center px-15">Create a structured study routine directly on your homepage. Plan specific
              times for studying and breaks to help you stay focused and productive during your study sessions.</p>
          </div>
          <div class="d-flex align-center justify-center h-100 flex-column" v-else-if="selected == 2">
            <v-avatar class="rounded-0 mx-auto" size="200">
              <v-img src="/undraw/complete.svg"></v-img>
            </v-avatar>
            <h2 class="text-center mt-2 mt-5 text-decoration-underline" style="font-family: 'Roboto', sans-serif;">
              Manage Your Tasks Efficiently</h2>
            <p class="text-center px-15">Stay organized by utilizing the task management page. Create, prioritize, and
              track your tasks to ensure you're staying on top of your assignments and projects. Break down larger
              tasks into smaller, manageable steps for increased productivity.</p>
          </div>
          <div class="d-flex align-center justify-center h-100 flex-column" v-else-if="selected == 3">
            <v-avatar class="rounded-0 mx-auto" size="200">
              <v-img src="/undraw/collaboration.svg"></v-img>
            </v-avatar>
            <h2 class="text-center mt-2 mt-5 text-decoration-underline" style="font-family: 'Roboto', sans-serif;">
              Collaborate Effectively on Projects</h2>
            <p class="text-center px-15">Utilize the collaboration features on the project page to work seamlessly
              with classmates and colleagues. Share tasks, exchange ideas, and collaborate on projects to enhance
              productivity and achieve collective goals.</p>
          </div>
          <div class="d-flex align-center justify-center h-100 flex-column" v-else-if="selected == 4">
            <v-img width="250" height="250" src="/undraw/schedule.svg"></v-img>
            <h2 class="text-center mt-2 mt-5 text-decoration-underline" style="font-family: 'Roboto', sans-serif;">
              Plan Your Goals and Schedule</h2>
            <p class="text-center px-15">Use the schedule page to plan your goals and schedule your study sessions
              effectively. Set aside dedicated time slots for studying, attending classes, and other commitments to
              ensure you're making progress towards your academic objectives.</p>
          </div>
          <div class="d-flex align-center justify-center h-100 flex-column" v-else-if="selected == 5">
            <v-img width="250" height="250" src="/undraw/progress.svg"></v-img>
            <h2 class="text-center mt-2 mt-5 text-decoration-underline" style="font-family: 'Roboto', sans-serif;">
              Track Your Progress</h2>
            <p class="text-center px-15">Monitor your productivity and track your progress with the report feature.
              Keep tabs on task completion rates, schedule adherence, and your overall app usage to identify areas for
              improvement and celebrate your successes</p>
          </div>
          <div class="d-flex align-center justify-center h-100 flex-column" v-else>
            <v-card height="250" class="d-flex align-center" flat>
              <v-avatar class="rounded-0 mx-5" size="100">
                <v-img src="/tools/text-box.png"></v-img>
              </v-avatar>
              <v-avatar class="rounded-0 mx-5" size="100">
                <v-img src="/tools/to-do-list.png"></v-img>
              </v-avatar>
              <v-avatar class="rounded-0 mx-5" size="100">
                <v-img src="/tools/stopwatch.png"></v-img>
              </v-avatar>
            </v-card>
            <h2 class="text-center mt-2 mt-5 text-decoration-underline" style="font-family: 'Roboto', sans-serif;">Maximize Productivity with Available Tools</h2>
            <p class="text-center px-15">Make the most of the tools at your disposal, including the text editor, focus session, and to-do list card. Use the text editor to jot down notes, the focus session feature to minimize distractions during study sessions, and the to-do list card to organize your tasks efficiently.</p>
          </div>
      </v-main>
        <v-footer app>
          Tips {{ selected + 1 }} of 7
          <v-spacer></v-spacer>
          <v-btn class="text-capitalize ml-3" @click="selected--" :disabled="selected < 1">Previous</v-btn>
          <v-btn class="text-capitalize ml-3" color="primary" @click="selected++" v-if="selected < 6">Next</v-btn>
          <v-btn class="text-capitalize ml-3" color="primary" @click="close" v-else>Get Started</v-btn>
        </v-footer>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{show: boolean}>()
const emits = defineEmits(['update:show'])
const { user } = storeToRefs(useUserStore())
const selected = ref(0)


function close(){
  if(user.value){
    user.value.guide.tips = true
  }

  emits('update:show', false)
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity .25s linear, transform .3s ease;
}

.slide-enter-from{
  transform: translateX(100%);

}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>