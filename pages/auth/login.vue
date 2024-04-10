<template>
    <v-main class="d-flex align-center justify-center ">
        <client-only>
            <v-card flat class="rounded-xl px-5 d-flex mt-n15 flex-column px-10" color="transparent" width="550">
                <v-avatar @click="$router.push({ name: 'index' })" class="mx-auto" size="75"
                    style="transform: rotate(25deg);cursor: pointer;">
                    <v-icon size="75">mdi-lightning-bolt</v-icon>
                </v-avatar>
                <h1 class="text-center font-weight-bold" style="font-family: 'Roboto', cursive !important;">Login to
                    your account</h1>
                <h3 class="font-weight-regular text-center mt-2">
                    Don't have an account? <span class="text-blue-darken-2" style="cursor: pointer;" @click="$router.push({name: 'auth-register'})">Sign up</span>
                </h3>
                <v-card class="d-flex justify-center mt-10 align-center pa-3" @click="signInWithGoogle" variant="outlined">
                    <v-avatar size="30">
                        <v-img src="/icons/google.png"></v-img>
                    </v-avatar>
                    <h3 class="font-weight-medium ml-5">Sign in with google</h3>
                </v-card>
                <v-form @submit.prevent="submit" v-if="showTextField">
                    <div class="d-flex align-center my-5">
                        <v-divider></v-divider>
                        <span class="w-100 text-center">with email address</span>
                        <v-divider></v-divider>
                    </div>
                    <label class="font-weight-bold" for="email">Email address</label>   
                    <v-text-field v-model="$v.email.$model"
                        :error-messages="$v.email.$errors[0]?.$message as string || ''" id="email" variant="solo-filled"
                        flat class="my-2" prepend-inner-icon="mdi-email-outline" single-line
                        label="Enter your email address"></v-text-field>
                    <label class="font-weight-bold" for="password">Password</label>
                    <v-text-field :type="togglePassword ? 'text' : 'password'" v-model="$v.password.$model"
                        :error-messages="$v.password.$errors[0]?.$message as string || ''" id="password"
                        variant="solo-filled" flat class="my-2" prepend-inner-icon="mdi-lock-outline" single-line
                        label="Enter your password"
                        :append-inner-icon="togglePassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                        @click:append-inner="togglePassword = !togglePassword"></v-text-field>
                    <div class="d-flex align-center mt-n3">

                        <v-spacer></v-spacer>
                        <span class="text-blue-darken-1">Forgot the password?</span>
                    </div>
                    <v-btn type="submit" class="rounded-lg mt-5 text-capitalize" append-icon="mdi-login" size="large"
                        color="primary">Login account</v-btn>
                </v-form>
                <div v-else>
                    <v-card class="d-flex justify-center mt-5 align-center pa-3" @click="showTextField = true" color="grey-lighten-2"
                        variant="flat">
                        <h3 class="font-weight-medium ml-5" >Continue with email</h3>
                    </v-card>
                </div>
            </v-card>
        </client-only>
    </v-main>
</template>

<script setup lang="ts">
useHead({
    title: 'Login your account'
})
definePageMeta({
    middleware: ['guest'],
    layout: false,
    pageTransition: false,
})
const togglePassword = ref(false)
const { $v, submit } = useAuth()
const showTextField = ref(false)


function signInWithGoogle(){
    const config = useRuntimeConfig()
    // location.href = 'http://localhost:8000/auth/google'
    // location.href = '/auth/google'
    location.href = config.public.apiBase + '/auth/google'
}
</script>

<style scoped></style>