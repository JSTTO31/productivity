<template>
   <v-list-item class="pa-2 rounded-0 mb-2 border-b" :prepend-avatar="member.user.picture" :title="member.user.name.toString()">
        <template #append>
            <!-- <v-select density="compact" class="text-capitalize" hide-details single-line variant="solo-filled" flat v-model="role" :items="['admin', 'member']"></v-select> -->
            <div class="d-flex" style="gap: 5px;"> 
                <v-menu>
                    <template #activator="{props}">
                        <v-btn v-bind="props" append-icon="mdi-chevron-down" variant="tonal" size="small" class="text-capitalize">{{ role }}</v-btn>
                    </template>
                    <v-list>
                        <v-list-item class="text-caption border-b text-center pa-2" density="compact" @click="role = 'admin'">Admin</v-list-item>
                        <v-list-item class="text-caption border-b text-center pa-2" density="compact" @click="role = 'member'">Member</v-list-item>
                    </v-list>
                </v-menu>
                <v-btn color="error" size="small" @click="remove" class="rounded text-capitalize" variant="tonal" >
                    <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
            </div>
        </template>
    </v-list-item>
</template>

<script setup lang="ts">
const props = defineProps<{member: MemberType, members: MemberType[]}>()
const role = ref(props.member.role)
const emits = defineEmits(['update:members'])
watch(role, (current) => {
    emits('update:members', props.members.map(item => item._id == props.member._id ? {...item, role: current} : item))
})

function remove(){
    const newMembers = props.members.filter(member => member._id != props.member._id)
    emits('update:members', newMembers)

}
</script>

<style scoped>

</style>