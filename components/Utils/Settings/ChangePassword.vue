<template>
    <v-card flat class="border pa-3 rounded">
        <h4 class="font-weight-medium">Change password</h4>
        <v-form class="mt-3" @submit.prevent="submit">
            <v-text-field type="password" v-model="$v.currentPassword.$model" :error-messages="$v.currentPassword.$errors[0]?.$message.toString() || ''" density="comfortable" single-line class="mt-1" id="current-password" variant="outlined" label="Current password"></v-text-field >
            <v-text-field type="password" v-model="$v.newPassword.$model" :error-messages="$v.newPassword.$errors[0]?.$message.toString() || ''" density="comfortable" single-line class="mt-1" id="new-password" variant="outlined" label="New password"></v-text-field >
            <v-text-field type="password" v-model="$v.confirmPassword.$model" :error-messages="$v.confirmPassword.$errors[0]?.$message.toString() || ''" density="comfortable" single-line class="mt-1" id="confirmation-password" variant="outlined" label="Confirmation password"></v-text-field >
            <v-btn class="text-capitalize" type="submit" color="primary" flat @click="submit">Save</v-btn>
        </v-form>
    </v-card>
</template>

<script setup lang="ts">
import { required, sameAs, minLength } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
const $user = useUserStore()
const passwords = reactive({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
})

const rules = {
    currentPassword: {required},
    newPassword: {required, minLength: minLength(8)},
    confirmPassword: {required, confirm: sameAs(computed(() => passwords.newPassword))},
}

const $externalResults = ref({})

const $v = useVuelidate(rules, passwords, {$externalResults})

async function submit(){
    if(!await $v.value.$validate()) return
    const {error} = await $user.changePassword(passwords.currentPassword, passwords.newPassword, passwords.confirmPassword)
    if(error.value && error.value.data.errors){
        $externalResults.value = error.value.data.errors.reduce((container: any, error: any) => {
            if(!container[error.path]){
                container[error.path] = []
            }

            container[error.path].push(error.msg)

            return container
        },{})
    
    }
}


</script>

<style scoped>

</style>