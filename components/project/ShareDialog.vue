<template>
    <v-dialog width="550" :model-value="showDialog" @click:outside="emits('update:showDialog', false)" >
        <v-card class="pa-5 pt-4 rounded-lg" :disabled="loadingSubmit">
            <h3 class="d-flex align-center">
                Share Access
                <v-spacer></v-spacer>
                <v-btn flat size="small" icon="mdi-close" @click="emits('update:showDialog', false)"></v-btn>
            </h3>
            <div class=" mt-1">
                <div class="text-center">
                    <v-menu offset-y :open-on-focus="true" v-model="showMenu">
                        <template #activator="{props}">
                                <v-text-field v-bind="props" @focus="showMenu = true" @keyup="($event: any) => onChange($event.target.value)"  density="comfortable" label="Enter person email address" class="mt-2" single-line variant="outlined" hide-details>
                                </v-text-field>
                        </template>
                            <v-list v-if="users.length < 1 || loading">
                                <v-list-item class="text-center" v-if="users.length < 1 && !loading">
                                    No Results
                                </v-list-item>
                                <v-list-item v-else-if="loading" class="d-flex align-center justify-center py-10">
                                    <v-progress-circular indeterminate color="primary" size="35" ></v-progress-circular>
                                </v-list-item>
                            </v-list>
                            <v-list v-else style="overflow-y: auto;" class="pa-2">
                                <v-list-item :active="members.some(item => item.user.email == user.email)" class="py-2 rounded-lg mb-1" :prepend-avatar="user.picture" v-for="user in users" :key="user.email" :title="user.email" :subtitle="user.name" @click="toggleMember({
                                    //@ts-ignore
                                    user: user, role: 'member'})"></v-list-item>
                                
                            </v-list>
                    </v-menu>
                </div>
                <v-list height="300" class="list-container">
                    <project-member-list-item  v-for="member in members" :members="members" v-model:members="members" :key="member.user._id.toString()" :member="member"></project-member-list-item>
                    <div  v-if="members.length < 1" class="text-center flex-column text-capitalize w-100 d-flex align-center h-100 pa-15 justify-center align-center">
                        <v-img src="/undraw/share.svg" class="w-100"></v-img>
                        <h3 class="mt-5">Share Project with Groupmate</h3>
                    </div>
                </v-list>
            </div>
            <div class="mt-5">
                <v-btn prepend-icon="mdi-share" variant="elevated" @click="share" :loading="loadingSubmit" class="text-capitalize" flat color="primary" :disabled="members.length < 1">Share access</v-btn>
                <v-btn class="text-capitalize ml-2" flat @click="emits('update:showDialog', false)">Cancel</v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{showDialog: boolean, project: ProjectType}>()
const emits = defineEmits(['update:showDialog'])
type UserType = {_id: number, email: string, name: string, picture: string}
const $user = useUserStore()
//@ts-ignore
const users = ref<UserType[]>([])
const members = ref<MemberType[]>([])
const loading = ref(false)
const loadingSubmit = ref(false)
const showMenu = ref(false)
const role = ref<"member" | 'admin'>("member")
const $project = useProjectStore()


function onChange(value: string){
    loading.value = true
    $project.findMembers(props.project._id, value).then(({data}) => {
        if(data.value){
            //@ts-ignore
            users.value = data.value?.users || []
        }
        
        loading.value = false
    })
}

function share(){
    loadingSubmit.value = true;
    //@ts-ignore
    $project.addMembers(props.project._id, members.value).then(() => {
        loadingSubmit.value = false
        members.value = []
        users.value = []
        emits('update:showDialog', false)
    })
}


async function toggleMember(member: MemberType){
    const index = members.value.findIndex(item => item.user._id == member.user._id)
    if(index > -1){
        members.value.splice(index, 1)    
    }else{
        members.value.push(member)
    }
}



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