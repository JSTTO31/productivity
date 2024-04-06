<template>
    <v-layout>
        <UtilsThemeBackground :style="show ? 'filter: brightness(65%);' : ''"></UtilsThemeBackground>
            <v-card :style="!show ? 'transform: translate(-50%, 76%)' : ''"  id="select-theme-card" class=" rounded-t-lg pa-5 pt-4" flat width="700" >
                <div class="d-flex align-center">
                    <h3 class=" text-center">Select your theme</h3>
                    <v-spacer></v-spacer>
                    <v-btn flat class="text-capitalize" append-icon="mdi-eye-off-outline" @click="show = !show" v-if="show">Hide themes</v-btn>
                    <v-btn flat class="text-capitalize" append-icon="mdi-eye-outline" @click="show = !show" v-else>Show themes</v-btn>
                </div>
                <v-divider class="my-5 mt-2"></v-divider>
                <div class="d-flex flex-wrap justify-space-between" style="gap: 5px">
                    <v-tooltip v-for="theme in themes.filter(item => item.type == 'video')">
                        <template #activator="{ props }">
                            <v-avatar
                                :style="selectedTheme.id == theme.id ? 'border: 4px solid #F5E8C7' : 'border: 1px solid #435585'"
                                @click="selectedTheme = theme" style="cursor:pointer" v-bind="props" size="65" v-ripple
                                :color="theme.color" class="mb-4 rounded-xl mr-3">
                                <v-img :src="theme.icon"></v-img>
                            </v-avatar>
                        </template>
                        {{ theme.label }}
                    </v-tooltip>
                    <v-avatar v-for="theme in themes.filter(item => item.type == 'color')" :style="theme.backgroundColor"
                        @click="selectedTheme = theme" style="cursor:pointer" size="65" v-ripple
                        class="mb-4 rounded-xl mr-3">
                        <v-img :src="theme.icon"></v-img>
                    </v-avatar>
                    <v-spacer></v-spacer>
                </div>
                <v-slider label="Theme" step="10"
                        :prepend-icon="sounds.theme.value >= 80 ? 'mdi-volume-high' : sounds.theme.value > 1 ? 'mdi-volume-medium' : 'mdi-volume-off'"
                        v-model="sounds.theme.value" color="primary" @click:prepend="prependClick(sounds.theme)"></v-slider>
            </v-card>
            <div class="action" color="transparent">
                <v-spacer></v-spacer>
                    <v-btn size="large" variant="elevated" flat class="text-capitalize mr-3" @click="next">Skip, setting up</v-btn>
                    <v-btn size="large" variant="elevated" color="primary" flat class="text-capitalize" @click="next">Next</v-btn>
            </div>
    </v-layout>
</template>

<script setup lang="ts">
import { useAppStore } from '~/stores/app';
import { themes } from '../../stores/theme'
useHead({
    title: 'Set your background'
})
definePageMeta({
    layout: false,
    middleware: 'setting-up'
    
})
const show = ref(true)
const { selectedTheme } = storeToRefs(useThemeStore())
const { sounds } = storeToRefs(useAppStore())
const prependClick = (sound: { label: string, value: number }) => {
    if (sound.value == 100) {
        sound.value = 0
    } else {
        sound.value = 100
    }
}
const router = useRouter()
function next(){
    localStorage.setItem('newUser', 'example')
    router.push({name: 'r-access-home'})
}
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

.action{
    position: fixed;
    bottom: 10px;
    right: 10px;
}

</style>