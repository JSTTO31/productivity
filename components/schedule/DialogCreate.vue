<template>
    <v-dialog :model-value="showDialog" @click:outside="emits('update:showDialog', false)" width="700" :contained="true"
        scrim="primary">
        <v-form @submit.prevent="submit">
            <v-card class="rounded-lg d-flex flex-column" height="500">
                <div class="d-flex ">
                    <v-tabs v-model="selectedWindow" grow>
                        <v-tab class="text-capitalize" prepend-icon="mdi-information-outline">General</v-tab>
                        <v-tab class="text-capitalize" prepend-icon="mdi-calendar">Calendar</v-tab>
                        <v-tab class="text-capitalize" prepend-icon="mdi-account-multiple-outline">Attendees</v-tab>
                        <v-tab class="text-capitalize" prepend-icon="mdi-cog-outline">Settings</v-tab>
                    </v-tabs>
                </div>
                <v-divider></v-divider>
                <v-card-text v-if="selectedWindow == 0" class="pt-8">
                    <div class="d-flex align-center mb-2">
                        <v-avatar color="primary" class="mr-5">
                            <v-icon>mdi-account</v-icon>
                        </v-avatar>
                        <input v-model="$v.title.$model" type="text"
                            :class="$v.title.$errors.length > 0 ? 'text-error' : ''" class="w-100 font-weight-bold"
                            style="outline: none;font-size: 20px;font-family: 'Lato', sans-serif;"
                            placeholder="What's the Agenda, Champ?">
                    </div>
                    <span class="text-caption text-error pr-2">{{ $v.title.$errors[0]?.$message || '' }}</span>

                    <div style="gap: 5px;">
                        <h4>Location</h4>
                        <v-text-field v-model="$v.location.$model" class="mt-2" single-line variant="solo-filled" flat
                            density="compact"
                            label="Example - Conference room A, Conference room B, Online meeting etc.."></v-text-field>
                    </div>
                    <div class="" style="gap: 5px;">
                        <h4>Description</h4>
                        <v-textarea v-model="$v.description.$model" rows="3" class="mt-2" single-line variant="solo-filled"
                            flat density="comfortable" label="What is the details?"></v-textarea>
                    </div>
                </v-card-text>
                <v-card-text v-if="selectedWindow == 1" class="pt-2 d-flex">
                    <div class="w-100">
                        <label for="" class="d-flex align-center w-100 mb-2">
                            <h4>Pick your date</h4>
                            <v-spacer></v-spacer>
                            <span class="ml-10">
                                <v-switch label="Whole day" hide-details density="comfortable" color="primary"></v-switch>
                            </span>
                        </label>
                        <div class="d-flex w-100" style="gap: 15px;">
                            <date-time v-model:date-time="$v.startAt.$model"></date-time>
                            <date-time v-model:date-time="$v.endAt.$model"></date-time>

                        </div>
                        <h4 class="mt-5">Recurrence</h4>
                        <div class="d-flex" style="gap: 5px;">
                            <v-btn :color="calendar.recurrence == 'none' ? 'primary' : ''"
                                @click="$v.recurrence.$model = 'none'"
                                :variant="calendar.recurrence == 'none' ? 'flat' : 'text'"
                                class="text-capitalize border mt-2">Don't repeat</v-btn>
                            <v-btn :color="calendar.recurrence == 'daily' ? 'primary' : ''"
                                @click="$v.recurrence.$model = 'daily'"
                                :variant="calendar.recurrence == 'daily' ? 'flat' : 'text'"
                                class="text-capitalize border mt-2">Daily</v-btn>
                            <v-btn :color="calendar.recurrence == 'weekly' ? 'primary' : ''"
                                @click="$v.recurrence.$model = 'weekly'"
                                :variant="calendar.recurrence == 'weekly' ? 'flat' : 'text'"
                                class="text-capitalize border mt-2">Weekly</v-btn>

                            <v-btn :color="calendar.recurrence == 'monthly' ? 'primary' : ''"
                                @click="$v.recurrence.$model = 'monthly'"
                                :variant="calendar.recurrence == 'monthly' ? 'flat' : 'text'"
                                class="text-capitalize border mt-2">Monthly</v-btn>
                        </div>
                        <schedule-tag-field v-model:tags="$v.tags.$model"></schedule-tag-field>
                    </div>
                </v-card-text>
                <v-card-text class="pt-5" v-if="selectedWindow == 2">
                    <div class="d-flex flex-column mb-2">
                        <h4 for="" class="mr-5 mb-5"><v-icon class="mr-3">mdi-account-tie</v-icon>Assignee</h4>
                        <div class="d-flex align-center" style="gap: 10px;">
                            <v-avatar color="primary" size="55">
                                <v-icon>mdi-account-tie</v-icon>
                            </v-avatar>
                            <v-card @click="" style="border: 2px dashed rgba(var(--v-theme-primary));" color="primary"
                                variant="tonal" class="d-flex align-center justify-center rounded-circle" width="55"
                                height="55">
                                <v-icon>mdi-account-tie</v-icon>
                            </v-card>
                        </div>
                    </div>
                    <div class="d-flex flex-column mb-2 mt-10">
                        <h4 for="" class="mr-5 mb-5"><v-icon class="mr-3">mdi-account-group</v-icon>Attendees</h4>
                        <div class="d-flex align-center" style="gap: 10px;">
                            <v-avatar color="primary" size="55">
                                <v-icon>mdi-account-tie</v-icon>
                            </v-avatar>
                            <v-avatar color="green" size="55">
                                <v-icon>mdi-account</v-icon>
                            </v-avatar>
                            <v-card @click="" style="border: 2px dashed rgba(var(--v-theme-primary));" color="primary"
                                variant="tonal" class="d-flex align-center justify-center rounded-circle" width="55"
                                height="55">
                                <v-icon>mdi-account</v-icon>
                            </v-card>
                        </div>
                    </div>
                </v-card-text>
                <v-card-text class="pt-5" v-if="selectedWindow == 3">
                    <div class="d-flex flex-column mb-2">
                        <h4 for="" class="mr-5"><v-icon class="mr-3">mdi-eye-outline</v-icon>Visibility</h4>
                        <div class="d-flex mt-5" style="gap: 10px;">
                            <v-btn @click="$v.visibility.$model = 'private'" class="text-capitalize"
                                prepend-icon="mdi-account-lock" :color="calendar.visibility == 'private' ? 'primary' : ''"
                                :variant="calendar.visibility == 'private' ? 'flat' : 'tonal'">private</v-btn>
                            <v-btn @click="$v.visibility.$model = 'public'" class="text-capitalize"
                                prepend-icon="mdi-account-group" :color="calendar.visibility == 'public' ? 'primary' : ''"
                                :variant="calendar.visibility == 'public' ? 'flat' : 'tonal'">public</v-btn>
                        </div>
                    </div>
                    <div class="pt-5  d-flex flex-column mb-2">
                        <h4 for="" class="mr-5">
                            <v-icon class="mr-3">mdi-bell</v-icon>
                            Alert
                        </h4>
                        <div class="d-flex mt-5 flex-wrap" style="gap: 10px;">
                            <v-btn @click="$v.reminder.$model = option"
                                :color="calendar.reminder == option ? 'primary' : ''"
                                :variant="calendar.reminder == option ? 'flat' : 'tonal'" class="text-capitalize"
                                v-for="option in alertOptions" :key="option">{{ option }}</v-btn>
                            <v-btn class="text-capitalize" variant="tonal" append-icon="mdi-plus">Customize</v-btn>
                        </div>
                    </div>
                    <div class="pt-5  d-flex flex-column mb-2">
                        <h4 for="" class="mr-5">
                            <v-icon class="mr-3">mdi-pin</v-icon>
                            Pinned
                        </h4>
                        <div class="d-flex" style="gap: 10px;">
                            <v-switch hide-details v-model="$v.pinned.$model" inset color="primary"></v-switch>
                        </div>
                    </div>
                </v-card-text>
                <v-spacer></v-spacer>
                <v-card-actions class="px-6 pb-5">
                    <v-btn variant="flat" rounded="xl" prepend-icon="mdi-calendar-check" class="text-capitalize px-5"
                        color="primary" type="submit">Save
                        Schedule</v-btn>
                    <v-btn variant="text" rounded="xl" class="text-capitalize mr-3 px-3"
                        prepend-icon="mdi-reload">Clear</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>

