<template>
    <v-navigation-drawer location="right" width="300" floating color="transparent">
        <div class="pa-5 pl-0 h-100">
            <v-card class="h-100 rounded-lg" elevation="5">
                <v-list class="pa-2 pt-2">
                    <v-list-item class="font-weight-medium px-2" append-icon="mdi-chevron-down">Draft</v-list-item>
                    <v-list-item class="font-weight-light px-2 text-center">No Schedule</v-list-item>

                    <v-list-item class="font-weight-medium px-2" append-icon="mdi-chevron-down">Calendar Status</v-list-item>
                    <v-list-item class="my-2 pa-2" rounded="lg">
                        <template #prepend>
                            <v-icon>mdi-square</v-icon>
                        </template>
                        Personal
                    </v-list-item>
                    <v-list-item class="my-2 pa-2" rounded="lg">
                        <template #prepend>
                            <v-icon color="black">mdi-square</v-icon>
                        </template>
                        Work
                    </v-list-item>
                    <v-list-item class="my-2 pa-2" rounded="lg">
                        <template #prepend>
                            <v-icon color="blue">mdi-square</v-icon>
                        </template>
                        Study
                    </v-list-item>
                    <v-list-item class="my-2 pa-2" rounded="lg">
                        <template #prepend>
                            <v-icon color="secondary">mdi-square</v-icon>
                        </template>
                        Examination
                    </v-list-item>
                    <v-list-item class="my-2 pa-2" rounded="lg">
                        <template #prepend>
                            <v-icon color="red">mdi-square</v-icon>
                        </template>
                        School schedule
                    </v-list-item>
                    <v-list-item class="my-2 pa-2" rounded="lg">
                        <template #prepend>
                            <v-icon>mdi-plus</v-icon>
                        </template>
                        Add Status
                    </v-list-item>
                </v-list>
            </v-card>
        </div>
    </v-navigation-drawer>
    <v-app-bar class="pt-3 px-5 d-flex align-center" density="compact" height="95" color="transparent" flat>
        <v-card class="w-100 px-4 py-5 rounded-lg d-flex align-center" elevation="5" height="65">
            <v-tabs density="compact">
                <v-tab class="text-capitalize" size="small">Dashboard</v-tab>
                <v-tab class="text-capitalize" size="small">Schedules</v-tab>
                <v-tab class="text-capitalize" size="small">Timeline</v-tab>
            </v-tabs>
            <v-spacer></v-spacer>
            <v-btn class="text-capitalize rounded-lg ml-4" color="primary" append-icon="mdi-plus" variant="elevated"
                size="small">Create</v-btn>
            <v-divider vertical class="mx-2"></v-divider>
            <v-btn class="rounded-lg" icon="mdi-menu" size="small">

            </v-btn>
        </v-card>
    </v-app-bar>
    <v-main>
        <div class="pa-5">
            <nuxt-page></nuxt-page>
        </div>
    </v-main>
</template>

<script setup lang="ts">

</script>

<style scoped></style>