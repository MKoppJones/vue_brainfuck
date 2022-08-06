<script lang="ts" setup>
import PanelTitle from './PanelTitle.vue';
interface Props {
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: undefined,
})
</script>

<template>
  <div class="p-2">
    <PanelTitle v-if="title">{{ title }}</PanelTitle>
    <slot />
  </div>
</template>