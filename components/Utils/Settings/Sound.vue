<template>
     <v-container class="pb-15 px-5">
        <div v-for="sound in preference.sounds">
            <div v-if="sound.label" class="mb-5">
                <label class="mx-2 text-subtitle-1 font-weight-medium">{{ sound.label }}</label>
                <v-slider step="10"
                :prepend-icon="sound.value >= 80 ? 'mdi-volume-high' : sound.value > 1 ? 'mdi-volume-medium' : 'mdi-volume-off'"
                color="primary" v-model="sound.value" @click:prepend="prependClick(sound)"></v-slider>
            </div>
        </div>
    </v-container>
</template>

<script setup lang="ts">
const {preference} = storeToRefs(usePreferenceStore())
const prependClick = (sound: { label: string, value: number }) => {
    if (sound.value == 100) {
        sound.value = 0
    } else {
        sound.value = 100
    }
}
</script>

<style scoped>

</style>