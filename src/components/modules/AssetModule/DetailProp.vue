<!--
  TODO: This is too small of a component to be made into its own file,
  move it back to its parent component. I'd consider something about 50 lines
  long to be a good size for a separate component.

  A unique case is made for reusable components, that can be as short as 5 lines.
-->
<script setup lang="ts">
const props = defineProps<{ title: string; desc: string }>();
</script>

<template>
  <div class="min-w-80 flex flex-col gap-1">
    <p class="text-[10px] text-general-500">{{ props.title }}</p>
    <p class="text-xs text-grayscale-900 font-medium">
      {{ props.desc }}
    </p>
  </div>
</template>
