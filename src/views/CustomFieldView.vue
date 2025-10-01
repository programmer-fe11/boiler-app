<script setup lang="ts">
import { useBreadcrumbStore } from '@/store';
import { BreadcrumbMenu } from '@fewangsit/wangsvue/breadcrumb';
import { onMounted, ref } from 'vue';
import CustomFieldModule from '@/components/modules/CustomFieldModul/CustomFieldModule.vue';
import { MenuItem } from '@fewangsit/wangsvue/menuitem';
import { TabMenu } from '@fewangsit/wangsvue/';

onMounted(() => {
  setBreadcrumbs(menus);
});

const { setBreadcrumbs } = useBreadcrumbStore();

const tabMenus = ref<MenuItem[]>([
  {
    label: 'Global',
    route: '/custom-field/global',
  },
  {
    label: 'Spesific',
    route: '/custom-field/specific',
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
    name: 'Global',
  },
];
</script>

<template>
  <TabMenu :menu="tabMenus" />
  <CustomFieldModule />
</template>
