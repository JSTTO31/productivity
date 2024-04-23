<template>
    <div>
        <v-card color="secondary" flat class="mb-4 border" variant="flat">
            <v-card-text>
                <div class="d-flex align-center text-caption mb-2">
                    <div class="d-flex">
                        <v-avatar>
                            <v-img :src="note.from.picture"></v-img>
                        </v-avatar>
                        <div class="d-flex pl-2 flex-column align justify-center" style="line-height: 1;">
                            <h3>
                                {{ note.from.name }}
                            </h3>
                            <span class="text-caption mr-2" v-if="note.createdAt">{{ timeAgo }}</span>
                        </div>
                    </div>
                    <v-spacer></v-spacer>
                    <v-menu v-if="note.from._id == user?._id" location="bottom end">
                        <template #activator="{ props }">
                            <v-btn v-bind="props" icon="mdi-dots-horizontal" size="small" variant="text"></v-btn>
                        </template>
                        <v-list>
                            <v-list-item density="compact" @click="removeNote" prepend-icon="mdi-trash-can-outline" class="text-error text-caption">Delete</v-list-item>
                        </v-list>
                    </v-menu>
                </div>
                <p class="">
                    {{ note.text }}</p>
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import type { NoteType, TaskType } from '~/stores/project';
const {user} = storeToRefs(useUserStore())
const props = defineProps<{ note: NoteType, task: TaskType }>()
//@ts-ignore
let timeAgo = useTimeAgo(new Date(props.note.createdAt))
function removeNote(){
    props.task.notes = props.task.notes.filter(item => (item._id && item._id != props.note._id ) || (item.tempId && item.tempId != props.note.tempId))
    
}
</script>

<style scoped></style>