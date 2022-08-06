<script lang="ts" setup>
import Panel from '@/components/Panel.vue';
import InstructionNode from "@/components/InstructionNode.vue";
import { Token } from '@/typings/interpreter';

interface Props {
  instructions: { [key in Token]: string }
  program: Token[]
  ptr: number
}
defineProps<Props>()
</script>

<template>
  <Panel title="Instructions">
    <p><i>The highlighted instruction is the current instruction being ran</i></p>
    <div v-if="ptr >= 0">
      <div class="italic">Current Instructions</div>
      <div>
        {{ program[ptr] }} :
        {{ instructions[program[ptr]] }}
      </div>
    </div>
    <div class="flex flex-wrap gap-4 p-2">
      <InstructionNode v-for="(character, index) in program" :key="index" :active="index === ptr"
        :description="instructions[character]" :instruction-character="character" />
    </div>
  </Panel>
</template>