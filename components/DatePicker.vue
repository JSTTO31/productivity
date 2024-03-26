<template>
    <div>
        <v-text-field :model-value="date" @change="($event: any) => emits('update:date', $event.target.value)" min="5" prepend-inner-icon="mdi-calendar" variant="solo-filled" flat density="compact" type="date"></v-text-field>
    </div>
</template>

<script setup lang="ts">
const props = defineProps(['date'])
const date = new Date(props.date).toISOString().substring(0,10)
const emits = defineEmits(['update:date'])
</script>

<style scoped>

</style>