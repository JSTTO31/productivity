<template>
    <v-navigation-drawer width="350" location="right" v-model="showNavigation" style="overflow: hidden;z-index: 100;">
        <v-layout class="h-100 w-100">
            <v-app-bar class="border-b" flat>
                <v-tabs v-model="tabs" grow>
                    <v-tab prepend-icon="mdi-message-outline" class="text-capitalize">Comments</v-tab>
                    <v-tab prepend-icon="mdi-account-group" class="text-capitalize">Members</v-tab>
                </v-tabs>
            </v-app-bar>
            <v-main id="navigation-right" style="overflow: auto;">
                <v-list class="px-5" v-if="tabs == 1">
                    <v-list-item class="py-2 mb-2 rounded-lg" @click="" v-for="member in members"
                        :key="member.first_name"
                        :prepend-avatar="'https://source.unsplash.com/random/35x35/?person&' + member.first_name"
                        :title="member.first_name + ' ' + member.last_name">
                        <template #append>
                            <v-chip size="small" class="text-lowercase border rounded" flat
                                prepend-icon="mdi-account-tie" v-if="member.first_name == 'John'"
                                color="success">Admin</v-chip>
                            <v-btn v-else size="small" class="text-lowercase border" flat
                                prepend-icon="mdi-pencil-outline">edit</v-btn>
                        </template>
                    </v-list-item>
                    <v-list-item variant="tonal" class="py-2 mb-2 rounded-lg" prepend-icon="mdi-account-plus" @click="">
                        Invite more members
                    </v-list-item>
                </v-list>
                <div v-else>
                    <v-list-item class="px-0" v-for="message in messages" :key="message.sender">
                        <div class="pa-2" v-if="message.sender == 'John'">
                            <div class="d-flex">
                                <div class="d-flex w-100 flex-column align-end">
                                    <v-card class="mr-2 pa-2 text-caption w-100" color="primary">
                                        {{ message.message }}
                                    </v-card>
                                    <span
                                        class="text-caption d-flex align-center font-weight-regular mr-2 mt-1 text-grey-darken-1">
                                        <v-icon color="success" size="15" class="mr-2">mdi-check</v-icon>{{ new
        Date().toLocaleTimeString() }}
                                    </span>
                                </div>
                                <v-avatar class="border" size="30">
                                    <v-img
                                        :src="'https://source.unsplash.com/random/35x35/?person&' + message.sender"></v-img>
                                </v-avatar>
                            </div>
                        </div>
                        <div class="pa-2" v-else>
                            <div class="d-flex">
                                <v-avatar class="border" size="30">
                                    <v-img
                                        :src="'https://source.unsplash.com/random/35x35/?person&' + message.sender"></v-img>
                                </v-avatar>
                                <div class="d-flex flex-column">
                                    <v-card class="ml-2 pa-2 text-caption" color="secondary">
                                        {{ message.message }}
                                    </v-card>
                                    <span class="text-caption font-weight-regualar ml-2 mt-1 text-grey-darken-1">{{
        new
            Date().toLocaleTimeString() }}</span>
                                </div>
                            </div>
                        </div>
                    </v-list-item>
                </div>
            </v-main>
            <v-footer app v-if="tabs == 0">
                <v-text-field label="Write comment here..." single-line hide-details variant="solo-filled" flat
                    density="compact" append-inner-icon="mdi-send"></v-text-field>
            </v-footer>
        </v-layout>
    </v-navigation-drawer>
    <v-app-bar elevation="2" flat>
        <v-app-bar-nav-icon icon="mdi-arrow-left" @click="$router.push({ name: 'r-access-room-projects', params: { room: 'aD3Vwed6abuoPE2BzInnTKcTKYp' } })"></v-app-bar-nav-icon>
        <v-app-bar-title>
            <div class="d-flex align-center">
                <h4>{{ task.task_name }}</h4>
                <v-icon size="25">mdi-pencil-outline</v-icon>
            </div>
        </v-app-bar-title>
        <v-btn prepend-icon="mdi-export" class="text-capitalize" color="secondary" variant="flat">Export</v-btn>
        <v-app-bar-nav-icon class="ml-5 rounded-lg" @click="showNavigation = !showNavigation"></v-app-bar-nav-icon>

    </v-app-bar>
    <v-navigation-drawer width="350" class="pa-2 pl-10 pt-4" floating style="z-index: 100;">
        <v-btn append-icon="mdi-plus" class="rounded-lg text-capitalize" size="large" color="primary" block>Create new
            Section</v-btn>
        <v-card class="rounded-lg mt-3">
            <v-expansion-panels class="bg-transparent mt-0" :model-value="0">
                <v-expansion-panel elevation="0">
                    <v-expansion-panel-title class="font-weight-bold text-subtitle-1">
                        Sections
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-list>
                            <v-list-item class="rounded-lg mb-2" v-for="section in documentation.sections"
                                :key="section.title" :title="section.title" @click=""></v-list-item>
                        </v-list>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel elevation="0">
                    <v-expansion-panel-title class="font-weight-bold text-subtitle-1">
                        Other assigned to you
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-list>
                            <v-list-item class="rounded-lg mb-2" v-for="section in documentation.sections"
                                :key="section.title" :title="section.title" @click=""></v-list-item>
                        </v-list>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card>
    </v-navigation-drawer>
    <v-main>
        <v-card class="h-100 w-100 bg-background" flat>
            <v-container style="padding-inline: 50px;">
                <v-row>
                    <v-col cols="12">
                        <v-card class="rounded-lg pa-5">
                            <h5>Documentation</h5>
                            <h2>{{ task.task_name }}</h2>
                            <p>{{ task.description }}</p>
                        </v-card>
                        <div v-for="section in documentation.sections" :key="section.title">
                            <v-hover v-slot="{ isHovering, props }">
                                <v-card :height="isHovering ? '50px' : '10px'" v-bind="props" variant="tonal" block
                                    size="large"
                                    class="text-white my-5 text-capitalize font-weight-bold rounded-lg mx-auto d-flex align-center justify-center"
                                    style="transition: .15s ease;">
                                    <div v-if="isHovering">
                                        <v-icon>mdi-plus</v-icon>
                                        Add Section
                                    </div>
                                </v-card>
                            </v-hover>
                            <documentation-section-card @click="selected = section.title" :selected="selected" class="my-2" :section="section"></documentation-section-card>

                        </div>
                        <v-btn prepend-icon="mdi-plus" variant="tonal" block size="large"
                            class="text-white my-5 text-capitalize rounded-lg mx-auto">
                            <div>
                                Add Section
                            </div>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-main>
