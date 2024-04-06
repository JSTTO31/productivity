<template>
    <v-layout>
        <v-main style="font-family: 'Roboto', sans-serif;background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
            <v-container fluid class="d-flex" style="padding-inline: 100px;">
                <v-col cols="6" style="padding-top: 200px;">
                    <h1 class="text-white text-h2 font-weight-bold" >Set Up Your Workspace</h1>
                    <h3 class="text-white font-weight-regular mt-5">Welcome to efficiently! Customize your environment and preferences to suit your workflow. Let's optimize your experience for maximum efficiency!</h3>
                    <div>
                       <v-btn class="mt-10 text-capitalize" @click="$router.push({name: 'setting-up-background'})" size="large" id="click-any">Click to begin</v-btn>
                    </div>
                </v-col>
                <v-col class="d-flex align-center" style="padding-top: 150px;">
                    <v-img src="/icons/confetti.png"></v-img>
                </v-col>
            </v-container>
        </v-main>
    </v-layout>
</template>

<script setup lang="ts">
useHead({
    title: 'Get started to our app'
})
definePageMeta({
    layout: false,
    middleware: 'setting-up'
})

</script>

<style scoped>
body::-webkit-scrollbar {
    width: 0;
}

#select-theme-card {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: .25s ease;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform .55s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>