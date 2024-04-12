<template>
  <v-layout class="h-100 w-100">
    <v-navigation-drawer width="500" class="">
      <v-layout class="w-100 h-100">
        <v-app-bar flat class="pa-5 px-10">
          <span class="text-h6 font-weight-regular">
            First Project Setup (3 of 4)
          </span>
        </v-app-bar>
        <v-main class="pt-15 px-10">
          <transition name="slide" mode="out-in">
            <div v-if="!project">
              <h1 class="text-h4" style="margin-top: 80px">
                Let's Begin: Your First Project!
              </h1>
              <div>
                <h3 class="mt-10 font-weight-medium mb-2">
                  The name of you project
                </h3>
                <v-text-field @focus="onFocusTitle" v-model="title" @blur="onBlurTitle" variant="outlined" single-line
                  label="Project name" :disabled="loading" @keyup.enter="confirmTitle"></v-text-field>
                <v-btn size="large" variant="elevated" color="primary" flat class="text-capitalize"
                  @click="confirmTitle" :loading="loading">Confirm</v-btn>
              </div>
            </div>
            <div v-else>
              <h1 class="text-h4" style="margin-top: 80px">Add your tasks</h1>
              <div>
                <h3 class="mt-10 font-weight-medium mb-2 d-flex justify-space-between align-end">Your to do lists <span
                    class="text-caption">(Add up to 3 tasks for now)</span></h3>
                <v-text-field @focus="onFocusTask(n)" @blur="onBlurTask(n)" v-for="task, n in project.sections[0].tasks"
                  :key="task._id" v-model="task.title" variant="outlined" single-line hide-details class="mb-3"
                  label="Task name" append-inner-icon="mdi-trash-can-outline"
                  @click:append-inner="remove(n)"></v-text-field>
                <v-text-field ref="taskTextField" @focus="isFocusTaskTitle = true" v-model="task_title"
                  @blur="isFocusTaskTitle = false" @keyup.enter="add" variant="outlined" single-line hide-details
                  class="mb-3" label="Task name" v-if="project && project.sections[0].tasks.length < 3"></v-text-field>
                <div class="mt-5">
                  <v-tooltip location="bottom">
                    <template #activator="{ props }">
                      <v-btn v-bind="props" class="text-capitalize mr-4" variant="flat" size="large" color="warning"
                        prepend-icon="mdi-alert">Skip all</v-btn>
                    </template>
                    We've disabled the skip button to encourage exploring. Thanks for your understanding!
                  </v-tooltip>
                  <v-btn size="large" variant="elevated" color="primary" flat class="text-capitalize"
                    @click="$router.push({ name: 'setting-up-schedule' })" append-icon="mdi-arrow-right">Continue</v-btn>
                </div>
              </div>
            </div>
          </transition>
        </v-main>
        <v-footer app class="px-8" v-if="!project">
          <v-tooltip location="bottom">
            <template #activator="{ props }">
              <v-btn v-bind="props" class="text-capitalize mr-4" variant="flat" size="large" color="warning"
                prepend-icon="mdi-alert">Skip all</v-btn>
            </template>
            We've disabled the skip button to encourage exploring. Thanks for your understanding!
          </v-tooltip>
          <v-btn size="large" variant="elevated" color="primary" flat class="text-capitalize"
            @click="$router.push({ name: 'setting-up-schedule' })" append-icon="mdi-arrow-right">Continue</v-btn>
        </v-footer>
      </v-layout>
    </v-navigation-drawer>
    <v-main>
      <v-card id="project-container" :class="name == 'xl' ? 'project-container-xl' : ''">
        <v-layout class="h-100 w-100">
          <v-app-bar flat class="border-b" density="compact">
            <div class="d-flex mr-8 ml-2">
              <v-icon class="ml-1" color="success" size="20">mdi-circle</v-icon>
              <v-icon class="ml-1" color="warning" size="20">mdi-circle</v-icon>
              <v-icon class="ml-1" color="error" size="20">mdi-circle</v-icon>
            </div>
            <v-card class="h-100 mt-4 pa-2 border" flat>
              <v-avatar size="25" v-if="!loading">
                <v-img src="/favicon.png"></v-img>
              </v-avatar>
              <v-progress-circular indeterminate size="25" width="2" v-else></v-progress-circular>
              Task management | Efficiently
              <v-icon size="small">mdi-close</v-icon>
            </v-card>
          </v-app-bar>
          <v-app-bar flat class="border-b" density="compact">
            <v-icon class="ml-5" size="large">mdi-arrow-left</v-icon>
            <v-icon class="ml-5" size="large">mdi-arrow-right</v-icon>
            <v-icon class="ml-5" size="large">mdi-reload</v-icon>
            <v-text-field variant="outlined" density="compact" class="ml-5" readonly
              model-value="https://efficiently.com/project-management/" hide-details></v-text-field>
          </v-app-bar>
          <v-app-bar class="d-flex align-center text-white" density="comfortable" style="
              background-color: rgba(0, 0, 0, 0.5);
              z-index: 50 !important;
              position: absolute;
            " flat>
            <v-app-bar-nav-icon class="rounded-0"></v-app-bar-nav-icon>
            <v-app-bar-title class="font-weight-bold d-flex ml-2 align-center">
              {{
              project ? project.title : title || "Name of the project"
            }}
            </v-app-bar-title>
          </v-app-bar>
          <utils-theme-background :key="preference.theme.background.toString()"></utils-theme-background>
          <v-main class="w-100 h-100">
            <v-container class="h-100 d-flex w-100 pa-0" fluid>
              <v-col cols="4" class="h-100 pa-0">
                <v-layout class="h-100 w-100" style="
                    overflow: hidden;
                    z-index: 100 !important;
                    background-color: rgba(0, 0, 0, 0.2);
                    box-shadow: 0 0 1px #000;
                  ">
                  <v-app-bar color="transparent" density="compact" class="text-white pl-4 pa-0" flat>
                    <h3>
                      To do
                      <v-chip size="small">{{ 5 }}</v-chip>
                    </h3>
                    <v-spacer></v-spacer>
                    <v-btn variant="text" icon="mdi-plus" size="small" @mousedown.stop></v-btn>
                    <v-btn @mousedown.stop variant="text" icon="mdi-dots-horizontal" size="small"></v-btn>
                  </v-app-bar>
                  <v-main class="h-100">
                    <div class="h-100 px-3 task-container pb-10" color="transparent" flat style="overflow-y: auto">
                      <div v-if="project">
                        <setting-up-list-card-task-item :key="task._id" :task="task"
                          v-for="task in project.sections[0].tasks"></setting-up-list-card-task-item>
                      </div>
                      <v-card v-if="isFocusTaskTitle" variant="tonal" color="white" height="150"></v-card>
                    </div>
                  </v-main>
                </v-layout>
              </v-col>
              <v-col cols="4" class="h-100 pa-0">
                <v-layout class="h-100 w-100" style="
                    overflow: hidden;
                    z-index: 100 !important;
                    background-color: rgba(0, 0, 0, 0.2);
                    box-shadow: 0 0 1px #000;
                  ">
                  <v-app-bar color="transparent" density="compact" class="text-white pl-4 pa-0" flat>
                    <h3>
                      In Progress
                      <v-chip size="small">{{ 5 }}</v-chip>
                    </h3>
                    <v-spacer></v-spacer>
                    <v-btn variant="text" icon="mdi-plus" size="small" @mousedown.stop></v-btn>
                    <v-btn @mousedown.stop variant="text" icon="mdi-dots-horizontal" size="small"></v-btn>
                  </v-app-bar>
                  <v-main class="h-100">
                    <div class="h-100 px-3 task-container pb-10" color="transparent" flat style="overflow-y: auto">
                      <!-- <project-list-card-item></project-list-card-item> -->
                    </div>
                  </v-main>
                </v-layout>
              </v-col>
              <v-col cols="4" class="h-100 pa-0">
                <v-layout class="h-100 w-100" style="
                    overflow: hidden;
                    z-index: 100 !important;
                    background-color: rgba(0, 0, 0, 0.2);
                  ">
                  <v-app-bar color="transparent" density="compact" class="text-white pl-4 pa-0" flat>
                    <h3>
                      Completed
                      <v-chip size="small">{{ 5 }}</v-chip>
                    </h3>
                    <v-spacer></v-spacer>
                    <v-btn variant="text" icon="mdi-plus" size="small" @mousedown.stop></v-btn>
                    <v-btn @mousedown.stop variant="text" icon="mdi-dots-horizontal" size="small"></v-btn>
                  </v-app-bar>
                  <v-main class="h-100">
                    <div class="h-100 px-3 task-container pb-10" color="transparent" flat style="overflow-y: auto">
                      <!-- <project-list-card-item></project-list-card-item> -->
                    </div>
                  </v-main>
                </v-layout>
              </v-col>
            </v-container>
          </v-main>
        </v-layout>
      </v-card>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
