<script setup lang="ts">
import DetailModule from '@/components/modules/AssetModule/DetailModule.vue';
import { useBreadcrumbStore } from '@/store';
import { BreadcrumbMenu } from '@fewangsit/wangsvue/breadcrumb';
import { onMounted } from 'vue';

onMounted(() => {
  setBreadcrumbs(menus);
});

const { setBreadcrumbs } = useBreadcrumbStore();

const menus: BreadcrumbMenu[] = [
  {
    name: 'Asset Detail',
  },
];
</script>

<template>
  <DetailModule />
</template>
