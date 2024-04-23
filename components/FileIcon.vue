<template>
    <v-card :color="file.color" class="d-flex align-center border justify-center">
        <v-icon :size="size">{{file.icon}}</v-icon>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps(['size', 'type'])
const mimetypes = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'application/vnd.ms-powerpoint', 'application/zip', 'application/x-sql', 'application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
const file = computed(() => {
    if(props.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
        return {icon: 'mdi-microsoft-word', color: 'blue'}
    }
    else if(props.type.split('/')[0] == 'image'){
        return {icon: 'mdi-image', color: 'white'}
    }
    else if(props.type == 'application/vnd.ms-powerpoint'){
        return {icon: 'mdi-microsoft-powerpoint', color: 'amber-darken-4'}
    }
    else if(props.type == 'application/zip' || props.type == 'application/x-zip-compressed'){
        return {icon: 'mdi-zip-box', color: 'yellow'}
    }
    else if(props.type == 'application/x-sql'){
        return {icon: 'mdi-database', color: 'orange'}
    }
    else if(props.type == 'application/pdf'){
        return {icon: 'mdi-file-cad', color: 'orange'}
    }
    else if(props.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
        return {icon: 'mdi-microsoft-excel', color: 'green-darken-3'}
    }
    else{
        return {icon: 'mdi-file-outline', color: 'grey-lighten-1'}
    }
})
</script>

<style scoped>

</style>