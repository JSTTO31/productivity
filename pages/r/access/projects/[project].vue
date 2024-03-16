<template>
    <project-navigation-drawer-team-chat v-model:show-nav="showChatbox"></project-navigation-drawer-team-chat>
    <v-app-bar class="d-flex align-center text-white border-b" density="compact" :model-value="!!project"
        style="background-color: rgba(0,0,0,.2);z-index: 50 !important;" flat>
        <v-app-bar-nav-icon @click.stop="showNavigation = !showNavigation" class="rounded-0"></v-app-bar-nav-icon>
        <v-app-bar-title class="font-weight-bold d-flex ml-2 align-center">
            <input class="text-white px-2 rounded" style="outline-color: white" @blur="changeTitle" v-model="title" />
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
        <div class="d-flex mr-6 ml-2">
           <v-menu open-on-hover>
                <template #activator="{props}">
                    <div style="cursor: pointer;" class="d-flex align-center" v-bind="props">
                        <v-card v-for="message, n in chats.messages.slice(7)" :key="message.sender" class="rounded-circle mr-n4">
                            <v-avatar class="border" size="30">
                                <v-img :src="'https://source.unsplash.com/random/100x100/?person&' + message.sender"></v-img>
                            </v-avatar>
                        </v-card>
                    </div>
                </template>
                <v-card width="300">
                    <v-list>
                        v-li
                        <v-list-item></v-list-item>
                    </v-list>
                </v-card>
           </v-menu>
            <v-card v-if="role != 'member'" @click="showShareDialog = true" class="rounded-circle mr-n5" color="primary" variant="elevated">
                <v-avatar class="border" size="30" style="border: 1px solid rgba(var(--v-theme-primary))">
                    <v-icon size="17">mdi-plus</v-icon>
                </v-avatar>
            </v-card>
        </div>
        <v-divider v-if="!showChatbox" vertical class="mx-2" inset></v-divider>
        <v-btn v-if="!showChatbox" :variant="showChatbox ? 'flat' : 'text'" icon="mdi-forum" class="rounded-lg"
            size="small" @click="showChatbox = !showChatbox"></v-btn>
    </v-app-bar> 
    <v-main class="pr-0" v-if="project">
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
                :model-value="$route.name == 'r-access-projects-task'" width="1000">
                <v-card class="h-screen rounded-lg">
                    <NuxtPage></NuxtPage>
                </v-card>
            </v-dialog>
        </v-card>
        <ProjectShareDialog v-model:show-dialog="showShareDialog" :project="project"></ProjectShareDialog>
    </v-main>
</template>

<script setup lang="ts">
import MemberListDialog from '~/components/project/MemberListDialog.vue';
import { useProjectStore } from '~/stores/project';

useHead({
    title: 'Projects'
})
definePageMeta({
    layout: 'authenticated'
})
const showShareDialog = ref(false)
const showNavigation = inject('showProjectsNavigation')
const showChatbox = ref(false)
const chats = useChatboxObject
const sections = useSectionsObject
const {user} = storeToRefs(useUserStore())
const { project, projects } = storeToRefs(useProjectStore())
const title = ref<null | string>(project.value?.title || null)
const route = useRoute()
const $project = useProjectStore()
const changeTitle = async () => {
    if(project.value && title.value && project.value.title != title.value){
        const {error}=await $project.update(project.value._id, title.value)
        if(error.value){
            title.value = project.value.title
        }
    }

    if(project.value && !title.value){
        title.value = project.value.title
    }
}
const role = computed(() => !project.value ? null : project.value.members.find(item => item.user._id == user.value?._id)?.role)


watch(() => project.value?.title, () => {
    if(project.value && project.value.title) title.value = project.value.title 
   
})

const findProject = projects.value.find(item => item._id == route.params.project)
if(findProject){
    project.value = findProject
    title.value = project.value.title
}else{
    const {data} = await $project.findById(route.params.project.toString())
    if(data.value){
        //@ts-ignore
        title.value = data.value.project.title
    }   
}

onBeforeRouteUpdate(async (to, from, next) => {

    const findProject = projects.value.find(item => item._id == route.params.project)

    if(findProject){
        project.value = findProject
        title.value = project.value.title
    }else {
        const {data} = await $project.findById(to.params.project.toString())
        if(data.value){
            //@ts-ignore
            title.value = data.value.project.title
        }   
    }


    return next()
})

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