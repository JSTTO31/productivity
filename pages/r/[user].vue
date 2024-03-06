<template>
  <v-layout>
    <v-app-bar class="pa-0 border-b  pr-3 pl-2 bg-surface" flat>
      <v-btn class="text-capitalize px-1 mr-3" style="font-family: 'Lato';">
        <AppLogo class="mr-0" @click="$router.push({name: 'index'})"></AppLogo>
      </v-btn>
      <v-btn style="opacity: .8;" class="text-capitalize rounded-lg mr-2 font-weight-regular"
        append-icon="mdi-chevron-down"
        @click="$router.push({ name: 'r-access-room', params: { room: 'aD3Vwed6abuoPE2BzInnTKcTKYp' } })">Workspaces</v-btn>
      <v-btn style="opacity: .8;" class="text-capitalize rounded-lg mr-2 font-weight-regular"
        append-icon="mdi-chevron-down">Schedule</v-btn>
      <v-btn style="opacity: .8;" class="text-capitalize rounded-lg mr-2 font-weight-regular"
        append-icon="mdi-chevron-down">Task management</v-btn>
      <v-spacer></v-spacer>
      <div style="width: 20%" class="mr-5">
        <v-text-field single-line hide-details prepend-inner-icon="mdi-magnify" density="compact"
          label="search..." variant="solo-filled" flat class="rounded-lg"></v-text-field>
      </div>
      
      <v-btn prepend-icon="mdi-share" class="text-capitalize rounded-lg mx-2"  color="secondary"
        variant="elevated">Share</v-btn>
      <v-btn append-icon="mdi-bell" class="mx-1 text-capitalize rounded-lg" variant="outlined" >Notificationns</v-btn>
      <v-avatar size="35" class="border text-caption font-weight-bold ml-2" color="#F5E8C7">
        JS
      </v-avatar>
    </v-app-bar>
    <v-navigation-drawer class="pa-5 border-0 " width="300">
      <div class="d-flex flex-column w-100 h-100">
        <v-card variant="tonal" class="pa-5 rounded-lg mb-5 d-flex align-start">
          <div>
            <v-avatar size="45" class="border rounded-lg text-caption font-weight-bold ml-2" color="#F5E8C7">
              JS
            </v-avatar>
          </div>
          <div class="ml-5">
            <h4>Joshua Sotto</h4>
            <h6 class="font-weight-regular">
              <v-icon size="12">mdi-circle</v-icon>
              Free
            </h6>
          </div>
        </v-card>
        <v-list-item prepend-icon="mdi-crown"  class="rounded-lg mb-4 bg-amber font-weight-bold pa-3" active>Premium</v-list-item>
        <v-list density="compact" direction="vertical" hide-slider>
          <v-list-item prepend-icon="mdi-home-outline" color="secondary" class="mb-2 text-capitalize py-3" @click=""
            rounded="lg" active>Home</v-list-item>
          <v-list-item prepend-icon="mdi-domain" color="secondary" class="mb-2 text-capitalize py-3" @click=""
            rounded="lg">Workspaces</v-list-item>
          <v-list-item prepend-icon="mdi-calendar-outline" color="secondary" class="mb-2 text-capitalize py-3" @click=""
            rounded="lg">Schedules</v-list-item>
          <v-list-item prepend-icon="mdi-progress-check" color="secondary" class="mb-2 text-capitalize py-3" @click=""
            rounded="lg">Task managements</v-list-item>
        </v-list>
        <v-spacer></v-spacer>
        <v-list-item prepend-icon="mdi-cog" color="secondary" class="mb-2 text-capitalize py-3" @click=""
          rounded="lg">Settings</v-list-item>
      </div>
    </v-navigation-drawer>
    <v-main class="bg-surface">
      <v-container fluid>
        <h2 class="mb-5">Recents open</h2>
        <v-card width="350" class="pa-5 rounded-lg border" flat @click="$router.push({ name: 'r-access-room', params: { room: 'aD3Vwed6abuoPE2BzInnTKcTKYp' } })">
          <v-img src="/screenshot.png"></v-img>
          <h3 class="mt-2">My room</h3>
        </v-card>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import room from './access/[room].vue'
useHead({
  title: 'Home'
})
definePageMeta({
  layout: false,
  layoutTransition: false,
  middleware: ['auth']
})
</script>

<style scoped></style>