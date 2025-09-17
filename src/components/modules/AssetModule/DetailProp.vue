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
