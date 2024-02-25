<template>
    <v-main>
        <client-only>
            <v-container fluid class="pa-0 bg-primary ">
            <v-row class="ma-0">
                <v-col cols="12" md="8" lg="5" class="h-screen pa-0 mx-auto">
                    <div style="padding-inline: 50px;padding-top: 45px;">
                        <h1 class="d-flex align-center"
                            @click="$router.push({name: 'index'})"
                            style="font-family: 'Lato', sans-serif;font-weight: 900;">
                            <v-avatar class="rounded-0 mr-2">
                                <v-img src="/fast-forward.png" style="filter: invert(100%);"></v-img>
                            </v-avatar>
                            Efficiently
                        </h1>
                        <v-card class="rounded-xl pa-10 mt-5 border" elevation="3">
                            <h1>Login your account</h1>
                            <h5 class="font-weight-regular">
                                Gain secure access to your personalized account and start managing your tasks, goals, and
                                progress effortlessly.
                            </h5>
                            <v-form class="mt-5" @submit.prevent="submit">
                                <label class="font-weight-bold" for="email">Email address</label>
                                <v-text-field v-model="$v.email.$model" :error-messages="$v.email.$errors[0]?.$message as string || ''" id="email" variant="outlined" class="my-2" prepend-inner-icon="mdi-email-outline" single-line
                                    label="Enter your email address"></v-text-field>
                                <label class="font-weight-bold" for="password">Password</label>
                                <v-text-field :type="togglePassword ? 'text' : 'password'" v-model="$v.password.$model" :error-messages="$v.password.$errors[0]?.$message as string || ''" id="password" variant="outlined" class="my-2" prepend-inner-icon="mdi-lock-outline" single-line
                                    label="Enter your password" :append-inner-icon="togglePassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'" @click:append-inner="togglePassword = !togglePassword"></v-text-field>
                                <div class="d-flex align-center">
                                    <v-btn type="submit" class="rounded-lg text-capitalize" append-icon="mdi-login" size="large" color="primary">Login account</v-btn>
                                    <v-spacer></v-spacer>
                                    <span class="text-blue-darken-1">Forgot the password?</span>
                                </div>
                                <v-divider class="my-5"></v-divider>
                                <div class="d-flex flex-column align-center my-5">
                                    <!-- <div class="d-flex">
                                <span class="text-blue-darken-1">Forgot the password?</span>
                            </div> -->
                                    <span class="">Don't have an account?</span>
                                    <span class="text-decoration-underline text-blue-darken-2">Create Account</span>
                                </div>
                            </v-form>
                        </v-card>
                    </div>
                </v-col>
            </v-row>
        </v-container>
        </client-only>
    </v-main>
</template>

<script setup lang="ts">
useHead({
    title: 'Efficiently | Login your account'
})
definePageMeta({
    middleware: ['guest'],
    layout: false,
    pageTransition: false,
})
const togglePassword = ref(false)
const {$v, submit} = useAuth()
</script>

<style scoped></style>