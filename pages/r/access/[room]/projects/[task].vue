<template>
    <v-layout>
        <v-app-bar flat class="border-b" density="comfortable">
            <v-menu>
                <template #activator="{ props }">
                    <v-btn v-bind="props" prepend-icon="mdi-progress-check" class="text-capitalize font-weight-bold"
                        variant="elevated" append-icon="mdi-chevron-down" color="primary">In Progress</v-btn>
                </template>
                <v-card class="rounded-lg mt-2" width="250">
                    <v-list>
                        <v-list-item @click="" prepend-icon="mdi-progress-clock">To do</v-list-item>
                        <v-list-item @click="" prepend-icon="mdi-check-circle-outline">Completed</v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
            <v-btn prepend-icon="mdi-eye-outline" class="mx-3 text-capitalize">
                Watch</v-btn>
            <v-spacer></v-spacer>

            <v-btn class="ml-2 rounded-lg" icon="mdi-arrow-expand"
                @click="$router.push({ name: 'r-access-room-projects' })"></v-btn>
            <v-btn class="ml-2 rounded-lg" icon="mdi-dots-horizontal"
                @click="$router.push({ name: 'r-access-room-projects' })"></v-btn>
            <v-btn class="ml-2 rounded-lg" icon="mdi-close"
                @click="$router.push({ name: 'r-access-room-projects' })"></v-btn>
        </v-app-bar>
        <v-navigation-drawer location="right" class="pa-5" floating width="350">
            <v-card class="h-100 w-100 rounded-lg" variant="tonal">
                <v-layout class="h-100 w-100">
                    <v-main class="px-3 pt-2">
                        <v-list>
                            <h4 class="mb-3">
                                <v-icon size="25" class="mx-2">mdi-message</v-icon>
                                Comments
                            </h4>
                            <v-list-item class="px-0" v-for="message in task.comments" :key="message.user">
                                <div class="pa-2" v-if="message.user == 'John'">
                                    <div class="d-flex">
                                        <div class="d-flex w-100 flex-column align-end">
                                            <v-card class="mr-2 pa-2 text-caption w-100" color="primary">
                                                {{ message.comment }}
                                            </v-card>
                                            <span
                                                class="text-caption d-flex align-center font-weight-regular mr-2 mt-1 text-grey-darken-1">
                                                <v-icon color="success" size="15" class="mr-2">mdi-check</v-icon>{{ new
                    Date().toLocaleTimeString() }}
                                            </span>
                                        </div>
                                        <v-avatar class="border" size="30">
                                            <v-img
                                                :src="'https://source.unsplash.com/random/35x35/?person&' + message.user"></v-img>
                                        </v-avatar>
                                    </div>
                                </div>
                                <div class="pa-2" v-else>
                                    <div class="d-flex">
                                        <v-avatar class="border" size="30">
                                            <v-img
                                                :src="'https://source.unsplash.com/random/35x35/?person&' + message.user"></v-img>
                                        </v-avatar>
                                        <div class="d-flex flex-column">
                                            <v-card class="ml-2 pa-2 text-caption" color="secondary">
                                                {{ message.comment }}
                                            </v-card>
                                            <span
                                                class="text-caption font-weight-regualar ml-2 mt-1 text-grey-darken-1">{{
                    new
                        Date().toLocaleTimeString() }}</span>
                                        </div>
                                    </div>
                                </div>
                            </v-list-item>
                        </v-list>
                    </v-main>
                    <v-footer app color="transparent">
                        <v-text-field single-line variant="solo-filled" flat density="compact"
                            label="write your comment here..." append-inner-icon="mdi-send"></v-text-field>
                    </v-footer>
                </v-layout>
            </v-card>
        </v-navigation-drawer>
        <v-main style="overflow-y: auto;">
            <v-container class="px-5">
                <div style="gap: 5px;" class="mb-5 w-100">
                    <v-text-field variant="plain" class="w-100" style="font-size: 57px;font-family: 'Roboto', sans-serif;font-weight: 500;"
                        :value="task.task_name" placeholder="What is your task?" />
                </div>
                <div style="gap: 5px;">
                    <h4>Description</h4>
                    <v-textarea :model-value="task.description
                    " rows="3" class="mt-2" single-line variant="solo-filled" flat density="comfortable"
                        label="What is the details?"></v-textarea>
                </div>
                <div style="gap: 5px;" class="d-flex">
                    <v-col cols="2" class="px-0">
                        <h4>Assignee</h4>
                    </v-col>
                    <v-col class="px-0">
                        <div class="d-flex pl-10 pr-10">
                            <v-list-item variant="tonal" class="rounded-lg" append-icon="mdi-chevron-down"
                                density="compact" prepend-avatar="https://source.unsplash.com/random/50x50/?person"
                                title="Joshua Sotto"></v-list-item>
                        </div>
                    </v-col>
                </div>
                <div style="gap: 5px;" class="d-flex mt-5">
                    <v-col cols="2" class="px-0">
                        <h4>Due Date</h4>
                    </v-col>
                    <v-col class="px-0">
                        <div class="d-flex pl-10 pr-10">
                            <v-chip prepend-icon="mdi-calendar" color="success" class="px-5 rounded-lg">{{ new
                                Date().toLocaleDateString() }}</v-chip>
                        </div>
                    </v-col>
                </div>
                <div style="gap: 5px;" class="d-flex mt-5">
                    <v-col cols="2" class="px-0">
                        <h4>Priority</h4>
                    </v-col>
                    <v-col class="px-0">
                        <div class="d-flex pl-10 pr-10">
                            <v-chip v-if="task.priority == 'Low'" prepend-icon="mdi-circle-small" color="blue" class="px-5 rounded-lg"
                                append-icon="mdi-chevron-down">Low</v-chip>
                            <v-chip v-else-if="task.priority == 'Medium'" prepend-icon="mdi-circle-medium" color="warning" class="px-5 rounded-lg"
                            append-icon="mdi-chevron-down">Medium</v-chip>
                            <v-chip v-else prepend-icon="mdi-circle" color="error" class="px-5 rounded-lg"
                            append-icon="mdi-chevron-down">High</v-chip>
                        </div>
                    </v-col>
                </div>
                <div style="gap: 5px;" class="d-flex mt-5">
                    <a href="#" class="text-info" @click.prevent="$router.push({name: 'r-access-room-documentation'})">View the documentation</a>
                </div>
            </v-container>
        </v-main>
        <v-footer app>
        </v-footer>
    </v-layout>
</template>

<script setup lang="ts">
const sections = useSectionsObject
const task = sections[0].tasks[0]
const chats = useChatboxObject
</script>

<style scoped></style>