</template>

<script setup lang="ts">
import useDocumentationObject from '~/composables/useDocumentationObject';
import useSectionsObject from '~/composables/useSectionsObject';
const tabs = ref(1)
const showNavigation = ref(true)
const documentation = useDocumentationObject
const sections = useSectionsObject
const section = sections[0]
const task = section.tasks[0]
const chats = useChatboxObject
const selected = ref('')
const members = [
    {
        "first_name": "John",
        "last_name": "Smith"
    },
    {
        "first_name": "Emily",
        "last_name": "Johnson"
    },
    {
        "first_name": "Michael",
        "last_name": "Williams"
    },
    {
        "first_name": "Sarah",
        "last_name": "Brown"
    },
    {
        "first_name": "David",
        "last_name": "Jones"
    }
]

const messages = [
    {
        "sender": "Alice",
        "message": "Good morning everyone! Just a quick check-in before we kick off the day."
    },
    {
        "sender": "Bob",
        "message": "Morning, Alice! I'm ready to tackle the tasks for today."
    },
    {
        "sender": "Charlie",
        "message": "I'll be a bit tied up this morning, but I'll be available after lunch."
    },
    {
        "sender": "David",
        "message": "Got it, Charlie. Let us know if you need any support later."
    },
    {
        "sender": "Eve",
        "message": "Hey folks! Could someone clarify the scope of task #3 for me?"
    },
    {
        "sender": "Alice",
        "message": "Sure, Eve! I'll provide some additional details shortly."
    },
    {
        "sender": "Frank",
        "message": "Just a reminder that we have a client meeting at 2 PM today. Let's be prepared."
    },
    {
        "sender": "Alice",
        "message": "Thanks for the reminder, Frank. I'll finalize the presentation slides."
    },
    {
        "sender": "Bob",
        "message": "I'll review the project timeline to ensure we're on track for the meeting."
    },
    {
        "sender": "David",
        "message": "I'll reach out to the client to confirm the meeting logistics."
    }
]


const props = defineProps(['showEditor'])
const emits = defineEmits(['update:showEditor'])
const width = 685, height = 600
const { current } = useTheme()
const { fontFamilies, markColor, toggleCode, textColor, selectedMarkColor, selectedTextColor, history, advanceOption } = useFormat('text-input')

onMounted(() => {
})

const _export = () => {
    const hyperlink = document.getElementById('hyperlink') as HTMLLinkElement
    const textInput = document.getElementById("text-input")
    if (hyperlink && textInput) {
        useExport(hyperlink, textInput)
    }
}
</script>

<style scoped>
.selected {
    overflow: visible;
    border: 2px solid rgba(var(--v-theme-primary));
}

.selected::before {
    content: '🧑‍🦲Joshua Sotto';
    position: absolute;
    top: -29px;
    left: 15px;
    background-color: rgba(var(--v-theme-primary));
    color: white;
    padding: 2px 5px;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
}

#navigation-right::-webkit-scrollbar {
    width: 7px;
}

#navigation-right::-webkit-scrollbar-thumb {

    margin-right: 5px;
    border-radius: 5px;
}

#navigation-right:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, .2);
}
</style>