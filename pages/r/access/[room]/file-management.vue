<template>
    <v-navigation-drawer>
        <v-list class="px-2 text-subtitle-2">
            <v-list-item active variant="flat" @click="" color="primary" density="compact" class="rounded-lg mb-2" style="text-wrap: nowrap;">
                <v-icon class="mr-5">mdi-chart-bell-curve-cumulative</v-icon>
                Overview
            </v-list-item>
            <v-list-item variant="flat" @click="" color="primary" density="compact" class="rounded-lg mb-2" style="text-wrap: nowrap;">
                <v-icon class="mr-5">mdi-image-multiple</v-icon>
                Images
            </v-list-item>
            <v-list-item variant="flat" @click="" color="primary" density="compact" class="rounded-lg mb-2" style="text-wrap: nowrap;">
                <v-icon class="mr-5">mdi-video</v-icon>
                Videos
            </v-list-item>
            <v-list-item variant="flat" @click="" color="primary" density="compact" class="rounded-lg mb-2" style="text-wrap: nowrap;">
                <v-icon class="mr-5">mdi-book-music</v-icon>
                Music
            </v-list-item>
            <v-list-item variant="flat" @click="" color="primary" density="compact" class="rounded-lg mb-2" style="text-wrap: nowrap;">
                <v-icon class="mr-5">mdi-folder-multiple</v-icon>
                Folders
            </v-list-item>
            <v-list-item variant="flat" @click="" color="primary" density="compact" class="rounded-lg mb-2" append-icon="mdi-chevron-down" style="text-wrap: nowrap;">
                <v-icon class="mr-5">mdi-history</v-icon>
                Recents
            </v-list-item>
            <v-list-item variant="flat" @click="" color="primary" density="compact" class="rounded-lg mb-2" append-icon="mdi-chevron-down" style="text-wrap: nowrap;">
                <v-icon class="mr-5">mdi-star-outline</v-icon>
                Starred
            </v-list-item>
            <v-list-item @click="" color="error" active density="compact" class="rounded-lg mb-2">
                <v-icon class="mr-5">mdi-trash-can-outline</v-icon>
                Trash bin
            </v-list-item>
            <v-divider class="my-5"></v-divider>
            <v-card color="warning" variant="tonal">
                <v-list-item>
                    <v-list-item-header class="mt-2 ">
                        <v-icon class="mr-4">mdi-cloud-outline</v-icon>
                        Storage
                    </v-list-item-header>
                    <v-list-item-title class="mt-2">
                        <v-progress-linear :model-value="25"></v-progress-linear>
                    </v-list-item-title>
                    <v-list-item-subtitle class="mb-2 mt-2 text-caption">
                        25 MB of 100 MB used
                    </v-list-item-subtitle>
                </v-list-item>
            </v-card>
        </v-list>
    </v-navigation-drawer>
    <v-app-bar class="border-b" density="compact" flat>
        <v-breadcrumbs :items="['Development of productivity app']">
        </v-breadcrumbs>
    </v-app-bar>
    <v-main>
        <v-container>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat iste quisquam harum cupiditate voluptatibus accusamus vero temporibus atque ipsa ratione. Voluptate rem eius saepe aperiam neque quam corrupti sequi pariatur?
        </v-container>
    </v-main>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>