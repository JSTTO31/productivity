<template>
    <div class="bg-blue-lighten-1 h-100">
        <nuxt-page></nuxt-page>
        <span id="step-indicator" class="text-h6  font-weight-regular">
            Let's begin your journey (1 of 3)
        </span>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
#step-indicator{
    position: fixed;
    top: 25px;
    left: 50%;
    transform: translateX(-50%);
}
</style>