<template>
  <v-layout class="h-100 pa-0">
    <v-app-bar density="compact" class="d-flex px-0 rounded-0 align-center border-b" flat>
      <v-tabs v-model="selectedTab">
        <v-tab prepend-icon="mdi-information-outline" class="text-capitalize" color="primary">Information</v-tab>
        <v-tab prepend-icon="mdi-paperclip" class="text-capitalize" color="primary">Attachments</v-tab>
        <v-tab prepend-icon="mdi-chat-outline" class="text-capitalize" color="primary">Comments</v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <v-menu>
        <template #activator={props}>
          <v-btn flat v-bind="props" class="ml-2 rounded-lg" icon="mdi-dots-horizontal"></v-btn>
        </template>
        <v-list class="rounded-lg">
          <v-list-item class="pr-10" @click="ToggleCompleted" prepend-icon="mdi-check-circle-outline" v-if="!task.completed">Mark as completed</v-list-item>
          <v-list-item class="pr-10" @click="ToggleCompleted" prepend-icon="mdi-cancel" v-else>Mark as uncompleted</v-list-item>
          <v-list-item class="pr-10" @click="ToggleWatch" prepend-icon="mdi-eye-outline" v-if="!isWatcher">Watch</v-list-item>
          <v-list-item class="pr-10" @click="ToggleWatch" prepend-icon="mdi-eye-off-outline" v-else>Unwatch</v-list-item>
          <v-list-item class=" pr-10" @click="emits('fullscreen')" v-if="!fullscreen" prepend-icon="mdi-arrow-expand">Fullscreen</v-list-item>
          <v-list-item class=" pr-10" @click="emits('fullscreen')" v-else prepend-icon="mdi-arrow-collapse">Minimize</v-list-item>
          <v-list-item class="text-error pr-10" @click="removeTask" prepend-icon="mdi-trash-can-outline">Delete</v-list-item>
        </v-list>
      </v-menu>
      <v-btn class="ml-2 rounded-lg" icon="mdi-close" flat @click="
      $router.push({
        name: 'r-access-projects-project',
        params: { project: $route.params.project },
      })
      "></v-btn>
    </v-app-bar>
    <v-main style="overflow-y: hidden">
      <project-task-information :task="task" :section="section"></project-task-information>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import type { SectionType, TaskType } from "~/stores/project";
const { user } = storeToRefs(useUserStore())
const props = defineProps<{ task: TaskType, section: SectionType, fullscreen: boolean }>();
const emits = defineEmits(["fullscreen"]);
const isWatcher = computed(() => props.task.watchBy.some(item => item == user.value?._id))
const findFirstAssignee = computed(
  () =>
    project.value?.members.find(
      (item) => item.user._id == props.task.assignees[0]._id
    ) || null
);
const selectedTab = ref(0)
const $notification = useNotificationStore()
const router = useRouter()
const { project } = storeToRefs(useProjectStore());
const mainSectionIcon = computed(() => (value: string) => value.toLocaleLowerCase() == 'in progress' ? 'mdi-progress-wrench' : value.toLocaleLowerCase() == 'to do' ? 'mdi-progress-clock' : value.toLocaleLowerCase() == 'completed' ? 'mdi-progress-check' : 'mdi-file-outline')
function ToggleWatch() {
  if (isWatcher.value) {
    props.task.watchBy = props.task.watchBy.filter(item => item != user.value?._id)
  } else {
    //@ts-ignore
    props.task.watchBy.push(user.value._id)
  }
}

function removeTask(){
  if(project.value){
    const findSection =  project.value.sections.find(item => (!!item._id && item._id == props.section._id) || (!!item.tempId && item.tempId == props.section.tempId))
    
    if(findSection){
      findSection.tasks = findSection.tasks.filter(item => (!!item._id && item._id != props.task._id) || (!!item.tempId && item.tempId != props.task.tempId))
      const router = useRouter()
      const route = useRoute()


      router.push({
        name: 'r-access-projects-project',
        params: { project: route.params.project },
      })
    }

  }
}

function ToggleCompleted() {
  if (props.task.completed) {
    props.task.completed = false
  } else {
    props.task.completed = true
    const title = "Task Completed"
    const message = "Great job! You have successfully completed the task. 🎉😊"
    const type = "success"
    props.task.completed = true
    $notification.add(title, message, type)


  }
}

const toggleAssignee = (value: string) => {
  const index = props.task.assignees.findIndex((item) => item._id == value);
  if (index == -1) {
    const member = project.value?.members.find(item => item.user._id == value)
    if(!member) return
    props.task.assignees.push(member.user);
  } else {
    props.task.assignees.splice(index, 1);
  }
};


function changeSection(id: string){
  if(!project.value)return
  const findSection = project.value.sections.find(item => (item._id && item._id == id) || (item.tempId && item.tempId == id))
  const currentSection = project.value.sections.find(item => (item._id && item._id == props.section._id) || (item.tempId && item.tempId == props.section.tempId))
  if(findSection && currentSection){
    findSection?.tasks.push(props.task)
    currentSection.tasks = currentSection.tasks.filter(item => (item._id && item._id != props.task._id) || (item.tempId && item.tempId != props.task.tempId))
    router.push({query: {section: findSection?._id || findSection.tempId, task: props.task._id || props.task.tempId}})
  }

}


</script>

<style scoped></style>
