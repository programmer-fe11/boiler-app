<script setup lang="ts">
import { onMounted } from 'vue';
import { useBreadcrumbStore } from '@/store';
import { BreadcrumbMenu } from '@fewangsit/wangsvue/breadcrumb';
import AssetModule from '@/components/modules/AssetModule/AssetModule.vue';

onMounted(() => {
  setBreadcrumbs(menus);
});

const { setBreadcrumbs } = useBreadcrumbStore();

const menus: BreadcrumbMenu[] = [
  {
    name: 'Asset',
  },
];
</script>

<template>
  <AssetModule />
</template>
