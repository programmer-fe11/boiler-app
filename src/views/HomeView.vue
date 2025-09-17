<script setup lang="ts">
import { onMounted } from 'vue';
import { useBreadcrumbStore } from '@/store';
import { BreadcrumbMenu } from '@fewangsit/wangsvue/breadcrumb';
import AssetModule from '@/components/modules/AssetModule/AssetModule.vue';

const { setBreadcrumbs } = useBreadcrumbStore();

const menus: BreadcrumbMenu[] = [
  {
    name: 'Wangs',
  },
  {
    name: 'Home',
  },
];

onMounted(() => {
  setBreadcrumbs(menus);
});
</script>

<template>
  <AssetModule />
</template>
