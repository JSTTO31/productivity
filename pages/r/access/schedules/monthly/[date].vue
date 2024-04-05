<template>
  <v-layout class="h-100">
    <v-app-bar density="comfortable" class="border-b" flat>
      <v-app-bar-title class="font-weight-medium">
        {{ new Date(route.params.date.toString()).toDateString() }}
      </v-app-bar-title>
      <v-btn
        icon="mdi-close"
        @click="$router.push({ name: 'r-access-schedules-monthly' })"
      ></v-btn>
    </v-app-bar>
    <v-main class="h-100">
      <v-card
        class="pa-4 h-100 d-flex flex-wrap"
        height="500"
        style="overflow-y: auto"
        id="date-list-container"
      >
        <v-col cols="6" v-for="schedule in getSchedules" :key="schedule._id">
          <schedule-date-list-item
            class="h-100"
            :schedule="schedule"
          ></schedule-date-list-item>
        </v-col>
        <v-col cols="6">
          <v-btn
                block
                prepend-icon="mdi-plus"
                class="text-capitalize"
                size="large"
                variant="tonal"
                @click="$router.push({query: {date: startAt.toISOString()}})"
                >Add Schedule</v-btn
              >
        </v-col>
      </v-card>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
const { schedules } = storeToRefs(useScheduleStore());
const getSchedules = computed(() =>{
  return schedules.value.filter(
    (schedule) =>
      new Date(schedule.startAt).toDateString() ==
      new Date(route.params.date.toString()).toDateString()
  )
}
);
const startAt = computed(() =>{
  return getSchedules.value.length > 0
    ? new Date(getSchedules.value[getSchedules.value.length - 1].startAt)
    : new Date(route.params.date.toString())
});
</script>

<style scoped>
#date-list-container::-webkit-scrollbar {
  width: 8px;
}

#date-list-container::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}
</style>
