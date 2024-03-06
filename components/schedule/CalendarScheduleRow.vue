<template>
    <tr :id="schedule._id">
        <td :colspan="spanNumber" class="px-1 py-2">
            <v-menu location="end center" :close-on-content-click="false" content-class="my-menu">
                <template #activator="{ props, isActive }">
                    <v-badge icon="mdi-pin" color="primary" size="50" :model-value="schedule.pinned" bordered
                        rounded="lg" class="w-100">
                        <v-card  id="activator" class="w-100 pa-3 rounded-lg bg-surface"
                            style="position: relative;overflow: visible;cursor: pointer;"
                            variant="elevated" v-bind="props">
                            <v-icon id="arrow" v-if="isActive" color="surface"
                                style="position: absolute;right: -21px;top: 50%;transform: rotate(30deg) translateY(-50%);z-index: 1000;">mdi-triangle</v-icon>
                            <h4 class="text-capitalize font-weight-regular">
                                {{ schedule.title.length >= 15 && spanNumber == 1 ? schedule.title.substring(0, 15) + '...' : schedule.title }} 
                            </h4>
                            <div
                                class=" mt-2  d-flex flex-wrap text-caption justify-space-between font-weight-regular ">
                                <div class="d-flex align-center">
                                    {{ timeDisplay }}
                                </div>
                            </div>
                        </v-card>
                    </v-badge>
                </template>
                <v-card id="content" class="mx-5 pa-2 pt-0 rounded-lg" flat elevation="5" width="450">
                    <v-card-text>
                        <div class="d-flex align-center">
                            <v-chip class="rounded" variant="elevated" prepend-icon="mdi-check-circle-outline" flat color="success" append-icon="mdi-chevron-down">Completed</v-chip>
                            <v-spacer></v-spacer>
                            <v-btn size="small" variant="text" class="text-capitalize ml-2" icon="mdi-pencil" @click="$router.push({query: {edit: schedule._id}})"></v-btn>
                            <v-btn size="small" variant="text" class="text-capitalize ml-2" :icon="schedule.pinned ? 'mdi-pin-off' : 'mdi-pin'" @click="$schedule.togglePinned(schedule._id)"></v-btn>
                        </div>
                        <v-divider class="my-3"></v-divider>
                        <div class="d-flex mb-4" style="gap: 5px;" v-if="schedule.tags.length > 0">
                            <v-card width="30" height="10" :color="tag.color" density="compact"
                                v-for="tag in schedule.tags" :key="tag._id"></v-card>
                        </div>
                        <!-- <v-card class="mb-4 rounded-lg border" height="150" flat style="overflow-y: hidden;">
                            <nuxt-img :src="'https://source.unsplash.com/random/500x250/?collaboration&' + schedule.title"
                                class="w-100"></nuxt-img>
                        </v-card> -->
                        <h2 class="text-capitalize">
                            {{ schedule.title }}
                        </h2>
                        <div
                            class="my-2  d-flex justify-space-between font-weight-regular text-subtitle-2">
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
    </tr>
</template>

<script setup lang="ts">
import type { ScheduleData } from '~/stores/schedule';
const $schedule = useScheduleStore()
const props = defineProps<{ schedule: ScheduleData}>()
const timeDisplay = computed(() => {
    let startTime = new Date(props.schedule.startAt).toLocaleTimeString([], { minute: '2-digit', hour: '2-digit' })
    let endTime = new Date(props.schedule.endAt).toLocaleTimeString([], { minute: '2-digit', hour: '2-digit' })
    if (startTime != endTime) {
        startTime += ' - ' + endTime
    }

    return startTime
})
const spanNumber = computed(() => new Date(props.schedule.endAt).getDate() - new Date(props.schedule.startAt).getDate() + 1)


onMounted(() => {
    const scheduleRow = document.getElementById(props.schedule._id)
    
    if(scheduleRow){
        const weekNumber = 7
        const startDate = new Date(props.schedule.startAt).getDay() + 1
        const endDate = new Date(props.schedule.endAt).getDay() + 1
        const prepend = startDate - 1
        const append = weekNumber - endDate
        
        for (let index = 0; index < prepend; index++) {
            const element = document.createElement('td');
            element.style.borderRight = "2px solid #ffffff23"

            if(index < prepend){
                element.style.borderLeft = "none"
            }else{
                element.style.borderLeft = "2px solid #ffffff23"
            }

            
            scheduleRow.prepend(element)
        }

        for (let index = 0; index < append; index++) {
            const element = document.createElement('td');
            element.style.borderLeft = "2px solid #ffffff23"

            if(index < append){
                element.style.borderRight = "none"
            }else{
                element.style.borderRight = "2px solid #ffffff23"
            }

            scheduleRow.append(element)

        }
    }

    


})



</script>

<style scoped>
tr td {
    /* table-layout: auto;
    border-collapse: collapse !important; */
    border: 2px solid #ffffff23;
    border-top: none;
    border-bottom: none;

}

tr td:last-child{
    border-right: none;
}

tr td:first-child{
    border-left: none;

}

tr:last-child td {
    border-top: none;
    border-right: none;

}

tr:nth-child(-n+2) td {
    border-bottom: none;

}
</style>