<template>
    <v-navigation-drawer location="left"
        :model-value="showNavigation" style="z-index: 50 !important;">
        <v-card class="pa-3 px-5 d-flex align-center border-b rounded-0" color="transparent" flat>
            <h4 class="font-weight-regular">Tasks</h4>
            <v-spacer></v-spacer>
            <v-btn icon="mdi-plus" size="x-small" variant="text"></v-btn>
        </v-card>
        <v-list class="text-">
            <v-list-item class="text-center font-weight-light">
                No tasks
            </v-list-item>
        </v-list>
        <schedule-list-tags></schedule-list-tags>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
const $tag = useTagStore()
const props = defineProps(['showNavigation'])
$tag.getAll()
</script>

<style scoped>

</style>