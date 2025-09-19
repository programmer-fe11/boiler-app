<script setup lang="ts">
import DetailModule from '@/components/modules/AssetModule/DetailModule.vue';
import { useBreadcrumbStore } from '@/store';
import { BreadcrumbMenu } from '@fewangsit/wangsvue/breadcrumb';
import { onMounted } from 'vue';

const { setBreadcrumbs } = useBreadcrumbStore();

const menus: BreadcrumbMenu[] = [
  {
    name: 'Asset Detail',
  },
];

onMounted(() => {
  setBreadcrumbs(menus);
});
</script>

<template>
  <DetailModule />
</template>
