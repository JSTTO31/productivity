<template>
    <v-container fluid class="pa-0">
        <v-card class="rounded-lg pa-10 bg-transparent pt-10 pb-0" elevation="5">
            <div class="d-flex align-center">
                <v-btn prepend-icon="mdi-calendar" size="x-large" class="mb-5 text-capitalize" append-icon="mdi-chevron-down" variant="tonal">{{ new Date().toDateString() }}</v-btn>
                <v-spacer></v-spacer>
                <v-btn prepend-icon="mdi-filter" class="text-capitalize" variant="outlined" append-icon="mdi-chevron-down">Filter</v-btn>
            </div>
            <div class="d-flex justify-space-between">
                <div>
                    <h5 class="font-weight-regular">Report time to spend</h5>
                    <h1 class="font-weight-medium">356H 30m</h1>
                </div>
                <div>
                    <h5 class="font-weight-regular">Time balance</h5>
                    <h1 class="font-weight-medium">56H 10m</h1>

                </div>
                <div>
                    <h5 class="font-weight-regular">Spend time</h5>
                    <h1 class="font-weight-medium">6H 14m</h1>

                </div>
            </div>
            <div class="d-flex my-5" style="gap: 5px;">
                <v-card width="55%" height="25" color="blue"></v-card>
                <v-card width="15%" height="25" color="grey"></v-card>
                <v-card width="10%" height="25" color="yellow"></v-card>
                <v-card width="20%" height="25" color="red"></v-card>
            </div>
            <v-tabs density="compact" class="mt-5">
                <v-tab v-for="n in 31" size="small" class="text-capitalize"  :key="n">Day {{ n }}</v-tab>
            </v-tabs>
        </v-card>
        <v-table>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus ipsam recusandae, debitis labore explicabo sequi vitae, ratione, quo sed repellendus quia. Maiores commodi, nulla aliquam quis ducimus dolor quaerat maxime!
        </v-table>
    </v-container>
</template>

<script setup lang="ts">

</script>

<style scoped></style>