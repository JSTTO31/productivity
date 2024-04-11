<template>
    <v-layout class="h-100">
        <v-main style="font-family: 'Roboto', sans-serif;">
            <v-container fluid class="d-flex flex-column align-center h-100" style="padding-inline: 100px;">
                <v-col cols="8" class="d-flex flex-column" style="padding-top: 150px;z-index: 10;" >
                    <h1 class="text-center text-h2 font-weight-bold mt-15">Set up your Workspace</h1>
                    <h3 class="text-center font-weight-regular mt-5 text-h6 text-xl-h5">Welcome to efficiently! Customize your environment and preferences to suit your workflow. Let's optimize your experience for maximum efficiency!</h3>
                    <v-btn class="mx-auto text-capitalize mt-5 mt-xl-15" variant="outlined" size="x-large" @click="$router.push({name: 'setting-up-background'})">Click to begin your journey</v-btn>
                </v-col>
                <v-col class="d-flex align-center justify-center mt-n15">
                    <v-card color="transparent" flat width="500">
                        <v-img src="/icons/confetti.png" class="w-100"></v-img>
                    </v-card>
                </v-col>
            </v-container>
        </v-main>
        <span id="step-indicator" class="text-h6  font-weight-regular">
            Let's begin your journey (1 of 4)
        </span>
    </v-layout>
</template>

<script setup lang="ts">
useHead({
    title: 'Get started to our app'
})
definePageMeta({
    layout: false,
    middleware: 'setting-up',
    pageTransition: {
        name: 'slide',
        mode: 'out-in'
    }
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

#step-indicator{
    position: fixed;
    top: 25px;
    left: 50%;
    transform: translateX(-50%);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform .55s ease;
}

.slide-enter-from{
  transform: translateX(100%);

}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>