<template>
    <tr>
        <td colspan="2" class="px-3 py-2">
            <v-menu location="end center">
                <template #activator="{ props, isActive }">
                    <v-badge icon="mdi-pin" color="primary" size="50" :model-value="schedule.pinned" bordered
                        rounded="lg" class="w-100">
                        <v-card @click="" class="w-100 pa-3 bg-surface"
                            style="position: relative;overflow: visible;cursor: pointer;" v-bind="props"
                            variant="elevated" flat>
                            <v-icon v-if="isActive" color="surface"
                                style="position: absolute;right: -21px;top: 50%;transform: rotate(30deg) translateY(-50%);">mdi-triangle</v-icon>
                            <h4 class="text-capitalize mb-3 font-weight-medium">
                                {{ schedule.title }}
                            </h4>
                            <div
                                class="my-2 text-grey-darken-1 d-flex flex-wrap text-caption justify-space-between font-weight-regular ">
                                <div class="d-flex align-center">
                                    <v-icon class="mr-2">mdi-clock-outline</v-icon>
                                    {{ timeDisplay }}
                                </div>
                            </div>
                        </v-card>
                    </v-badge>
                </template>
                <v-card class="mx-5 pa-2" flat elevation="0" width="450">
                    <v-card-text>
                        <div class="d-flex align-center">
                            <v-btn prepend-icon="mdi-check-circle-outline" size="small" flat color="success">Completed</v-btn>
                            <v-spacer></v-spacer>
                            <v-icon class="text-grey-darken-1 ml-2">mdi-pencil</v-icon>
                            <v-icon class="text-grey-darken-1 ml-2">mdi-trash-can</v-icon>
                            <v-icon class="text-grey-darken-1 ml-2">mdi-close</v-icon>
                        </div>
                        <v-divider class="my-3"></v-divider>
                        <div class="d-flex mb-4" style="gap: 5px;" v-if="schedule.tags.length > 0">
                            <v-card width="30" height="10" :color="tag.color" density="compact"
                                v-for="tag in schedule.tags" :key="tag._id"></v-card>
                        </div>
                        <v-card class="mb-4 rounded-lg border" height="150" flat style="overflow-y: hidden;">
                            <nuxt-img src="https://source.unsplash.com/random/500x250/?collaboration"
                                class="w-100"></nuxt-img>
                        </v-card>
                        <h2 class="text-capitalize">
                            {{ schedule.title }}
                        </h2>
                        <div
                            class="my-2 text-grey-darken-1 d-flex justify-space-between font-weight-regular text-subtitle-2">
                            <div class="d-flex align-center">
                                <v-icon class="mr-2">mdi-clock-outline</v-icon>
                                {{ timeDisplay }}
                            </div>
                            <div class="d-flex align-center">
                                <v-icon class="mr-2">mdi-calendar</v-icon>
                                {{ new Date(schedule.startAt).toDateString() }}
                            </div>
                        </div>
                        <div>
                            <v-avatar color="primary">
                                JS
                            </v-avatar>
                            <v-avatar color="blue" class="ml-n5">
                                CC
                            </v-avatar>
                            <v-avatar color="red" class="ml-n5">
                                MJ
                            </v-avatar>
                        </div>
                    </v-card-text>
                </v-card>
            </v-menu>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</template>

<script setup lang="ts">
const props = defineProps<{ schedule: schedule }>()
const timeDisplay = computed(() => {
    let startTime = new Date(props.schedule.startAt).toLocaleTimeString([], { minute: '2-digit', hour: '2-digit' })
    let endTime = new Date(props.schedule.endAt).toLocaleTimeString([], { minute: '2-digit', hour: '2-digit' })
    if (startTime != endTime) {
        startTime += ' - ' + endTime
    }

    return startTime
})
</script>

<style scoped>
tr td {
    /* table-layout: auto;
    border-collapse: collapse !important; */
    border: 2px solid #ffffff23;

}

tr td:last-child,
#schedule-table th:last-child {
    border-right: none;

}

tr td:first-child,
#schedule-table th:first-child {
    border-left: none;

}

tr:last-child td {
    border-top: none;

}

tr:nth-child(-n+2) td {
    border-bottom: none;

}
</style>