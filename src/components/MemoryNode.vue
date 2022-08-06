<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  memoryValue: number
  active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
})

const parsedMemoryValue = computed(() => String.fromCharCode(props.memoryValue))
</script>

<template>
  <div
    class="grid w-16 h-16 text-3xl rounded place-items-center"
    :class="[active ? 'border-2 border-red-400' : 'border border-gray-300']"
    :title="parsedMemoryValue"
  >
    {{ memoryValue }}
  </div>
</template>
