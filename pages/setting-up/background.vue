<template>
    <v-layout class="h-100">
        <v-main style="font-family: 'Roboto', sans-serif">
            <v-container fluid class="d-flex h-100 d-flex w-100" style="padding-inline: 100px;padding-top: 140px">
                <v-col cols="4">
                    <h3 class="mb-5">Choose your relaxing background</h3>
                    <div class="d-flex flex-wrap pr-10" style="gap: 0px">
                        <v-tooltip v-for="theme, index in themes.filter((item: any) => item.type == 'video')">
                            <template #activator="{ props }">
                                <v-avatar :style="preference.theme.background == index
                                ? 'border: 4px solid #F5E8C7'
                                : 'border: 1px solid #435585'
                            " @click="preference.theme.background = index" style="cursor: pointer" v-bind="props" size="60" v-ripple
                                    :color="theme.color" class="mb-4 rounded-xl mr-3">
                                    <v-img :src="theme.icon"></v-img>
                                </v-avatar>
                            </template>
                            {{ theme.label }}
                        </v-tooltip>
                        <v-avatar  v-for="theme, index in themes.filter((item: any) => item.type == 'color')"
                            :style="[{border: preference.theme.background == (index + 9)
                                ? '4px solid #F5E8C7'
                                : '1px solid #435585'
                            }, theme.backgroundColor]"
                            @click="preference.theme.background = (index + 9)" style="cursor: pointer"
                            size="60" v-ripple class="mb-4 rounded-xl mr-3">
                            <v-img :src="theme.icon"></v-img>
                        </v-avatar>
                    </div>
                    <v-tooltip location="bottom">
                        <template #activator="{props}">
                            <v-btn v-bind="props" class="text-capitalize mt-5 mr-4" variant="flat" size="large" color="warning" prepend-icon="mdi-alert" >Skip all</v-btn>
                        </template>
                        We've disabled the skip button to encourage exploring. Thanks for your understanding!
                    </v-tooltip>
                    <v-btn flat class="text-capitalize mt-5" size="large" color="primary" append-icon="mdi-arrow-right" @click="$router.push({name: 'setting-up-project'})">Continue</v-btn>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="8" class="pl-15"> 
                    <v-card v-ripple="false" elevation="5" class="w-100 pa-0 theme-card" @click="fullscreen = !fullscreen" :class="fullscreen ? 'fullscreen' : ''" :height="name == 'lg' ? 455 : 600">
                        <v-card height="40" class="pa-2 rounded-0 border-b d-flex w-100 align-center" style="position: absolute;z-index: 1000;" flat>
                            <div class="d-flex mr-15 ml-2">
                                <v-icon class="ml-1" color="success" size="15">mdi-circle</v-icon>
                                <v-icon class="ml-1" color="warning" size="15">mdi-circle</v-icon>
                                <v-icon class="ml-1" color="error" size="15">mdi-circle</v-icon>
                            </div>
                        </v-card>
                        <UtilsThemeBackground class="h-100 w-100"></UtilsThemeBackground>
                    </v-card>
                </v-col>
            </v-container>
        </v-main>
        <span id="step-indicator" class="text-h6  font-weight-regular">
            Relaxing Background Setup (2 of 4)
        </span>
    </v-layout>
</template>

<script setup lang="ts">
import useThemeAndColor from '~/composables/useThemeAndColor';
const {user} = storeToRefs(useUserStore())
useHead({
    title: "Set your background",
});
definePageMeta({
    layout: false,
    middleware: "setting-up",
    pageTransition: {
        name: 'slide',
        mode: 'out-in'
    }
});
const {name} = useDisplay()
const {themes} = useThemeAndColor
const fullscreen = ref(false)
const {preference} = storeToRefs(usePreferenceStore())
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
    transition: 0.25s ease;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity .25s linear, transform .55s ease;
}

.slide-enter-from{
  transform: translateX(100%);

}
.slide-leave-to {
  transform: translateX(-100%);
}

.action {
    position: fixed;
    bottom: 10px;
    right: 10px;
}

#step-indicator{
    position: fixed;
    top: 25px;
    left: 50%;
    transform: translateX(-50%);
}


.theme-card{
    transition: .6s ease;
    cursor: zoom-in;

}
.fullscreen{
    transform: scale(1.5) translateX(-20%);
    cursor: zoom-out;
}
</style>
