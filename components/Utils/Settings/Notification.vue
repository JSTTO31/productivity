<template>
    <div class="pa-2 pt-2 pb-15">
        <v-card class="pa-2 d-flex align-center mb-2" flat>
            <div>
                <h4 class="font-weight-medium">Do Not Disturb</h4>
                <p class="text-caption">Enable/disable notifications during specific times to minimize interruptions.</p>
            </div>
            <v-spacer></v-spacer>
            <span>
                <v-switch color="primary" v-model="preference.notifications.all.value" density="compact" hide-details></v-switch>
            </span>
        </v-card>
        <v-divider></v-divider>
        <v-card class="pa-2 d-flex align-center mb-2" flat>
            <div>
                <h4 class="font-weight-medium">Daily Spend Reminder</h4>
                <p class="text-caption">Receive notifications to track your daily spending.</p>
            </div>
            <v-spacer></v-spacer>
            <span>
                <v-switch color="primary" v-model="preference.notifications.dailySpend.value" density="compact" hide-details></v-switch>
            </span>
        </v-card>
        <v-divider></v-divider>
        <v-card class="pa-2 d-flex align-center mb-2" flat>
            <div>
                <h4 class="font-weight-medium">Timer Break Reminder</h4>
                <p class="text-caption">Receive notifications after each timer break to stay refreshed and productive.</p>
            </div>
            <v-spacer></v-spacer>
            <span>
                <v-switch color="primary" v-model="preference.notifications.timeBreak.value" density="compact" hide-details></v-switch>
            </span>
        </v-card>
        <v-divider></v-divider>
        <v-card class="pa-2 d-flex align-center mb-2" flat>
            <div>
                <h4 class="font-weight-medium">Project Task Notification</h4>
                <p class="text-caption">Receive notifications for tasks within your projects to stay focused and meet deadlines.</p>
            </div>
            <v-spacer></v-spacer>
            <span>
                <v-switch color="primary" v-model="preference.notifications.projectTaskNotification.value" density="compact" hide-details></v-switch>
            </span>
        </v-card>
        <v-divider></v-divider>
        <v-card class="pa-2 d-flex align-center mb-2" flat>
            <div>
                <h4 class="font-weight-medium">Schedule Updates</h4>
                <p class="text-caption">Receive notifications for schedule changes, reminders, and upcoming events.</p>
            </div>
            <v-spacer></v-spacer>
            <span>
                <v-switch color="primary" v-model="preference.notifications.scheduleUpdates.value" density="compact" hide-details></v-switch>
            </span>
        </v-card>
    </div>
</template>

<script setup lang="ts">
const {preference} = storeToRefs(usePreferenceStore())
</script>

<style scoped>

</style>