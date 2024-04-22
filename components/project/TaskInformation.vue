<template>
    <v-card class="pa-5 rounded-0 h-100" style="overflow-y: auto">
        <div style="gap: 5px" class="mb-5 w-100">
          <input variant="plain" class="w-100" v-model="task.title" style="
              font-size: 22px;
              font-family: 'Roboto', sans-serif;
              font-weight: 500;
            " placeholder="What is your task?" />
        </div>
        <div style="gap: 5px" class="d-flex">
          <v-col cols="2" class="px-0">
            <h4 class="font-weight-regular">Section</h4>
          </v-col>
          <v-col class="px-0">
            <div class="d-flex w-100 pr-15">
              <v-menu>
                <template #activator="{ props }">
                  <v-list-item variant="tonal" v-bind="props" class="text-capitalize rounded w-100"
                    append-icon="mdi-chevron-down" :prepend-icon="mainSectionIcon(section.title)">{{ section.title }}</v-list-item>
                </template>
                <v-list v-if="project">
                  <v-list-item @click="changeSection((section._id || section.tempId) || '-1')" v-for="section in project.sections.filter(item => (item._id && item._id != props.section._id) || (item.tempId && item.tempId != props.section.tempId))" :key="section._id" :prepend-icon="mainSectionIcon(section.title)">{{ section.title }}</v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-col>
        </div>
        <div style="gap: 5px" class="d-flex mt-4">
          <v-col cols="2" class="px-0">
            <h4 class="font-weight-regular">Assignee</h4>
          </v-col>
          <v-col class="px-0">
            <div class="d-flex pr-15 ">
              <v-menu :close-on-content-click="false">
                <template #activator="{ props }">
                  <v-list-item v-bind="props" variant="tonal" class="rounded w-100" append-icon="mdi-chevron-down"
                    density="compact" :prepend-avatar="findFirstAssignee.user.picture"
                    v-if="findFirstAssignee">{{ findFirstAssignee.user.name }}</v-list-item>
                  <v-list-item v-bind="props" variant="tonal" class="rounded w-100 pa-1 py-2"
                    append-icon="mdi-chevron-down" density="compact" prepend-icon="mdi-account"
                    v-else>Assignees</v-list-item>
                </template>
                <v-list v-if="project" class="mt-1 pa-0">
                  <v-list-item @click="
                  //@ts-ignore
                  toggleAssignee(member.user._id)
                  " :active="task.assignees.some((item) => item._id == member.user._id)
                  " color="primary"  :prepend-avatar="member.user.picture"
                    class="text-capitalize text-subtitle-2 pa-3 px-4 font-weight-regular" density="compact"
                    v-for="member in project.members" :key="member._id" append-icon="mdi-checkbox-marked">{{ member.user.name }}</v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-col>
        </div>
        <div style="gap: 5px" class="d-flex mt-5">
          <v-col cols="2" class="px-0">
            <h4 class="font-weight-regular">Due Date</h4>
          </v-col>
          <v-col class="px-0">
            <div class="d-flex w-100 pr-15">
              <date-picker class="w-100" v-model:date="task.dueDate"></date-picker>
            </div>
          </v-col>
        </div>
        <div style="gap: 5px" class="d-flex">
          <v-col cols="2" class="px-0">
            <h4 class="font-weight-regular">Priority</h4>
          </v-col>
          <v-col class="px-0">
            <div class="d-f-100 pr-10">
              <project-priority-chip v-model:priority="task.priority"></project-priority-chip>
            </div>
          </v-col>
        </div>
        <div style="gap: 5px" class="d-flex mt-2 flex-column">
          <v-col cols="4" class="px-0">
            <h4 class="font-weight-regular">Description</h4>
          </v-col>
          <v-col class="px-0 pr-5 mt-n6" cols="11" >
            <v-textarea v-model="task.description" rows="5" class="mt-2" single-line variant="solo-filled" flat
              density="comfortable" label="What are the details?"></v-textarea>
          </v-col>
        </div>
      </v-card>
</template>

<script setup lang="ts">
import type { SectionType, TaskType } from "~/stores/project";
const { user } = storeToRefs(useUserStore())
const props = defineProps<{ task: TaskType, section: SectionType }>();
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

<style scoped>

</style>