<script lang="ts" setup>
import { computed, ref } from "vue";
import { useInterpreter } from "@/composable/useInterpreter";
import { Token } from "@/typings/interpreter";
import Panel from "@/components/Panel.vue";
import About from "@/components/About.vue";
import Instructions from "./components/Instructions.vue";
import MemoryTape from "./components/MemoryTape.vue";

const instructionDescriptions: { [key in Token]: string } = {
  ">": "Move pointer forward once",
  "<": "Move pointer backward once",
  "+": "Increase value at pointer",
  "-": "Decrease value at pointer",
  ".": "Output ASCII value at pointer",
  ",": "Read from input into pointer",
  "[": "Conditional loop if pointers value > 0",
  "]": "Jump to loop start",
};

const { programPtr, program, memory, maxPtr, ptr, output, interpret, step } =
  useInterpreter();
const input = ref("h");
const delay = ref(200);
const code = ref(">,[>,]<[<]>[.>]");
const visibleMemory = computed(() => memory.value.slice(0, maxPtr.value + 1));

function load() {
  interpret(code.value, input.value);
}

function autoStep() {
  setTimeout(() => {
    if (!(programPtr.value > program.value.length - 1)) {
      step();
      autoStep();
    }
  }, delay.value);
}

function auto() {
  load();
  autoStep();
}
</script>

<template>
  <div>
    <About :instructions="instructionDescriptions" />
    <div class="grid grid-cols-1 sm:grid-cols-2">
      <Panel title="Code">
        <textarea
          v-model="code"
          class="w-full tracking-widest border rounded font-mono"
        ></textarea>
      </Panel>
      <Panel title="Input Buffer">
        <input v-model="input" class="w-full border rounded" />

        <Panel title="Controls">
          <div class="flex gap-2">
            <button
              @click.prevent="load"
              class="px-3 py-1 text-white bg-gray-700 rounded w-30 text-baseline"
            >
              Load Instructions
            </button>
            <button
              @click.prevent="step"
              class="px-3 py-1 text-white bg-gray-700 rounded w-30 text-baseline"
            >
              Step Program
            </button>
            <button
              @click.prevent="auto"
              class="px-3 py-1 text-white bg-gray-700 rounded w-30 text-baseline"
            >
              Auto-Run
            </button>
          </div>
          <div class="py-2 text-xl font-bold uppercase">Step Delay</div>
          <input type="range" min="0" max="5000" v-model="delay" id="myRange" />
          <div>{{ delay / 1000 }} seconds</div>
        </Panel>
      </Panel>
    </div>
    <hr />
    <Instructions :program="program" :ptr="programPtr" :instructions="instructionDescriptions" />
    <hr />
    <MemoryTape :memory="visibleMemory" :ptr="ptr"/>
    <hr />
    <Panel title="Output">
      <button class="px-3 py-1 text-white bg-gray-700 rounded w-30 text-baseline" @click="output = ''">Clear</button>
      <div class="p-5 my-2 font-mono text-lg text-left text-white bg-gray-700">
        <pre>{{ output }}</pre>
      </div>
    </Panel>
  </div>
</template>