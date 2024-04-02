<template>
    <v-menu location="end" v-model="menu" :close-on-content-click="false" persistent no-click-animation
        key="parent">
        <template #activator="{ props }">
            <v-card v-bind="props" flat class="pa-0 py-3  align-start h-100 rounded" variant="flat"
                :color="schedule.tags[0]?.color || ''">
                <v-card-title class="text-subtitle-1 mt-n2">
                    {{ schedule.title }}
                </v-card-title>
                <v-card-text>
                    <div class="d-flex align-center  text-lowercase" style="opacity: .8">
                        <v-icon size="25" class="mr-4">mdi-clock</v-icon>
                        {{ time }}
                    </div>
                    <div class="d-flex align-center text-capitalize mt-3" style="opacity: .8">
                        <v-icon size="25" class="mr-4">mdi-account-tie</v-icon>
                        {{ schedule.user.name }}
                    </div>
                    <div class="d-flex align-center text-capitalize font-weight-medium mt-3" style="opacity: .8">
                        <v-chip variant="flat" class="rounded text-capitalize" prepend-icon="mdi-calendar-check" color="success"
                            v-if="status == 'finished'">
                            {{ status }}
                        </v-chip>
                        <v-chip variant="flat" class="rounded text-capitalize" prepend-icon="mdi-calendar-refresh" color="secondary"
                            v-else-if="status == 'ongoing'">
                            {{ status }}
                        </v-chip>
                        <v-chip variant="flat" class="rounded text-capitalize" prepend-icon="mdi-calendar-arrow-right" color="info"
                            v-else-if="status == 'upcoming'">
                            {{ status }}
                        </v-chip>
                        <v-chip variant="flat" class="rounded text-capitalize" prepend-icon="mdi-calendar-alert" color="error" v-else>
                            {{ status }}
                        </v-chip>
                    </div>
                </v-card-text>
                <!-- <v-card-text class="d-flex pb-0">
                <v-btn size="small" class="text-capitalize rounded mr-2" variant="outlined" prepend-icon="mdi-information" flat>Details</v-btn>
                <v-btn size="small" class="text-capitalize rounded" prepend-icon="mdi-flag" variant="tonal" flat @click="finished">Mark as finished</v-btn>
            </v-card-text> -->
                <!-- <v-chip size="x-small" prepend-icon="mdi-clock-time-nine-outline" style="position: absolute;top: 10px;right: 10px;" v-if="ongoing">Ongoing</v-chip>
            <v-chip size="x-small" prepend-icon="mdi-clock-outline" style="position: absolute;top: 10px;right: 10px;" v-else>{{ timeAgo }}</v-chip> -->
            </v-card>
        </template>
        <v-card width="345" class="mx-2 pa-1">
            <div v-if="showEdit">
                <v-card-title class=" d-flex align-center" style="font-size: 18px">
                    Edit Schedule
                    <v-spacer></v-spacer>
                    <v-btn icon="mdi-close" size="small" flat @click="menu = false"></v-btn>
                </v-card-title>
                <v-card-text>
                    <schedule-edit-schedule-card :schedule="schedule"
                        v-model:menu="menu"></schedule-edit-schedule-card>
                </v-card-text>
            </div>
            <div v-else>
                <v-card-title class="d-flex" style="font-size: 18px">
                    <v-icon class="mr-3 mt-1" :color="schedule.tags[0]?.color || 'grey'"
                        @click="">mdi-square-rounded</v-icon>
                    <div class="d-flex flex-column text-wrap text-capitalize">
                        {{ schedule.title }}
                        <v-card-subtitle class="px-0 text-caption">{{ new Date(schedule.startAt).toDateString()
                            }}</v-card-subtitle>
                    </div>
                    <v-spacer></v-spacer>
                    <v-menu persistent :no-click-animation="true">
                        <template #activator="{ props }">
                            <v-btn icon="mdi-dots-vertical" v-bind="props" flat size="small"></v-btn>
                        </template>
                        <v-list class="rounded">
                            <v-list-item @click="showEdit = true" prepend-icon="mdi-pencil-outline"
                                density="compact" class="text-capitalize text-caption">Edit</v-list-item>
                            <v-list-item @click="finished" prepend-icon="mdi-flag" density="compact"
                                class="text-capitalize text-caption" v-if="!schedule.finished">Mark as
                                finished</v-list-item>
                            <v-list-item v-else @click="finished" prepend-icon="mdi-flag-remove" density="compact"
                                class="text-capitalize text-caption">Mark as unfinished</v-list-item>
                            <v-list-item @click="menu = false" prepend-icon="mdi-close" density="compact"
                                class="text-capitalize text-caption">Close</v-list-item>
                            <v-list-item @click="removeSchedule" prepend-icon="mdi-trash-can-outline"
                                density="compact"
                                class="text-capitalize text-caption text-error">Delete</v-list-item>
                        </v-list>
                    </v-menu>
                </v-card-title>
                <v-card-text>
                    <div class="d-flex align-center  font-weight-medium text-lowercase" style="opacity: .8">
                        <v-icon size="25" class="mr-4">mdi-clock</v-icon>
                        {{ time }}
                    </div>
                    <div v-if="schedule.location"
                        class="my-3 d-flex align-center  font-weight-medium text-capitalize" style="opacity: .8">
                        <v-icon size="25" class="mr-4">mdi-map-marker</v-icon>
                        {{ schedule.location }}
                    </div>
                    <div class="d-flex align-center text-capitalize font-weight-medium mt-3" style="opacity: .8">
                        <v-icon size="25" class="mr-4">mdi-account-tie</v-icon>
                        {{ schedule.user.name }}
                    </div>
                    <div class="d-flex align-center text-capitalize font-weight-medium mt-3" style="opacity: .8">
                        <v-chip class="text-capitalize" prepend-icon="mdi-calendar-check" color="success"
                            v-if="status == 'finished'">
                            {{ status }}
                        </v-chip>
                        <v-chip class="text-capitalize" prepend-icon="mdi-calendar-refresh" color="secondary"
                            v-else-if="status == 'ongoing'">
                            {{ status }}
                        </v-chip>
                        <v-chip class="text-capitalize" prepend-icon="mdi-calendar-arrow-right" color="info"
                            v-else-if="status == 'upcoming'">
                            {{ status }}
                        </v-chip>
                        <v-chip class="text-capitalize" prepend-icon="mdi-calendar-alert" color="error" v-else>
                            {{ status }}
                        </v-chip>
                    </div>
                    <div class="d-flex py-5 pb-0 flex-wrap" style="gap: 5px" v-if="schedule.tags.length > 0">
                        <v-chip variant="flat" class="text-capitalize rounded" v-for="tag in schedule.tags"
                            :color="tag.color">{{ tag.label }}</v-chip>
                    </div>
                    <v-btn v-if="schedule.link" @click="goToMeet" block variant="flat" class="text-capitalize mt-2"
                        prepend-icon="mdi-video-outline" color="blue">Video Meeting</v-btn>
                    <!-- <div class="py-2">
                    
                    <v-btn block variant="outlined" color="success" class="text-capitalize mb-2" prepend-icon="mdi-flag-outline">Finished Schedule</v-btn>
                    <div class="d-flex pr-3" style="gap: 10px">
                        <v-btn variant="flat" color="blue" @click="showEdit = true" class="text-capitalize w-50"  prepend-icon="mdi-pencil-outline">Edit</v-btn>
                        <v-btn  variant="outlined" class="text-capitalize w-50"  prepend-icon="mdi-close" @click="menu=false">Close</v-btn>
                    </div>
                </div> -->
                </v-card-text>
            </div>
        </v-card>
    </v-menu>
</template>

<script setup lang="ts">
const $schedule = useScheduleStore()
const props = defineProps<{ schedule: ScheduleData }>()
const time = computed(() => new Date(props.schedule.startAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' - ' + new Date(props.schedule.endAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
const showEdit = ref(false)
const status = computed(() => {
    const now = new Date()
    const startAt = new Date(props.schedule.startAt)
    const endAt = new Date(props.schedule.endAt)
    return props.schedule.finished ? 'finished' : now > startAt && now < endAt ? 'ongoing' : now < startAt ? 'upcoming' : 'not finished'
})
const menu = ref(false)
watch(menu, () => {
    if (!menu.value) showEdit.value = false
})

function finished() {
    $schedule.toggleFinished(props.schedule._id)
}

function goToMeet() {
    window.open(props.schedule.link, '_blank')
}

function removeSchedule() {
    $schedule.destroy(props.schedule._id).then(() => {
        menu.value = false
    })
}


</script>

<style scoped></style>