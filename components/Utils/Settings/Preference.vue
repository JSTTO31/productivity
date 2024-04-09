<template>
     <v-container class="pb-15">
        <v-card class="rounded-lg pa-0 mt-n3" flat>
            <v-card-title class="text-subtitle-1">Color Mode</v-card-title>
            <v-card-text>
                <v-select hide-details variant="outlined" density="comfortable" :items="colors"
                    item-title="label" item-value="value" class="w-50"
                    v-model="preference.theme.color"></v-select>
            </v-card-text>
        </v-card>
        <v-card class="rounded-lg" flat>
            <v-card-title class="text-subtitle-1">Background Themes</v-card-title>
            <v-card-text>
                <v-card class="rounded-lg pa-5 border d-flex flex-wrap " flat style="gap: 12px;">
                    <v-tooltip v-for="theme, index in themes.filter((item: any)  => item.type == 'video')">
                        <template #activator="{ props }">
                            <v-avatar
                                :style="preference.theme.background == index ? 'border: 4px solid #F5E8C7' : 'border: 1px solid #435585'"
                                @click="preference.theme.background = index" style="cursor:pointer" v-bind="props"
                                size="50" v-ripple :color="theme.color" class="mb-4 rounded-xl">
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
                        size="50" v-ripple class="mb-4 rounded-xl">
                        <v-img :src="theme.icon"></v-img>
                    </v-avatar>
                </v-card>
            </v-card-text>
        </v-card>
        <v-card class="rounded-lg pt-10" flat>
            <v-card-title class="text-subtitle-1 mt-n10">Hide navigation bar</v-card-title>
            <v-card-text class="mt-n5">
                <v-switch v-model="preference.hideBar" color="primary"></v-switch>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
const {themes, colors} = useThemeAndColor
const {preference} = storeToRefs(usePreferenceStore())
</script>

<style scoped>

</style>