<template>
    <v-dialog width="550" :model-value="showDialog" @click:outside="emits('update:showDialog', false)">
        <v-card class="pa-5 pt-4 rounded-lg">
            <h3 class="d-flex align-center">
                Manage Members
                <v-spacer></v-spacer>
                <v-btn flat size="small" icon="mdi-close" @click="emits('update:showDialog', false)"></v-btn>
            </h3>
            <div>
                <v-text-field v-model="filter.search" density="comfortable" label="Enter person email address" class="mt-2" single-line variant="outlined" hide-details>
                </v-text-field>
            </div>
            <v-list style="overflow: auto;height: 320px;" class="list-container">
                <project-member-list-item v-if="owner" :members="filteredMembers" disabled key="owner" :member="owner"></project-member-list-item>
                <project-member-list-item v-if="current && current?._id != owner?._id" :members="filteredMembers" disabled key="current" :member="current"></project-member-list-item>
                <div v-for="member in filteredMembers">
                    <project-member-list-item :members="filteredMembers" v-model:members="members" :key="member._id" :member="member"></project-member-list-item>
                </div>
            </v-list>
            <div class="pt-2 border-t">
                <v-btn @click="saveChanges" prepend-icon="mdi-account-cog" variant="elevated" class="text-capitalize" flat color="primary" :disabled="!isDirty" :loading="loading">Save changes</v-btn>
                <v-btn class="text-capitalize ml-2" flat @click="emits('update:showDialog', false)">Cancel</v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{project: ProjectType, showDialog: boolean}>()
const emits = defineEmits(['update:showDialog'])
const filter = reactive({
    search: '',
    role: 'all',
})
const {user} = storeToRefs(useUserStore())
const members = ref(props.project.members.filter(item => item.role != 'owner'))
const isDirty = computed(() => JSON.stringify(props.project.members.filter(item => item.role != 'owner')) != JSON.stringify(members.value))
const filteredMembers = computed(() => members.value.filter((member) => member.user.email.includes(filter.search) && (filter.role == 'all' ||member.role == filter.role) && member.user._id != user.value?._id)
)
const owner = computed(() => props.project.members.find(item => item.role == 'owner'))
const current = computed(() => props.project.members.find(item => item.user._id == user.value?._id))
const $project = useProjectStore()
const loading = ref(false) 

function saveChanges(){
    loading.value = true;
    //@ts-ignore
    $project.updateMembers(props.project._id, [...members.value, current.value]).then(() => {
        loading.value = false;
        emits('update:showDialog', false)
    })
}


watch(() => props.project.members.length, () => {
    members.value = props.project.members.filter(item => item.role != 'owner')
})
</script>

<style scoped>
.list-container{
    margin-top: 5px;
}
.list-container::-webkit-scrollbar{
    width: 5px;
}
.list-container::-webkit-scrollbar-thumb{
    background-color: #00000022;
    border-radius: 5px;
}
</style>