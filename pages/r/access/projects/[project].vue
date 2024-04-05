<template>
    <div v-if="project">
    <ProjectAppBar></ProjectAppBar>
        <v-main class="pr-0 pb-0 bg h-screen">
            <span id="teleport-dialog"></span>
            <v-card color="transparent" class="h-100 rounded-0" flat>
                <ProjectSectionContainer :project="project"></ProjectSectionContainer>
                <v-dialog no-click-animation :fullscreen="fullscreen" :model-value="!!selectedTask && !!selectedSection"
                    persistent class="bg-transparent" @mousedown.stop :width="fullscreen ? '' : 950" contained style="z-index: 9000;">
                    <v-card class="bg-transparent" v-if="selectedTask && selectedSection"
                        :class="fullscreen ? 'rounded-0' : 'rounded'">
                        <ProjectShowTask :section="selectedSection" :task="selectedTask"
                            @fullscreen="fullscreen = !fullscreen" :fullscreen="fullscreen" :key="selectedTask?._id">
                        </ProjectShowTask>
                    </v-card>
                </v-dialog>
            </v-card>
        </v-main>
    </div>
    <v-main v-else class="h-screen">
        <v-card style="background: rgba(0, 0, 0, .2);" class="h-100 w-100 d-flex align-center justify-center">
            <div class="d-flex flex-column">
                <v-icon style="transform: rotate(25deg);" size="200" color="white">mdi-lightning-bolt</v-icon>
                <h4 class="text-center text-white my-15 mt-5">No project found</h4>
                <v-btn class="text-capitalize" @click="$project.store">Create new project</v-btn>
                <h4 class="text-center font-weight-regular text-white mt-5">No available templates</h4>
            </div>
        </v-card>
    </v-main>
</template>

<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { useProjectStore } from '~/stores/project';

useHead({
    title: 'Projects'
})
definePageMeta({
    layout: 'authenticated'
})
const { project, projects } = storeToRefs(useProjectStore())
const $project = useProjectStore()
const route = useRoute()
const router = useRouter()
const saving_loading = ref(false)
function updateLoading(value: boolean) {
    saving_loading.value = value
}
provide('saving', { loading: saving_loading, updateLoading })
const fullscreen = ref(false)
const selectedTask = ref<TaskType | null>(null);
const selectedSection = ref<SectionType | null>(null)
function setTask(route: RouteLocationNormalizedLoaded) {
    if (route.query.task && route.query.section && project.value) {
        const findSection = project.value.sections.find(item => (item._id && item._id == route.query.section) ||
            (item.tempId && item.tempId == route.query.section))
        if (findSection) {
            selectedSection.value = findSection
            const findTask = findSection.tasks.find(
                (item) =>
                    (item._id && item._id == route.query.task) ||
                    (item.tempId && item.tempId == route.query.task)
            );
            if (findTask) {
                selectedTask.value = findTask;
            }
        }
    } else {
        selectedTask.value = null
        selectedSection.value = null
    }
}

async function newProject(){
    const {data} = await $project.store()
    if(data.value){
        router.push({name:''})
    }
}

await $project.findById(route.params.project.toString()).then(() => {
    setTask(route)
})

onBeforeRouteUpdate((to, from, next) => {
    setTask(to)
    if (to.params.project != from.params.project) {
        const findProject = projects.value.find(item => item._id == to.params.project)
        if (findProject) {
            project.value = { ...findProject }
        } else {
            $project.findById(to.params.project.toString())
        }
    }

    return next()
})

</script>

<style scoped></style>