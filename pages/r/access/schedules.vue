
<template>
    <div>
        <schedule-navigation-drawer :show-navigation="showRightNavigation"></schedule-navigation-drawer>
        <v-app-bar class="d-flex  align-center text-white" density="compact"
            style="background-color: rgba(0,0,0,.4);z-index: 50 !important;" flat absolute @vnode-mounted="appbar = true">
            <v-app-bar-nav-icon @click="showRightNavigation = !showRightNavigation"></v-app-bar-nav-icon>
            <div id="app-bar-schedule" class="d-flex align-center w-100 pr-2"></div>
        </v-app-bar>
        <v-main class="h-screen">
            <v-card class="w-100 h-100 rounded-0" style="background-color: rgba(0, 0, 0, 0.2) !important">
                <nuxt-page></nuxt-page>
                <v-dialog contained width="460" :model-value="!!$route.query.delete" no-click-animation persistent>
                    <schedule-delete-card></schedule-delete-card>
                </v-dialog>
                <v-overlay class="d-flex justify-end" contained width="400" height="100%" :model-value="!!$route.query.edit" no-click-animation persistent transition="slide-x-reverse-transition" @click:outside="$router.push({query: {}})">
                    <v-card class="h-100 rounded-0">
                        <schedule-edit-container></schedule-edit-container>
                    </v-card>
                </v-overlay>
                <v-overlay class="d-flex justify-end" contained width="400" height="100%" :model-value="!!$route.query.date" no-click-animation persistent transition="slide-x-reverse-transition" @click:outside="$router.push({query: {}})">
                    <v-card class="h-100 rounded-0">
                        <schedule-create-container></schedule-create-container>
                    </v-card>
                </v-overlay>
            </v-card>
        </v-main>
    </div>
</template>

<script setup lang="ts">
useHead({
    title: 'Schedules'
})
definePageMeta({
    layout: 'authenticated',
    middleware: ['auth'],
})
const appbar = ref(false)
provide('appbar', appbar)
const showRightNavigation = ref(true)
const $schedule = useScheduleStore()
const { schedule, schedules } = storeToRefs($schedule)
const route = useRoute()

$schedule.getAll().then(() => {
    if (route.query.edit) {
        const find = schedules.value.find(item => item._id == route.query.edit)
        if (find) {
            schedule.value = find
        }
    }
})


</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    position: static;
    transition: opacity .25s linear, transform .55s ease;
}

.slide-enter-from,
.slide-leave-to {
    position: absolute;

    opacity: 0;
    transform: translateX(10%);
}
</style>