useHead({
  title: "Set your background",
});
definePageMeta({
  layout: false,
  pageTransition: {
    name: "slide",
    mode: "out-in",
  },
});
const {preference} = storeToRefs(usePreferenceStore())
const {name} = useDisplay()
const { project: removeProjectReactivity } = useRemoveReactivity
const { user } = storeToRefs(useUserStore())
const title = ref('')
const taskTextField = ref()
const task_title = ref('')
const $project = useProjectStore()
const { projects, project } = storeToRefs(useProjectStore())
const loading = ref(false)
async function confirmTitle() {
  loading.value = true
  await $project.store(title.value).then(() => {
    project.value = removeProjectReactivity(projects.value[projects.value.length - 1])

  })
  loading.value = false
}

const isFocusTaskTitle = ref(false)

function onFocusTask(index: number) {
  const container = document.getElementById('project-container')
  if (container) {
    if (project.value) {
      const translateY = 50 - (150 * index);  
      container.style.transform = `scale(1.5) translate(150px,${translateY}px)`
    }
  }
}
function onBlurTask(index: number) {
  const container = document.getElementById('project-container')
  if (container) {
    container.style.transform = 'scale(1)'
  }
}


watch(isFocusTaskTitle, (current) => {
  const container = document.getElementById('project-container')
  if (container) {
    if (current && project.value) {
      const translateY = 50 - (150 * project.value.sections[0].tasks.length);
      container.style.transform = `scale(1.5) translate(150px,${translateY}px)`
    } else {
      container.style.transform = 'scale(1)'
    }
  }
})

