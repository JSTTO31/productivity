<template>
    <v-list-item class="mb-2" prepend-icon="mdi-monitor">
        <v-list-item-title>{{ session.os.name }} {{ session.os.version }} - {{ session.browser.name }}</v-list-item-title>
        <v-list-item-subtitle v-if="session.current" class="text-success">Current Device</v-list-item-subtitle>
        <v-list-item-subtitle v-else>{{ timeAgo }}</v-list-item-subtitle>
    </v-list-item>
</template>

<script setup lang="ts">
import type { SessionTYpe } from '~/stores/user';

const props = defineProps<{session: SessionTYpe}>()
const timeAgo = useTimeAgo(props.session.updatedAt)
</script>

<style scoped>

</style>