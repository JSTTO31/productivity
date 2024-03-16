<template>
    <v-navigation-drawer location="right" width="350" :model-value="showNav">
        <v-layout class="h-100 w-100" :model-value="showNav" style="z-index: 300;">
            <v-app-bar density="compact" class="pl-5 border-b" flat>
                <h4>
                    <v-icon>mdi-chat</v-icon>
                    Team Chat
                </h4>
                <v-spacer></v-spacer>
                <v-btn icon="mdi-close" class="rounded-0" @click="emits('update:showNav', false)"></v-btn>
            </v-app-bar>
            <v-main id="chat-box-main" :style="{ overflowY: showNav ? 'auto' : 'hidden' }">
                <div v-for="message in chats.messages" :key="message.sender">
                    <div class="pa-2" v-if="message.sender == 'Liam'">
                        <div class="d-flex">
                            <div class="d-flex flex-column align-end">
                                <v-card class="mr-2 pa-2 text-caption" color="primary">
                                    {{ message.content }}
                                </v-card>
                                <span
                                    class="text-caption d-flex align-center font-weight-regular mr-2 mt-1 text-grey-darken-1">
                                    <v-icon color="success" size="15" class="mr-2">mdi-check</v-icon>{{ new
        Date(message.timestamp).toLocaleTimeString() }}
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
                                    {{ message.content }}
                                </v-card>
                                <span class="text-caption font-weight-regualar ml-2 mt-1 text-grey-darken-1">{{ new
        Date(message.timestamp).toLocaleTimeString() }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </v-main>
            <v-footer app>
                <v-text-field hide-details single-line density="compact" variant="solo-filled" class="" flat
                    label="Write your message here..." append-inner-icon="mdi-send"></v-text-field>
            </v-footer>
        </v-layout>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
import useChatboxObject from '~/composables/useChatboxObject';

const props = defineProps(['showNav'])
const emits = defineEmits(['update:showNav'])
const chats = useChatboxObject
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