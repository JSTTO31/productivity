<template>
    <v-main>
        <v-card class="h-100 rounded-0" color="transparent">
            <v-container style="height: 610px;">
                <v-card class="pa-5 rounded-lg d-flex align-center" flat>
                    <h3>Performance Dashboard</h3>
                    <v-spacer></v-spacer>
                    <span class="text-capitalize text-grey-darken-1">
                        <v-icon class="mr-2">mdi-calendar</v-icon>
                    <span>
                        Mar 1, 2024 - Mar 6, 2024
                    </span>
                    </span>
                </v-card>
                <v-row class="mt-2 h-100">
                    <v-col class="d-flex flex-column" style="gap: 15px;">
                        <v-card class="d-flex h-25 rounded-lg pa-5">
                            <v-avatar size="100" color="yellow-lighten-4 text-h4">
                                JS
                            </v-avatar>
                            <div class="w-100 ml-10 pr-5">
                            <h2 class="font-weight-medium">Joshua Sotto</h2>
                            <h6 class="font-weight-regular">Student Web Developer</h6>
                            <v-progress-linear height="20" :model-value="25" color="warning"  class="rounded-lg mt-5"></v-progress-linear>
                            </div>
                        </v-card>
                        <v-card class="d-flex h-75 rounded-lg pa-5">
                           <v-list class="w-100">
                                <h4 class="mb-5 d-flex align-center"><v-icon class="mr-3" size="20">mdi-account-group</v-icon>Your members</h4>
                                <v-list-item class="py-3 rounded-lg mb-3" variant="tonal" v-for="member in members.slice(1)" :prepend-avatar="'https://source.unsplash.com/random/55x55/?person&' + member.first_name">
                                    <span class="font-weight-medium">{{ member.first_name + ' ' + member.last_name}}</span>
                                    <v-progress-linear class="mt-2 rounded-lg" color="primary" height="8" :model-value="Math.random() * 100"></v-progress-linear>
                                </v-list-item>
                           </v-list>
                        </v-card>
                    </v-col>
                    <v-col>
                        <v-card class="pa-5 h-100 rounded-lg">
                            <v-list>
                                <h3 class="mb-5">Task Progress</h3>
                                <div class="mb-5 font-weight-regular text-grey-darken-1 " v-for="task in tasks" :key="task.task_name">
                                    {{ task.task_name }}
                                    <v-progress-linear class="mt-2" color="secondary" height="8" :model-value="Math.random() * 100"></v-progress-linear>
                                </div>
                            </v-list>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-main>
</template>

<script setup lang="ts">
useHead({
    title: 'Statistics',
})
definePageMeta({
    layout: "authenticated"
})
const endDate = new Date()
const startDate = new Date()
startDate.setDate(-startDate.getDate())

const sections = useSectionsObject
const section1 = sections[0]
const section2 = sections[1]
const tasks = [...section1.tasks, ...section2.tasks]

const members = [
    {
        "first_name": "John",
        "last_name": "Smith"
    },
    {
        "first_name": "Emily",
        "last_name": "Johnson"
    },
    {
        "first_name": "Michael",
        "last_name": "Williams"
    },
    {
        "first_name": "Sarah",
        "last_name": "Brown"
    },
    {
        "first_name": "David",
        "last_name": "Jones"
    }
]
</script>

<style scoped>

</style>