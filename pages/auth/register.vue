<template>
    <v-main class="d-flex justify-center align-center bp-15">
        <client-only>
            <v-card flat class="rounded-xl px-5 d-flex mt-5 mb-15 flex-column px-10" color="transparent" width="550">
                <v-avatar @click="$router.push({ name: 'index' })" class="mx-auto" size="75"
                    style="transform: rotate(25deg);cursor: pointer;">
                    <v-icon size="75">mdi-lightning-bolt</v-icon>
                </v-avatar>
                <h1 class="text-center font-weight-bold" style="font-family: 'Roboto', cursive !important;">Sign up with
                    efficiently</h1>
                <h3 class="font-weight-regular text-center mt-2">
                    Alread have an account? <span class="text-blue-darken-2" style="cursor: pointer;"
                        @click="$router.push({ name: 'auth-login' })">Sign in</span>
                </h3>
                <v-card class="d-flex justify-center mt-10 align-center pa-3" @click="signInWithGoogle" variant="outlined">
                    <v-avatar size="30">
                        <v-img src="/icons/google.png"></v-img>
                    </v-avatar>
                    <h3 class="font-weight-medium ml-5">Sign up with google</h3>
                </v-card>
                <v-form @submit.prevent="submit">
                    <div class="d-flex align-center my-5">
                        <v-divider></v-divider>
                        <span class="w-25 text-center">or</span>
                        <v-divider></v-divider>
                    </div>
                    <div>
                        <label class="font-weight-bold" for="name">Name</label>
                        <v-text-field v-model="$v.name.$model"
                            :error-messages="$v.name.$errors[0]?.$message as string || ''" id="name"
                            variant="solo-filled" flat class="my-2" density="comfortable"
                            prepend-inner-icon="mdi-account" single-line
                            label="Enter your name address"></v-text-field>
                    </div>
                    <div>
                        <label class="font-weight-bold" for="email">Email address</label>
                        <v-text-field v-model="$v.email.$model"
                            :error-messages="$v.email.$errors[0]?.$message as string || ''" id="email"
                            variant="solo-filled" flat class="my-2" density="comfortable"
                            prepend-inner-icon="mdi-email-outline" single-line
                            label="Enter your email address"></v-text-field>
                    </div>
                    <div class="d-flex" style="gap: 10px;">
                        <div class="w-50">
                            <label class="font-weight-bold" for="password">Password</label>
                            <v-text-field :type="togglePassword ? 'text' : 'password'" v-model="$v.password.$model"
                                :error-messages="$v.password.$errors[0]?.$message as string || ''" id="password"
                                variant="solo-filled" flat class="my-2" density="comfortable"
                                 single-line label="*******"
                                ></v-text-field>
                        </div>
                        <div class="w-50">
                            <label class="font-weight-bold" for="confirm">Confirmation</label>
                            <v-text-field :type="togglePassword ? 'text' : 'password'" v-model="$v.password_confirmation.$model"
                                :error-messages="$v.password_confirmation.$errors[0]?.$message as string || ''" id="confirm"
                                variant="solo-filled" flat class="my-2" density="comfortable"
                                 single-line label="*******"
                                :append-inner-icon="togglePassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                                @click:append-inner="togglePassword = !togglePassword"></v-text-field>
                        </div>
                    </div>
                    <v-btn type="submit" class="rounded-lg mt-5 text-capitalize" append-icon="mdi-account" size="large"
                        color="success">Create account</v-btn>
                </v-form>
            </v-card>
        </client-only>
    </v-main>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { required, email, minLength, alpha, sameAs } from '@vuelidate/validators';
useHead({
    title: 'Create your account'
})
definePageMeta({
    middleware: ['guest'],
    layout: false,
    pageTransition: false,
})
const $user = useUserStore()
const togglePassword = ref(false)
const information = reactive({
    // "email": "emily.jones@example.com",
    // "name": "Emily Jones",
    // "password": "P@ssw0rd123",
    // "password_confirmation": "P@ssw0rd123"
    "email": "",
    "name": "",
    "password": "",
    "password_confirmation": ""
})
const $externalResults = ref({})

const rules = {
    name: {required},
    email: {required, email},
    password: {required, minLength: minLength(8)},
    password_confirmation: {required, sameAs: sameAs(computed(() => information.password))}
}


const submit = async () => {
    if(!await $v.value.$validate()) return 
    const {error,status} = await $user.register(information)
    
    if(error.value && error.value.data.errors){
        console.log('triggered');
        
        $externalResults.value = error.value.data.errors.reduce((container: any, error: any) => {
            if(!container[error.path]){
                container[error.path] = []
            }

            container[error.path].push(error.msg)

            return container
        },{}) 
    }

    const config = useRuntimeConfig()


    if(status.value == 'success'){
        // location.href = "http://localhost:3000/r/access/home"
        location.href = '/r/access/home'
        // location.href = "/r/access/home"
    }
}


const $v = useVuelidate(rules, information, {$externalResults})


function signInWithGoogle(){
    const config = useRuntimeConfig()
    // location.href = 'http://localhost:8000/auth/google'
    // location.href = '/auth/google'
    location.href = config.public.apiBase.replace('/api', '') + '/auth/google'
}
</script>

<style scoped></style>