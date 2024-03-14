<template>
    <v-navigation-drawer :model-value="showNavigation" style="z-index: 50 !important;" floating width="280">
        <v-layout class="h-100">
            <v-main style="overflow: auto;" id="project-list">
                <v-list class="my-0 pa-0 px-2">
                    <v-list-item class="my-2 rounded-lg" :append-icon="showRecents ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                        @click="showRecents = !showRecents">
                        <h5 class="d-flex align-center font-weight-medium"><v-icon class="mr-2">mdi-history</v-icon>
                            Recents open</h5>
                    </v-list-item>
                </v-list>
                <v-list class="pa-0 px-2" v-if="showRecents">
                    <v-list-item :active="recent.name == 'History Research Paper'" :prepend-icon="recent.icon"
                        class="text-caption rounded-lg mb-2" v-for="recent in recents" :key="recent.name" @click="">{{
        recent.name }}</v-list-item>
                </v-list>
                <v-list class="my-0 pa-0 px-2">
                    <v-list-item class="my-2 rounded-lg" :append-icon="showProjects ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                        @click="showProjects = !showProjects">
                        <h5 class="d-flex align-center font-weight-medium"><v-icon class="mr-2"
                                size="16">mdi-file-multiple-outline</v-icon> Projects</h5>
                    </v-list-item>
                </v-list>
                <v-list class="pa-0 px-2" v-if="showProjects">
                    <v-list-item :active="project.name == 'History Research Paper'" :prepend-icon="project.icon"
                        class="text-caption rounded-lg mb-2" v-for="project in projects" :key="project.name" @click="">{{
        project.name }}</v-list-item>
                </v-list>
                <v-list class="my-0 pa-0 px-2">
                    <v-list-item class="my-2 rounded-lg" :append-icon="showStarred ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                        @click="showStarred = !showStarred">
                        <h5 class="d-flex align-center font-weight-medium"><v-icon
                                class="mr-2">mdi-star-outline</v-icon> Starred</h5>
                    </v-list-item>
                </v-list>
                <v-list class="pa-0 px-2" v-if="showStarred">
                    <v-list-item :active="star.name == 'History Research Paper'" :prepend-icon="star.icon"
                        class="text-caption rounded-lg mb-2" v-for="star in starred" :key="star.name" @click="">{{ star.name
                        }}</v-list-item>
                </v-list>
            </v-main>
            <v-footer app>
                <v-btn class="text-capitalize" flat color="primary" prepend-icon="mdi-plus" block>New Project</v-btn>
            </v-footer>
        </v-layout>

    </v-navigation-drawer>

</template>

<script setup lang="ts">
const props = defineProps(['showNavigation'])
const showRecents = ref(true)
const showProjects = ref(true)
const showStarred = ref(true)
const {projects, recents, starred} = useProjectObjects
</script>

<style scoped>
#project-list::-webkit-scrollbar{
    width: 8px;
}

#project-list::-webkit-scrollbar-thumb{
    border-radius: 25px;
}

#project-list:hover::-webkit-scrollbar-thumb{
    background-color: rgba(0, 0, 0, 0.192);

}


</style>