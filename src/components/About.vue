<script lang="ts" setup>
import Panel from '@/components/Panel.vue';
import { Token } from '@/typings/interpreter';

interface Props {
  instructions: {[key in Token]: string}
}
defineProps<Props>()
</script>

<template>
  <Panel title="About">
    <p>
      BrainF**k is an <a href="https://en.wikipedia.org/wiki/Esoteric_programming_language">esoteric programming language</a> consisting of only 8 instruction characters.
    </p>
    <p>
      The 8 possible instructions are:
      <ul class="list-disc text-left">
        <li v-for="(description, character) of instructions" :key="character">
        <b>{{character}}</b>: {{description}}</li>
      </ul>
    </p>
    <p>
      Read more about it <a href="https://en.wikipedia.org/wiki/Brainfuck" target="_blank">here</a>.
    </p>
    <p>
      Below, you can find a visual interpreter that will help you learn and understand how it works.
    </p>
  </Panel>
</template>