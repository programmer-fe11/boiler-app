<script setup lang="ts">
import { FilterContainer } from '@fewangsit/wangsvue';
import { filterFieldsAsset } from './options/filterFields';
</script>

<template>
  <FilterContainer :fields="filterFieldsAsset" table-name="data-asset" />
</template>
