<template>
   <v-card flat class="border pa-3 rounded pb-5 mb-5">
        <h4 class="font-weight-medium">Browser Sessions</h4>
        <p class="text-caption">These records of your activity on our website help ensure security during your visit.</p>
        <v-list v-if="user" class="mt-3">
            <UtilsSettingsSessionListItem v-for="session in sorted" :key="session._id" :session="session"></UtilsSettingsSessionListItem>
        </v-list>
        <v-btn v-if="user" color="primary" class="text-capitalize mt-2" :loading="loading" :disabled="loading || user.sessions.length < 2" @click="logoutSessions">Logout other sessions</v-btn>
    </v-card>
</template>

<script setup lang="ts">
const $user = useUserStore()
const {user} = storeToRefs(useUserStore())
const loading = ref(false)
const sorted = computed(() => user.value?.sessions.sort((a,b) => b.current ? 1 : -1) || [])
async function logoutSessions(){
    loading.value = true
    await $user.logoutOtherSessions()
    loading.value = false
}
</script>

<style scoped>

</style>