<script setup lang="ts">
import { required, requiredIf, helpers } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { useScheduleStore } from '~/stores/schedule';
const $schedule = useScheduleStore()
const selectedWindow = ref(0)
const props = defineProps(['showDialog'])
const emits = defineEmits(['update:showDialog'])
const calendar = reactive({
    "title": "weekly review",
    "description": "evaluate project progress and set goals",
    "location": "office",
    "pinned": false,
    "attendees": [],
    "recurrence": "weekly",
    "tags": [],
    "reminder": "1 day before",
    "visibility": "public",
    "startAt": new Date("2024-02-28T16:00:00.000Z"),
    "endAt": new Date("2024-02-28T17:00:00.000Z"),
    "wholeDay": false
})

const rules = {
    title: { required },
    description: {},
    location: {},
    pinned: {},
    attendees: {},
    recurrence: {},
    tags: {},
    reminder: {},
    visibility: {},
    startAt: { required },
    endAt: { requiredIf: requiredIf(!calendar.wholeDay) },
}

const $v = useVuelidate(rules, calendar)

const alertOptions = [
    'none',
    '15 minutes before',
    '25 minutes before',
    '1 hour before',
    '1 day before',
]


const submit = async () => {
    if (!await $v.value.$validate()) {
        return
    }

    $schedule.create(calendar).then(() => {
        setTimeout(() => {
            $v.value.$reset()
            calendar.title = '',
            calendar.description = '',
            calendar.location = '',
            calendar.pinned = false,
            calendar.attendees = [],
            calendar.recurrence = 'none',
            calendar.tags = [],
            calendar.reminder = 'none',
            calendar.visibility = 'private',
            calendar.startAt = new Date(),
            calendar.endAt = new Date(),
            calendar.wholeDay = false
        }, 100);
        emits('update:showDialog', false)
    })
}
</script>

<style scoped></style>