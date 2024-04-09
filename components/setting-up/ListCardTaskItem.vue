<template>
    <v-card class="mb-3 rounded bg-surface task" style="z-index: 100 !important;"
        :id="task._id || task.tempId">
        <v-card class="d-flex handle align-center justify-center rounded-lg" flat>
            <v-icon>mdi-dots-horizontal</v-icon>
        </v-card>
        <v-divider></v-divider>
        <div class="pa-3 pt-0">
            <div class="d-flex align-center">
                <p class="font-weight-medium text-subtitle-1">{{ title }}</p>
                <v-spacer></v-spacer>
                <v-btn size="" variant="text" @mousedown.stop color="success" v-if="task.completed"
                    icon="mdi-check-decagram"></v-btn>
                <v-btn size="" variant="text" @mousedown.stop v-else
                    icon="mdi-check-decagram-outline"></v-btn>
            </div>
            <!-- <p class="text-caption font-weight-regular mt-1">{{ description }}</p> -->
            <div class="d-flex mt-2" style="gap: 10px;">
                <v-chip size="small" prepend-icon="mdi-calendar" class="mb-1 text-capitalize rounded" color="success">{{
        timeAgo }}</v-chip>
                <v-chip size="small" prepend-icon="mdi-flag-outline" class="mb-1 text-capitalize rounded" color="info"
                    v-if="task.priority == 'low'">{{ task.priority }}</v-chip>
                <v-chip size="small" prepend-icon="mdi-flag-outline" class="mb-1 text-capitalize rounded"
                    color="warning" v-else-if="task.priority == 'medium'">{{ task.priority }}</v-chip>
                <v-chip size="small" prepend-icon="mdi-flag-outline" class="mb-1 text-capitalize rounded" color="error"
                    v-else>{{ task.priority }}</v-chip>
            </div>
            <v-divider class="my-1"></v-divider>
            <div class="d-flex align-center" v-if="task.assignees.length > 0">
                <v-card v-for="assignee in task.assignees" :key="assignee.email" class="rounded-circle mr-n5 border" flat>
                    <v-avatar class="border" size="30">
                        <v-img :src="assignee.picture"></v-img>
                    </v-avatar>
                </v-card>
                <v-spacer></v-spacer>

                <v-chip :prepend-icon="isWatcher ? 'mdi-eye-outline' : 'mdi-eye-off-outline'" variant="text"
                    size="small" class="mr-2 text-capitalize rounded">Watch</v-chip>
                <v-badge :content="task.notes ? task.notes.length : 0" location="right" inline>
                    <v-chip prepend-icon="mdi-note-text-outline" variant="text" size="small"
                        class="text-capitalize rounded">Notes</v-chip>
                </v-badge>
            </div>
        </div>
    </v-card>
</template>

<script setup lang="ts">
const {user} = storeToRefs(useUserStore())
const props = defineProps<{task: TaskType}>()
const title = computed(() => props.task.title.length > 25 ? props.task.title.substring(0, 25) + '...' : props.task.title)
// const description = computed(() => props.task.description.length > 70 ? props.task.description.substring(0, 70) + '...' : props.task.description)
const timeAgo = useTimeAgo(new Date())
const isWatcher = computed(() => props.task.watchBy.some(item => item == user.value?._id))

</script>

<style scoped>

</style>