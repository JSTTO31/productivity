<template>
    <v-container class="d-flex align-center h-100">
        <v-row>
            <v-col cols="7" class="d-flex align-center">
                <div>
                    <h1 style="font-family: 'Lato', sans-serif;" class="text-h3 font-weight-black">Welcome Aboard! Let's Get
                        Started on Your Journey with <span class="text-primary">Efficiently</span></h1>
                    <h4 class="font-weight-regular mt-3">Create Your Study Room and Seamlessly Manage Tasks and Scheduling!
                    </h4>
                    <v-form class="mt-5 font-weight-bold">
                        <label for="room-text">Your room name</label>
                        <v-text-field single-line class="mt-2" id="room-text" label="Enter your room name."
                            variant="outlined"></v-text-field>
                        <v-btn color="primary" class="font-weight-bold text-capitalize" append-icon="mdi-home">Create
                            room</v-btn>
                    </v-form>
                </div>
            </v-col>
            <v-col cols="5" class="pl-15">
                <v-card height="550" color="grey-lighten-1" class="rounded-xl my-auto d-flex align-center justify-center"
                    style="background-image: url('https://source.unsplash.com/random/450x550/?journey,people'); background-size: cover;background-repeat: no-repeat;">
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
definePageMeta({
    layout: false,
})
const { name } = useTheme()
</script>

<style scoped></style>