<template>
    <v-dialog v-model="show" width="650" no-click-animation persistent>
      <v-card height="500">
        <v-layout class="h-100 w-100">
          <v-app-bar class=" pl-4 pt-1 d-flex align-center" density="compact" flat>
            Project guide
            <v-spacer></v-spacer>
            <v-btn icon="mdi-close" variant="text" size="small" @click="show = false"></v-btn>
          </v-app-bar>
          <v-main>
            <div class="w-100 pa-5" v-if="selected == 0">
              <v-card class="rounded-lg" height="300" width="500" flat>
                <v-img src="/gif/project-create.gif"></v-img>
              </v-card>
            </div>
        </v-main>
          <v-footer app>
            Tips {{ selected + 1 }} of 7
            <v-spacer></v-spacer>
            <v-btn class="text-capitalize ml-3" @click="selected--" :disabled="selected < 1">Previous</v-btn>
            <v-btn class="text-capitalize ml-3" color="primary" @click="selected++" :disabled="selected > 5">Next</v-btn>
          </v-footer>
        </v-layout>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup lang="ts">
  const { user } = storeToRefs(useUserStore())
  const selected = ref(0)
  const show = ref(true)
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