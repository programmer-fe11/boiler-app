<script setup lang="ts">
import { useBreadcrumbStore } from '@/store';
import { BreadcrumbMenu } from '@fewangsit/wangsvue/breadcrumb';
import { onMounted } from 'vue';
import CustomFieldModule from '@/components/modules/CustomFieldModul/CustomFieldModule.vue';

onMounted(() => {
  setBreadcrumbs(menus);
});

const { setBreadcrumbs } = useBreadcrumbStore();

const menus: BreadcrumbMenu[] = [
  {
    name: 'CustomField',
  },
];
</script>

<template>
  <CustomFieldModule />
</template>
