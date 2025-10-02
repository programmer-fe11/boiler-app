<script setup lang="ts">
import { useBreadcrumbStore } from '@/store';
import { BreadcrumbMenu } from '@fewangsit/wangsvue/breadcrumb';
import { MenuItem } from '@fewangsit/wangsvue/menuitem';
import { TabMenu } from '@fewangsit/wangsvue';
import { onMounted, ref } from 'vue';
import CustomFieldModule from '@/components/modules/CustomFieldModul/CustomFieldModule.vue';

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
    label: 'Specific',
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
    name: 'Specific',
  },
];
</script>

<template>
  <TabMenu :menu="tabMenus" />
  <CustomFieldModule type-module="specific" />
</template>
