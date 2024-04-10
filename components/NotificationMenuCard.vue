<template>
    <v-menu location="bottom center" style="z-index: 100" transition="slide-y-transition">
        <template #activator="{props}">
            <slot v-bind="props"></slot>
        </template>
        <v-card class="mt-2 rounded-lg" width="350" height="450">
            <v-img class="w-66 mx-auto mt-15" src="/undraw/announcement.svg"></v-img>
            <h3 class="px-5 text-center mt-15 font-weight-medium">Stay informed with real-time updates and notifications.</h3>
        </v-card>
    </v-menu>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>