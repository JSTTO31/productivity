<template>
    <v-card id="table-container" class="h-100 rounded-0 w-100 text-white" color="transparent" flat  style="overflow-y: auto;">
        <v-container fluid class="container pa-0 h-100 pr-2">
            <v-row>
                <div style="width: 100px;"></div>
                <v-col class="col pa-0" v-for="day, n in weekDays" :key="day.getDate()"
                    style="">
                    <v-card flat class="rounded-0 h-100 text-white"
                        :class="day.toDateString() == today.toDateString() ? 'section-active' : 'bg-transparent'">
                        <div class="py-5">
                            <h6 class="text-center text-capitalize font-weight-regular">{{ weekNames[n] }}</h6>
                            <h1 class="text-center text-h3 font-weight-bold">{{ day.getDate() }}</h1>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
            <v-row class="h-100">
                <div style="width: 100px;;row-gap: 5px;" class="d-flex pt-2 flex-column pl-5">
                    <span v-for="n in 19" :style="n == 19 ? 'height: 10px;margin-top: 5px' : 'height: 170px'" class="text-center text-caption">
                        <div class="mt-n2 d-flex  align-center" style="position: absolute;width: 100%;"  >
                            <span style="width: 50px;" class="text-subtitle-2">{{ n + 5 }} {{ n + 5 > 11 ? 'PM' : 'AM' }}</span>
                            <v-divider thickness="2"></v-divider>
                        </div>
                    </span>
                </div>
                <ScheduleCalendarTableColumn v-for="day, n in weekDays" :key="day.getDate()" :date="day"></ScheduleCalendarTableColumn>
            </v-row>
        </v-container>
    </v-card>
</template>

<script setup lang="ts">
definePageMeta({
    pageTransition: {
        name: 'slide',
        mode: 'out-in'
    }
})
const props = defineProps<{ currentDate: Date }>()
const weekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const today = new Date()
const weekDays = computed(() => {
    const currentDate = props.currentDate
    const day = currentDate.getDay()

    const startDay = new Date(currentDate)
    startDay.setDate(startDay.getDate() - day)

    const weekNumber = 6
    const container = []

    container.push(new Date(startDay))

    for (let index = 0; index < weekNumber; index++) {
        startDay.setDate(startDay.getDate() + 1)
        container.push(new Date(startDay))
    }

    return container
})

</script>

<style scoped>
#table-container::-webkit-scrollbar {
    width: 5px;
    background-color: rgba(0, 0, 0, 0.2)
}

#table-container::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.5)
}

.container {
    border-collapse: collapse;
}

#schedule-table {
    table-layout: auto;
    border-collapse: collapse !important;
    border: none;
}

#schedule-table th,
#schedule-table td {
    /* table-layout: auto;
    border-collapse: collapse !important; */
    border: 2px solid #ffffff23;
    border-top: none;

}

#schedule-table td:last-child,
#schedule-table th:last-child {
    border-right: none;
}

#schedule-table td:first-child,
#schedule-table th:first-child {
    border-left: none;

}

#schedule-table tr:last-child td {
    border-top: none;

}

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


.slide-enter-active,
.slide-leave-active {
  position: static;
  transition: opacity .25s linear, transform .35s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(15%);
}
</style>