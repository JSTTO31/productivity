<template>
    <div>
        <project-navigation-drawer :model-value="showNavigation"></project-navigation-drawer>
        <project-navigation-drawer-team-chat v-model:show-nav="showChatbox"></project-navigation-drawer-team-chat>
        <v-app-bar class="d-flex align-center text-white border-b" density="compact"
            style="background-color: rgba(0,0,0,.2);z-index: 50 !important;" flat>
            <v-app-bar-nav-icon @click.stop="showNavigation = !showNavigation" class="rounded-0"></v-app-bar-nav-icon>
            <v-app-bar-title class="font-weight-bold d-flex align-center">
                <span class="mx-2">History Research Paper</span>
                <v-icon size="25" class="mb-1">mdi-star-outline</v-icon>

            </v-app-bar-title>
            <v-btn active size="small" variant="flat" class="ml-2 text-capitalize">Tasks</v-btn>
            <v-btn size="small" variant="tonal" class="ml-2 text-capitalize">Timeline</v-btn>
            <v-divider vertical inset class="ml-2"></v-divider>
            <v-btn size="small" variant="tonal" class="ml-2 text-capitalize rounded" prepend-icon="mdi-sort"
                append-icon="mdi-chevron-down">Sort</v-btn>
            <v-btn size="small" variant="tonal" class="ml-2 text-capitalize rounded" prepend-icon="mdi-filter-outline"
                append-icon="mdi-chevron-down">filter</v-btn>
            <v-card class=" ml-2" variant="tonal">
                <v-btn size="small" class="rounded">
                    <v-icon style="transform: rotate(90deg);">mdi-poll</v-icon>
                </v-btn>
                <v-btn size="small" class="rounded" variant="tonal" flat>
                    <v-icon style="transform: rotate(180deg);">mdi-view-dashboard</v-icon>
                </v-btn>
            </v-card>
            <!-- <v-btn size="small" variant="elevated" class="ml-2 text-capitalize" prepend-icon="mdi-plus"
            color="secondary">Member</v-btn> -->
            <div class="d-flex mr-6 ml-2">
                <v-card v-for="message, n in chats.messages.slice(7)" :key="message.sender"
                    class="rounded-circle mr-n3">
                    <v-avatar class="border" size="30">
                        <v-img :src="'https://source.unsplash.com/random/100x100/?person&' + message.sender"></v-img>
                    </v-avatar>
                </v-card>
                <v-card @click="" class="rounded-circle mr-n5" color="primary" variant="elevated">
                    <v-avatar class="border" size="30" style="border: 1px solid rgba(var(--v-theme-primary))">
                        <v-icon size="17">mdi-plus</v-icon>
                    </v-avatar>
                </v-card>
            </div>
            <v-divider vertical class="mx-2" inset></v-divider>
            <v-btn :variant="showChatbox ? 'flat' : 'text'" icon="mdi-forum" class="rounded-lg" size="small"
                @click="showChatbox = !showChatbox"></v-btn>
        </v-app-bar>
        <v-main class="pr-0 h-screen" style="font-family: 'Roboto', sans-serif;overflow-y: auto;">
            <v-card color="transparent" class="h-100 rounded-0 pb-1" flat>
                <v-card id="tasks-container" class="w-100 px-4" style="overflow-x: auto;" color="transparent">
                    <v-container class="px-0 h-100 mr-15 d-flex" fluid>
                        <v-col cols="3" xl="2" class="h-100 pa-0 mr-3 rounded-lg" v-for="section in sections"
                            :key="section.section_name">
                            <v-card class=" px-5 py-3 rounded-lg"
                                style="background-color: rgba(0,0,0,.5);overflow-y: auto;">
                                <div class="text-white mb-2 d-flex align-center">
                                    <h4>{{ section.section_name }}</h4>
                                    <v-spacer></v-spacer>
                                    <v-btn variant="text" icon="mdi-dots-horizontal" size="small"></v-btn>
                                </div>
                                <project-list-card-item
                                    @click="$router.push({ name: 'r-access-room-projects-task', params: { task: task.task_id } })"
                                    v-for="task in section.tasks" :key="task.task_name"
                                    :task="task"></project-list-card-item>
                                <v-btn class="text-capitalize text-white rounded-lg" color="background" variant="tonal"
                                    prepend-icon="mdi-plus" block>
                                    New Task
                                </v-btn>
                            </v-card>
                        </v-col>
                        <v-col cols="3" xl="2" class="h-100 pa-0 mr-3">
                            <v-card
                                class=" px-5 py-3 rounded-lg d-flex text-white rounded-lg align-center justify-center text-subtitle-2 font-weight-bold text-white"
                                style="background-color: rgba(0,0,0,.5);">
                                <span>
                                    <v-icon class="mr-2">mdi-plus</v-icon>
                                    New List
                                </span>
                            </v-card>
                        </v-col>
                    </v-container>
                </v-card>
                <v-dialog @dblclick:outside="$router.push('/')" contained persistent no-click-animation
                    :model-value="$route.name == 'r-access-room-projects-task'" width="1000">
                    <v-card class="h-screen rounded-lg">
                        <NuxtPage></NuxtPage>
                    </v-card>
                </v-dialog>
            </v-card>
        </v-main>
    </div>
</template>

<script setup lang="ts">
import useChatboxObject from '~/composables/useChatboxObject';
import useSectionsObject from '~/composables/useSectionsObject';
const showNavigation = ref(true)
const showTask = ref(true)
const showChatbox = ref(false)
const chats = useChatboxObject
const sections = useSectionsObject

</script>

<style scoped>
#tasks-container::-webkit-scrollbar {
    height: 10px;
    width: 10px;

}

#tasks-container::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.432);
    border-radius: 25px;
}
</style>