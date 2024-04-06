<template>
    <v-layout>
        <!-- <UtilsThemeBackground></UtilsThemeBackground> -->
        <v-main>
            <v-container class="h-100 d-flex pa-0" fluid>
                <v-col cols="4" class="h-100">
                </v-col>
                <v-divider vertical></v-divider>
                <v-col cols="8" class="h-100">
                </v-col>
            </v-container>
        </v-main>
        <v-overlay :model-value="true" scrim="transparent" class="d-flex justify-center align-center" width="550">
            <v-card class="pa-5" flat>
                <v-card-title>
                    The name of you project
                </v-card-title>
                <v-card-text>

                </v-card-text>
                <v-card-actions>

                </v-card-actions>
            </v-card>
        </v-overlay>
        <div class="action" color="transparent">
            <v-spacer></v-spacer>
                <v-btn size="large" variant="elevated" flat class="text-capitalize mr-3">Skip, setting up</v-btn>
                <v-btn size="large" variant="elevated" color="primary" flat class="text-capitalize" @click="$router.push({name: 'setting-up-project'})">Next</v-btn>
        </div>
    </v-layout>
</template>

<script setup lang="ts">
useHead({
    title: 'Set your background'
})
definePageMeta({
    layout: false,
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

.slide-enter-active,
.slide-leave-active {
  transition: opacity .25s linear, transform .55s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: scale(.5);
}

.action{
    position: fixed;
    bottom: 10px;
    right: 10px;
}

</style>