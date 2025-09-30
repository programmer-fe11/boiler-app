<script setup lang="ts">
import { useBreadcrumbStore } from '@/store';
import { BreadcrumbMenu } from '@fewangsit/wangsvue/breadcrumb';
import { MenuItem } from '@fewangsit/wangsvue/menuitem';
import { TabMenu } from '@fewangsit/wangsvue';
import { onMounted, ref } from 'vue';

onMounted(() => {
  setBreadcrumbs(menus);
});

const { setBreadcrumbs } = useBreadcrumbStore();

const tabMenus = ref<MenuItem[]>([
  {
    label: 'Global',
    route: 'custom-field',
  },
  {
    label: 'Spesicic',
    route: 'custom-field-specific',
  },
]);

const menus: BreadcrumbMenu[] = [
  {
    name: 'Setting',
  },
  {
    name: 'Custom Field',
  },
  {
    name: 'Specific',
  },
];
</script>

<template>
  <TabMenu :menu="tabMenus" />
</template>
