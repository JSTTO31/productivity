<template>
    <client-only>
        <nuxtPage>

        </nuxtPage>
    </client-only>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ['guest'],
    layout: false,
    pageTransition: false,
})
</script>

<style scoped></style>