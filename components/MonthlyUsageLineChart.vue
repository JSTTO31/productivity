<template>
    <Line :data="data" :options="options" />
</template>

<script setup lang="ts">
import {
 Chart as ChartJS,
 CategoryScale,
 LinearScale,
 PointElement,
 LineElement,
 Title,
 Tooltip,
 Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
 CategoryScale,
 LinearScale,
 PointElement,
 LineElement,
 Title,
 Tooltip,
 Legend
)

const props = defineProps(['data'])

const data = {
 labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
 datasets: [
   {
     label: '',
     data: computed(() => props.data).value,
     backgroundColor: '#0D47A1',
     borderColor: '#0D47A1',
     borderWidth: 2,
   }
 ]
}

const options = {
 responsive: true,
 maintainAspectRatio: false,
 plugins: {
   legend: {
   display: false
 }
 }
 
}

</script>

<style scoped>

</style>