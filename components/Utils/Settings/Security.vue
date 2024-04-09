<template>
    <div class="pa-4 pb-15">
        <UtilsSettingsBrowserSession></UtilsSettingsBrowserSession>
        <UtilsSettingsChangePassword></UtilsSettingsChangePassword>
        <v-card flat class="border pa-3 rounded pb-5 mb-5 mt-5" >
            <h4 class="font-weight-medium">Delete Account</h4>
            <p class="text-caption">Permanently remove your account and all associated data from our system.</p>
            <div class="mt-8" v-if="user"> 
                <label for="">Enter your email and click 'Delete' to permanently remove your account.</label>
                <v-text-field v-model="email" :label="user.email.toString()" variant="outlined" density="compact" class="mt-2 w-50" single-line ></v-text-field>
                <v-btn class="text-capitalize" color="error" :disabled="!user || user.email != email || loading" :loading="loading" @click="permanentlyDelete">Delete Permanently</v-btn>
            </div>
        </v-card>
    </div>
</template>

<script setup lang="ts">
const {user} = storeToRefs(useUserStore())
const $user = useUserStore()
const email = ref('')
const loading = ref(false)
async function permanentlyDelete() {
    loading.value = true
    await $user.deleteAccount()
    loading.value = false
}
</script>

<style scoped>

</style>
