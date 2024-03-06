<template>
    <v-list-item title="My Tags" :append-icon="showListTags ? 'mdi-chevron-up' : 'mdi-chevron-down'" class="pa-3 px-5 ma-0 w-100 border-b" @click="showListTags = !showListTags">
    </v-list-item>
    <v-list class="w-100" v-if="showListTags">
        <v-hover v-for="tag in tags" :key="tag.label" v-slot="{props, isHovering}">
            <v-list-item class="px-5 text-caption border-b font-weight-regular w-100" :active="isHovering" v-bind="props">
                <template #prepend>
                    <v-icon :color="tag.color">mdi-square</v-icon>
                </template>
                {{ tag.label }}
                <template #append>
                    <div v-if="isHovering" style="position: absolute;right: 15px;">
                        <!-- <v-btn size="x-small" icon="mdi-trash-can-outline" color=""></v-btn> -->
                        <v-btn size="x-small" icon="mdi-trash-can-outline" color="error"></v-btn>
                    </div>
                </template>
            </v-list-item>
        </v-hover>
        <v-list-item class="px-5 text-caption border-b font-weight-light w-100" @click="" prepend-icon="mdi-plus">
            Add new tag
        </v-list-item>
    </v-list>
</template>

<script setup lang="ts">
const $tag = useTagStore()
const {tags} = storeToRefs($tag)
const showListTags = ref(true)


</script>

<style scoped>

</style>  