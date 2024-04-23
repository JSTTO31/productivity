<template>
   <v-hover v-slot="{props, isHovering}">
        <v-list-item v-bind="props" @click="" class="pa-3 rounded mb-2" :subtitle="(attachment.size / 1000).toFixed(0) + ' kb'" :title="attachment.originalname">
            <template #prepend>
                <FileIcon :type="attachment.mimetype" class="mr-2 rounded-lg" height="45" width="45" size="25"></FileIcon>
            </template>
            <template #append>
                <v-btn icon="mdi-trash-can-outline" color="error" v-if="isHovering" size="small" variant="tonal" @click="emits('remove', attachment._id)"></v-btn>
            </template>
        </v-list-item>
   </v-hover>
</template>

<script setup lang="ts">
import type { AttachmentType } from '~/stores/project';

const props = defineProps<{attachment: AttachmentType}>()
const emits = defineEmits(['remove'])
</script>

<style scoped>

</style>