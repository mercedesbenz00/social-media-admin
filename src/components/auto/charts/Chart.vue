<template>
  <PChart type="bar" :data="data" :options="options"></PChart>
</template>
<script setup lang="ts">
import type { PropType } from "vue";

const props = defineProps({
  data: {
    type: Array as PropType<number[]>,
    required: true
  },
  labels: {
    type: Array as PropType<string[]>,
    required: true
  },
  label: {
    type: String,
    required: true
  }
})

const data = ref({
  labels: props.labels,
  datasets: [
    {
      label: props.label,
      backgroundColor: '#62528F',
      borderRadius: 4,
      barThickness: 8,
      data: props.data
    }
  ]
})
const options = ref(
  {
    plugins: {
      legend: {
        display: false,
        labels: {
          color: '#62528F'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#62528F'
        }
      },
      y: {
        ticks: {
          color: '#62528F'
        }
      }
    }
  }
)
</script>
