<script setup lang="ts">
import { shallowRef } from 'vue';

import {
  Button,
  ButtonFilter,
  ButtonSearch,
  Changelog,
  FilterContainer,
} from '@fewangsit/wangsvue';

import DialogRegisterEditAsset from './DialogRegisterEditAsset.vue';
import { filterFields } from './options/filterFields';

const showRegisterDialog = shallowRef<boolean>(false);
</script>

<template>
  <div class="flex justify-end gap-4" data-wv-section="tabletoolbars">
    <ButtonSearch class="ml-auto" table-name="asset-list" />
    <ButtonFilter table-name="asset-list" />
    <Changelog object="" />
    <Button
      @click="showRegisterDialog = !showRegisterDialog"
      class="bg-grayscale-900"
      icon="add"
      label="Register"
      severity="secondary"
    />
  </div>
  <FilterContainer
    :fields="filterFields"
    apply-text="Apply"
    table-name="asset-list"
  />
  <DialogRegisterEditAsset v-model:visible="showRegisterDialog" />
</template>
