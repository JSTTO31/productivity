<template>
    <v-hover v-slot="{isHovering, props}">
        <v-col v-bind="props" class="col pa-0">
            <v-card flat class="rounded h-100 text-white"
                :class="date.toDateString() == today.toDateString() ? 'section-active' : 'bg-transparent'">
                <div class="h-100 pa-2 d-flex flex-column" style="row-gap: 5px;">
                    <transition-group name="scale-y">
                        <div :style="`transition-delay: ${n / 5};` + (schedule.type == 'dummy' ? 'transition: none' : '')" v-for="schedule, n in schedules" :schedule="schedule" :key="schedule._id">
                            <div v-if="schedule.type">
                                <schedule-calendar-table-column-dummy
                                    :schedule="schedule"></schedule-calendar-table-column-dummy>
                            </div>
                            <schedule-calendar-column-card v-else :schedule="schedule"></schedule-calendar-column-card>
                        </div>
                    </transition-group>
                    <v-menu v-model="menu" location="end" :close-on-content-click="false" v-if="isHovering || menu">
                        <template #activator="{ props,isActive }">
                            <v-card v-bind="props" class="h-100 pa-2" variant="outlined" style="border:2px dashed;"
                                @click="">
                                <v-icon>mdi-plus-circle</v-icon>
                            </v-card>
                        </template>
                        <v-card width="345" class="mx-2">
                            <v-card-title class=" d-flex align-center" style="font-size: 18px">
                                Add Schedule
                                <v-spacer></v-spacer>
                                <v-btn icon="mdi-close" size="small" @click="menu = false" flat></v-btn>
                            </v-card-title>
                            <v-card-text>
                                <schedule-create-schedule-card v-model:menu="menu" :start-at="startAt" :end-at="endAt"> </schedule-create-schedule-card>
                            </v-card-text>
                        </v-card>
                    </v-menu>
                </div>
            </v-card>
        </v-col>
    </v-hover>
</template>

<script setup lang="ts">
const props = defineProps<{ date: Date }>()
const today = new Date()
const { schedules: schedulesStore } = storeToRefs(useScheduleStore())
const menu = ref(false)
type DummyObject = { _id: string, type: string, startAt: string, endAt: string }
const schedules = computed((): any => {
    //@ts-ignore
    const filterSchedules = schedulesStore.value.filter(item => new Date(item.startAt).toDateString() == props.date.toDateString()).sort((a, b) => new Date(a.startAt) - new Date(b.startAt))
    //@ts-ignore
    const reduceSchedules = filterSchedules.reduce((all: (DummyObject | ScheduleData)[], schedule: ScheduleData, index: number) => {
        if (index == 0) {
            const startAt = new Date(schedule.startAt)
            const getHours = startAt.getHours()
            const getMinutes = startAt.getMinutes()

            if (getHours != 6 || (getHours == 6 && getMinutes != 0)) {
                const date = new Date(props.date)
                date.setHours(6)
                date.setMinutes(0)
                const dummyObject = { _id: useTempID(7), type: 'dummy', startAt: date, endAt: schedule.startAt }
                //@ts-ignore
                all.push(dummyObject)
                all.push(schedule)
                return all
            }
        }

        all.push(schedule)

        if (index == (filterSchedules.length - 1)) return all

        const nextSchedule = filterSchedules[index + 1]

        if (nextSchedule.startAt == schedule.endAt) {
            return all
        }

        const dummyObject = { _id: useTempID(7), type: 'dummy', startAt: schedule.endAt, endAt: nextSchedule.startAt }

        //@ts-ignore
        all.push(dummyObject)
        return all
    }, [])
    return reduceSchedules
})

const startAt = computed(() => schedules.value.length > 0 ? new Date(schedules.value[schedules.value.length - 1].endAt) : new Date(props.date))
const endAt = new Date(props.date)
endAt.setHours(22)
endAt.setMinutes(0)

</script>

<style scoped>
.section-active {
    background:
        /* On "top" */
        repeating-linear-gradient(45deg,
            transparent,
            transparent 10px,
            #cccccc17 10px,
            #cccccc1c 20px),
        /* on "bottom" */
        linear-gradient(to bottom,
            #ffffff13,
            #ffffff17);
}

.scale-y-enter-active,
.scale-y-leave-active {
  transition: opacity .2s linear, transform .35s ease;
}

.scale-y-enter-from, .scale-y-leave-to{
  opacity: 0;
  transform: scale(.2);
}

</style>