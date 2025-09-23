<!-- TODO: Rename file ini jadi AssetView -->
<script setup lang="ts">
import { onMounted } from 'vue';
import { useBreadcrumbStore } from '@/store';
import { BreadcrumbMenu } from '@fewangsit/wangsvue/breadcrumb';
import AssetModule from '@/components/modules/AssetModule/AssetModule.vue';

onMounted(() => {
  setBreadcrumbs(menus);
});

const { setBreadcrumbs } = useBreadcrumbStore();

// TODO: Breadcrumb sesuaiin sama di Figma
const menus: BreadcrumbMenu[] = [
  {
    name: 'Home',
  },
];
</script>

<template>
  <AssetModule />
</template>
