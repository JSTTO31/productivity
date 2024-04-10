<template>
    <utils-card ref="el" :show-card="showTips" title="Tips" :width="width" :height="height" icon="mdi-lightbulb-on"
        key="tips" @close="emits('update:showTips', false)" @minimize="emits('update:showTips', false)">
        <template #default="props">
            <v-card v-bind="props" class="rounded-0">
                 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, quisquam veniam, placeat fugiat possimus tempora est laborum repudiandae tenetur inventore molestias! Nobis quis inventore cum corrupti aspernatur tempora eum explicabo?
            </v-card>
        </template>
    </utils-card>
</template> 
<script setup lang="ts">
const props = defineProps(['showTips'])
const emits = defineEmits(['update:showTips',])
const el = ref()
const width = 800;
const height = 655;



onMounted(() => {
    const container = document.getElementById('Tips-container')
    
    if (container) {
        container.style.position = 'fixed';
        container.style.top = '15%';
        container.style.left = '37%';
    }
})

</script>
 
<style scoped> 
#card-tips {
     position: fixed;
     top: 50px;
     left: 50px;
     z-index: 100;
 }</style>