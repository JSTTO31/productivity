<template>
  <v-card class="h-100 w-100 rounded-0 border-s" variant="tonal">
    <v-layout class="h-100 w-100" flat>
      <v-app-bar density="compact" class="border-b" flat>
        <v-app-bar-title class="text"><v-icon class="mr-2" style="transform:rotate(25deg)">mdi-pin</v-icon>Task Notes</v-app-bar-title>
      </v-app-bar>
      <v-main class="bg-transparent h-100" style="overflow-y: auto">
        <div class="d-flex justify-center flex-column align-center pa-10" v-if="task.notes.length < 1">
          <v-avatar size="250" class="mx-auto">
            <v-img src="/undraw/quick-message.svg"></v-img>
          </v-avatar>
          <h4 class="text-center mt-n5">Capture your thoughts and ideas effortlessly with our friendly notes box!</h4>
        </div>
        <div v-else class="pa-5">
          <ProjectTaskNoteCard  v-for="note in task.notes" :key="note.text" :note="note" :task="task"></ProjectTaskNoteCard>
        </div>
      </v-main>
      <v-footer app>
        <v-text-field v-model="text" class="w-100" @keyup.enter="addNotes" single-line variant="solo-filled" hide-details append-inner-icon="mdi-send" flat density="compact" label="write your notes"></v-text-field>
      </v-footer>
    </v-layout>
  </v-card>
</template>

<script setup lang="ts">
import type { TaskType } from "~/stores/project";
const props = defineProps<{ task: TaskType }>();
const {user } = storeToRefs(useUserStore())
const text = ref("")
function addNotes(id: string){
  if(!user.value || !text.value) return
  props.task.notes.push({tempId: useTempID(8), from: user.value, text: text.value, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()})
  text.value = ''
}
</script>

<style scoped>

</style>
