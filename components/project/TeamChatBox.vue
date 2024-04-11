<template>
    <v-layout class="h-100 w-100 bg-surface" style="z-index: 300;" id="project-team-chat-box">
        <v-app-bar density="compact" class="pl-5 border-b" flat>
            <h4>
                <v-icon>mdi-chat</v-icon>
                Team Discussion
            </h4>
            <v-spacer></v-spacer>
            <v-btn icon="mdi-close" class="rounded-0" @click="emits('close')"></v-btn>
        </v-app-bar>
        <v-main>
            <v-card id="chat-box-main" class="rounded-0 h-100 py-5" style="overflow-y: auto;" flat
                v-if="project.messages.length > 0">
                <project-list-item-message v-for="message in project.messages" :message="message" :key="message._id" />
            </v-card>
            <div v-else>
                <div class="pa-15 mt-5">
                    <v-img src="/undraw/messaging.svg"></v-img>
                    <h3 class="mt-10 text-center">Welcome to team messaging! Connect, collaborate, and share ideas with
                        your team.</h3>
                </div>
            </div>
        </v-main>
        <v-footer app>
            <v-text-field @keyup.enter="send" v-model="message" hide-details rounded="lg" single-line
                density="comfortable" variant="solo-filled" class="" flat append-inner-icon="mdi-send"
                label="Write your message here..."></v-text-field>
        </v-footer>
    </v-layout>
</template>

<script setup lang="ts">
const {user} = storeToRefs(useUserStore())
const props = defineProps<{ project: ProjectType }>()
const emits = defineEmits(['close'])
const $project = useProjectStore()
const message = ref("")


async function scrollTobottom() {
    const chatboxmain = document.getElementById('chat-box-main')
    if (chatboxmain) {
        chatboxmain.scrollTo(0, chatboxmain.scrollHeight)
    }
}

async function send() {
    if(!user.value) return
    props.project.messages.push({
        from: user.value,
        text: message.value,
        unsent: false,
        removedBy: [],
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
    })
    message.value = ''
}


watch(() => props.project.messages.length, () => {
    scrollTobottom()
})

onMounted(() => {
    scrollTobottom()
})

</script>

<style scoped>
#chat-box-main::-webkit-scrollbar {
    width: 5px;
}

#chat-box-main::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.26);
    border-radius: 25px;
}
</style>