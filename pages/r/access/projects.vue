<template>
    <div>
        <project-navigation-drawer :model-value="showNavigation"></project-navigation-drawer>
        <NuxtLoadingIndicator></NuxtLoadingIndicator>
        <suspense v-if="$route.params.project">
            <NuxtPage></NuxtPage>
            <template #fallback>
                <v-main class="h-screen">
                    <v-layout class="h-100 w-100" id="loading-layout">
                        <v-app-bar density="compact" class="border-b"  flat style="background-color: rgba(0,0,0,.5);">
                            <v-card color="background" variant="tonal" class="ml-5  rounded-lg" width="40" height="30"></v-card>
                            <v-card color="background" variant="tonal" class="ml-5  rounded-lg" width="250" height="30"></v-card>
                            <v-spacer></v-spacer>
                            <v-card color="background" variant="tonal" class="mr-5  rounded-lg" width="90" height="30"></v-card>
                            <v-card color="background" variant="tonal" class="mr-5  rounded-lg" width="90" height="30"></v-card>

                            <v-card color="background" variant="tonal" class="mr-5  rounded-circle" width="40" height="30"></v-card>
                            <v-card color="background" variant="tonal" class="mr-5  rounded-circle" width="40" height="30"></v-card>
                            <v-card color="background" variant="tonal" class="mr-5  rounded-circle" width="40" height="30"></v-card>
                            <v-card color="background" variant="tonal" class="mr-5  rounded-lg" width="40" height="30"></v-card>
                        </v-app-bar>
                        <v-main class="h-100">
                            <v-card class="w-100 h-100 rounded-0"
                                color="transparent">
                                <v-container class="pa-0 h-100 mr-15 d-flex " fluid>
                                    <v-col cols="3" xl="2" class="h-100 pa-0 rounded-lg"
                                        v-for="section in sections" :key="section.section_name">
                                        <v-card class=" px-5 py-3 pt-10 rounded-0  h-100"
                                            style="background-color: rgba(0,0,0,.2);overflow-y: auto;">
                                            <div class="text-white mb-2 d-flex align-center mb-5">
                                                <v-card width="200" height="25" color="background" variant="tonal"></v-card>
                                                <v-spacer></v-spacer>
                                                <v-card class="mr-2" width="25" height="25" color="background" variant="tonal"></v-card> 
                                                <v-card width="25" height="25" color="background" variant="tonal"></v-card> 
                                            </div>
                                            <v-card v-for="section in sections" class="mb-5" :key="section.id"
                                                variant="tonal" color="background" height="60"></v-card>
                                            <v-card class="text-capitalize rounded-lg" color="background"
                                                variant="tonal" height="35" block>
                                            </v-card>
                                        </v-card>
                                    </v-col>
                                    <v-col cols="3" xl="2" class="h-100 pa-0 mr-3">
                                        <v-card
                                            class="h-100 px-5 py-3 d-flex text-white rounded-0 align-center justify-center text-subtitle-2 font-weight-bold text-white"
                                            style="background-color: rgba(0,0,0,.5);">
                                            <v-card variant="tonal" width="150" height="35">
                                            </v-card>
                                        </v-card>
                                    </v-col>
                                </v-container>
                            </v-card>
                        </v-main>
                    </v-layout>
                </v-main>
            </template>
        </suspense>
        <v-main v-else class="h-screen">
            <v-card style="background: rgba(0, 0, 0, .2);" class="h-100 w-100 d-flex align-center justify-center">
                <div class="d-flex flex-column">
                    <v-icon style="transform: rotate(25deg);" size="200" color="white">mdi-lightning-bolt</v-icon>
                    <h4 class="text-center text-white my-15 mt-5">No project found</h4>
                    <v-btn class="text-capitalize">Create new project</v-btn>
                    <h4 class="text-center font-weight-regular text-white mt-5">No available templates</h4>
                </div>
            </v-card>
        </v-main>
    </div>
</template>

<script setup lang="ts">
const sections = useSectionsObject
useHead({
    title: 'Projects'
})
definePageMeta({
    layout: 'authenticated',
    middleware: 'auth'
})
const showNavigation = ref(true)
provide('showProjectsNavigation', showNavigation)

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

#loading-layout {
    animation: blinking 2s ease 0s infinite normal forwards;

}

@keyframes blinking {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.2;
    }

    100% {
        opacity: 1;
    }
}
</style>