<template>
    <schedule-navigation-drawer :show-navigation="showRightNavigation"></schedule-navigation-drawer>
    <v-app-bar class="d-flex pl-5 align-center text-white border-b" density="comfortable"
        style="background-color: rgba(0,0,0,.2);z-index: 50 !important;" flat absolute>
        <h2 class="d-flex align-center mr-5">
            February <span class="mx-2 font-weight-black">10</span> - <span class="ml-2 font-weight-black">16</span>, 2024
        </h2>
        <v-btn size="x-small" variant="tonal" class="rounded-lg mr-2" icon="mdi-chevron-left"></v-btn>
        <v-btn size="x-small" variant="tonal" class="rounded-lg mr-2" icon="mdi-chevron-right"></v-btn>
        <v-btn size="x-small" variant="flat" class="rounded-lg mr-2" icon="mdi-plus" color="primary" @click="showAddScheduleDialog = true"></v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="viewMode = 'monthly'" :variant="viewMode == 'monthly' ? 'flat' : 'tonal'" class="text-capitalize mr-2" size="small">Monthly</v-btn>
        <v-btn @click="viewMode = 'weekly'" :variant="viewMode == 'weekly' ? 'flat' : 'tonal'" class="text-capitalize mr-2" size="small">Weekly</v-btn>
        <v-btn @click="viewMode = 'daily'" :variant="viewMode == 'daily' ? 'flat' : 'tonal'" class="text-capitalize mr-2" size="small">Daily</v-btn>
        <v-btn class="text-capitalize mr-2" prepend-icon="mdi-filter-outline" variant="tonal" size="small">
            Filter
        </v-btn>
        <v-divider vertical class="mx-2"></v-divider>
        <v-btn class="rounded-lg" icon="mdi-menu" size="small" @click="showRightNavigation = !showRightNavigation">
        </v-btn>
    </v-app-bar>
    <v-main>
        <schedule-dialog-create v-model:show-dialog="showAddScheduleDialog"></schedule-dialog-create>
        <schedule-calendar-table></schedule-calendar-table>
    </v-main>
</template>

<script setup lang="ts">
const showRightNavigation = ref(true)
const showAddScheduleDialog = ref(false)
const $schedule = useScheduleStore()
const viewMode = ref('weekly')

$schedule.getAll()
</script>

<style scoped>

</style>