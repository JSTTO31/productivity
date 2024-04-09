<template>
    <v-container class="pb-15">
        <div>
            <v-avatar size="120" class="mb-5">
                <v-img :src="user?.picture"></v-img>
            </v-avatar>
            <h2>{{ user?.name }}</h2>
        </div>
        <v-form @submit.prevent="submit">
            <div class="mt-5" v-if="user">
                <label for="">Name</label>
                <v-text-field :error-messages="$v.name.$errors[0]?.$message.toString() || ''" density="comfortable" single-line label="Name" class="mt-1"
                    variant="outlined" v-model="$v.name.$model"></v-text-field>
                <label for="">Email address</label>
                <v-text-field :error-messages="$v.email.$errors[0]?.$message.toString() || ''" density="comfortable" v-model="$v.email.$model" single-line label="Email address" class="mt-1"
                    variant="outlined"></v-text-field>
            </div>
            <div class="d-flex align-end">
                <v-btn type="submit" class="text-capitalize mr-15" color="primary" :loading="loading" variant="elevated">Save
                    changes</v-btn>

            </div>
        </v-form>
        <v-alert v-model="success" style="position: absolute;top: 10px; right: 10px" type="success" density="compact" variant="tonal" closable>Successfully updated!</v-alert>
    </v-container>
</template>

<script setup lang="ts">
import { required, email, } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
const {user} = storeToRefs(useUserStore())
const $user = useUserStore()
const loading = ref(false)
const success = ref(false)
const name = ref(user.value?.name || '')
const information = reactive({
    //@ts-ignore
    "email": user.value.email,
    //@ts-ignore
    "name": user.value.name
})
const $externalResults = ref({})

const rules = {
    name: {required},
    email: {required, email},
}


const $v = useVuelidate(rules, information, {$externalResults})

async function submit(){
    if(!await $v.value.$validate()) return 
    loading.value = true
    //@ts-ignore
    const {error,status} = await $user.updateInfo(information.name, information.email)
    loading.value = false

    if(status.value == 'success'){
        success.value = true
    }

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

<style scoped></style>