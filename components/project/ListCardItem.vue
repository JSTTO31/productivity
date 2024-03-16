<template>
    <v-card class=" mb-3 pa-3 rounded-lg" :key="task.task_name">
        <!-- <v-card class="rounded-lg my-3" flat>
                                <v-img :src="'https://source.unsplash.com/random/500x200/?collaboration&' + task.task_name"></v-img>
                            </v-card> -->
        <p class="font-weight-medium text-subtitle-2 font-weight-regular">{{ task.task_name }}</p>
        <p class="text-caption font-weight-regular">{{ task.description }}</p>
        <div class="d-flex mt-2" style="gap: 10px;">
            <v-chip size="small" prepend-icon="mdi-calendar" class="mb-1" color="success" density="comfortable">4 days
                left</v-chip>
            <v-chip size="small" prepend-icon="mdi-circle-medium" class="mb-1" color="info" density="comfortable"
                v-if="task.priority == 'Low'">{{ task.priority }}</v-chip>
            <v-chip size="small" prepend-icon="mdi-circle-medium" class="mb-1" color="warning" density="comfortable"
                v-else-if="task.priority == 'Medium'">{{ task.priority }}</v-chip>
            <v-chip size="small" prepend-icon="mdi-circle-medium" class="mb-1" color="error" density="comfortable"
                v-else>{{ task.priority }}</v-chip>
        </div>
        <div class="d-flex mt-1 align-end mt-2">
            <v-card v-for="message, n in chats.messages.slice(7)" :key="message.sender" class="rounded-circle mr-n5">
                <v-avatar class="border" size="30">
                    <v-img :src="'https://source.unsplash.com/random/100x100/?person&' + message.sender"></v-img>
                </v-avatar>
            </v-card>
            <v-spacer></v-spacer>
            <v-icon size="20" class="mr-3">mdi-eye-outline</v-icon>
            <v-icon size="20">mdi-message-outline</v-icon>
        </div>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps(['task'])
const chats = useChatboxObject
</script>

<style scoped></style>