let timeout: null | NodeJS.Timeout = null

watch(project, (current, old) => {
  if (!old) return;
  if (timeout) clearTimeout(timeout)
  loading.value = true
  timeout = setTimeout(() => {
    loading.value = false
    $project.update()
  }, 1000);
}, { deep: true })

$project.getAll().then(() => {
  if (projects.value.length > 0) {
    project.value = removeProjectReactivity(projects.value[projects.value.length - 1])
  }
})

function onFocusTitle() {
  const container = document.getElementById('project-container')
  if (container) {
    container.classList.add(name.value == 'lg' ? 'project-container-focus' : 'project-container-focus-xl')
  }
}

function onBlurTitle() {
  const container = document.getElementById('project-container')
  if (container) {
    container.classList.remove(name.value == 'lg' ? 'project-container-focus' : 'project-container-focus-xl')
  }
}

const add = () => {
  if (!project.value || !task_title.value) return
  //@ts-ignore
  if (project.value && user.value) {
    project.value.sections[0].tasks.push({
      title: task_title.value, dueDate: new Date().toISOString().substring(0, 10),
      //@ts-ignore
      priority: 'low', assignees: [user.value], tempId: useTempID(8), watchBy: [user.value._id], notes: [], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()
    })

    task_title.value = ''

    const container = document.getElementById('project-container')
    if (container) {
      const translateY = 150 - (150 * project.value.sections[0].tasks.length);
      container.style.transform = `scale(1.5) translate(150px,${translateY}px)`
      container.style.height = container.clientHeight + 150 + 'px'
    }
  }
}

function remove(index: number) {
  if (project.value) {
    project.value.sections[0].tasks.splice(index, 1)

    const container = document.getElementById('project-container')
    if (container) {
      const translateY = 150 - (150 * project.value.sections[0].tasks.length);
      container.style.transform = `scale(1.5) translate(150px,${translateY}px)`
      container.style.height = container.clientHeight + 150 + 'px'
      taskTextField.value.focus()
    }
  }
}

onMounted(() => {
  const container = document.getElementById('project-container')
  if(container){
  }
})
</script>

<style scoped>
body::-webkit-scrollbar {
  width: 0;
}

#project-container {
  position: fixed;
  top: 15%;
  left: 40%;
  width: 1224px;
  height: 768px;
  transition: 0.6s ease;
  animation: slide-center 1s ease-in-out;
}

.project-container-xl{
  transform: scale(1.2) !important;
}

.project-container-focus-xl{
  transform: scale(1.5) translate(100px,100px) !important;
}


.project-container-focus{
  transform: scale(1.5) translate(150px,100px) !important;
}



@keyframes slide-center {
  from {
    transform: translate(100%, 100%);
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.25s linear, transform 0.55s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}

.action {
  position: fixed;
  bottom: 10px;
  right: 10px;
}

#step-indicator {
  position: fixed;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
