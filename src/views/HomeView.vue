<script setup lang="ts">
import { onMounted } from 'vue';
import { useBreadcrumbStore } from '@/store';
import { BreadcrumbMenu } from '@fewangsit/wangsvue/breadcrumb';
import AssetModule from '@/components/modules/AssetModule/AssetModule.vue';
import AssetServices from '@/components/services/api.service';

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

/*
 * TODO: Ini untuk apa? Kalau enggak dipake untuk apa2, dihapus aja.
 * Kayaknya Dayen nambahin ini untuk ngecek APInya bisa atau enggak?
 * Kalau iya, jangan lupa tambahin komentar TODO, biar Dayen enggak lupa hapus.
 * Misalnya `TODO: This should be deleted`
 */
AssetServices.getAsset({});
</script>

<template>
  <AssetModule />
</template>
