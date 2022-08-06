<script lang="ts" setup>
import { Token } from '@/typings/interpreter'

interface Props {
  instructionCharacter: Token
  description: string
  active?: boolean
}

withDefaults(defineProps<Props>(), {
  active: false,
})
</script>

<template>
  <div
    class="grid w-16 h-16 text-3xl rounded place-items-center"
    :class="[active ? 'border-2 border-red-400' : 'border border-gray-300']"
    :title="description"
  >
    {{ instructionCharacter }}
  </div>
</template>
