<script lang="ts" setup>
import Panel from '@/components/Panel.vue';
import MemoryNode from "@/components/MemoryNode.vue";

interface Props {
  memory: number[]
  ptr: number
}
defineProps<Props>()
</script>

<template>
  <Panel title="Memory Tape">
    <p><i>The highlighted memory value is where the program is pointing</i></p>
    <div class="flex flex-wrap gap-4 p-2">
      <MemoryNode
        v-for="(m, index) in memory"
        :key="index"
        :active="index === ptr"
        :memory-value="m"
      />
    </div>
  </Panel>
</template>