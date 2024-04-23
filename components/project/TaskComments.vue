<template>
    <v-card class="h-100 w-100">
        <project-task-message-box :task="task">
        </project-task-message-box>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps(['task'])
</script>

<style scoped>

</style>