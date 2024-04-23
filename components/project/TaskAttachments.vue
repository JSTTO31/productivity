<template>
    <v-card class="rounded-0 h-100" @dragover="allowDrop">
        <v-card id="upload-container" :disabled="loading" class="h-100 w-100 d-flex align-center flex-column justify-center" v-if="task.attachments.length < 1 || !!selected">
            <div class="d-flex align-center flex-column mt-2 justify-center" v-if="!selected">
                <v-avatar size="150" class="rounded-0">
                    <v-img src="/icons/email.png"></v-img>
                </v-avatar>
                <h2 class="mt-5">No Attachments</h2>
                <p class="px-15 text-center">Feel free to drag and drop your files here for easy attachment upload.</p>
            </div>
            <div v-else class="d-flex px-15 flex-column justify-center align-center">
                <div style="position: relative;">
                    <FileIcon :type="selected.type" class="mb-5 rounded-lg" height="150" width="150" size="100"></FileIcon>
                    <v-btn style="position: absolute;top: -25px;right: -25px" variant="tonal" icon="mdi-close" @click="selected = null"></v-btn>
                </div>
                <p class="text-center">{{ selected.name }}</p>
            </div>
            <v-btn v-if="selected" variant="flat" color="primary" class=" text-capitalize mt-5 px-5"  @click="upload">Upload Attachment</v-btn>
            <v-btn variant="outlined" color="primary" class=" text-capitalize mt-5"  @click="browse">Browse Attachment</v-btn>
            <div class="pa-15 w-100" style="position: absolute;bottom: 25px;" v-if="loading">
                <v-progress-linear color="primary" indeterminate></v-progress-linear>
            </div>
        </v-card>
        <v-list class="w-100 pa-2" v-if="task.attachments.length > 0">
            <FileListItem v-for="attachment in task.attachments" :key="attachment._id" :attachment="attachment" @remove="remove"></FileListItem>
            <v-list-item @click="browse" prepend-icon="mdi-paperclip" class="pa-4 rounded mb-2">
                Add Attachment
            </v-list-item>
            {{ selected }}
        </v-list>
        <input @change="change" type="file" ref="file" hidden>
    </v-card>
</template>

<script setup lang="ts">
import FileListItem from './FileListItem.vue';

const props = defineProps<{task: TaskType, section: SectionType}>()
const file = ref()
const selected : Ref<File | null> = ref(null)
const $project = useProjectStore()
const {project, projects} = storeToRefs(useProjectStore())
const loading = ref(false)
function allowDrop(e: Event){
    e.preventDefault()
}

function browse(){
    file.value.click()
}

function change(e: any){
    const file = e.target.files[0]
    if(file){
        selected.value = file
    }
}

function upload(){
    if(!project.value && !selected.value) return
    loading.value = true
    const route = useRoute()
    //@ts-ignore
    $project.addAttachment(project.value._id, route.query.section?.toString() || '', route.query.task?.toString() || '', selected.value).then((response) => {
        loading.value = false
        selected.value = null
        const section = project.value?.sections.find(item => item._id == props.section._id)
        if(section){
            const task = section.tasks.find(item => item._id == props.task._id)
            if(task){
                props.task.attachments = task.attachments
            }
        }
    })
}

function remove(attachment_id: string){
   props.task.attachments = props.task.attachments.filter(item => item._id != attachment_id)
}

</script>

<style scoped>
#upload-container{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5000;
}
</style>