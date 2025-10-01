<script setup lang="ts">
import {
  Button,
  ButtonBulkAction,
  ButtonDownload,
  ButtonFilter,
  ButtonSearch,
  Changelog,
  FilterContainer,
} from '@fewangsit/wangsvue';
import { shallowRef, watch } from 'vue';
import CustomFieldDialogForm from './CustomFieldDialogForm.vue';
import { MenuItem } from '@fewangsit/wangsvue/menuitem';
import { CustomField } from '@/types/customField.type';
import CustomFieldDialogBulkConfirm from './CustomFieldDialogBulkConfirm.vue';
import { filterFieldsCustomField } from '../AssetModule/options/filterFields';

/*
 * TODO: Type dalam file vue enggak boleh ada yang diexport,
 * kalau mau diexport, pindahin dulu ke file *.type.ts
 */
export type ShowOptionBulk = 'deleteBulk' | 'activeBulk' | 'inactiveBulk';
// TODO: Type ini dihapus, pakai type CustomField aja
export type Item = { id: string; name: string };

const bulkAction: MenuItem[] = [
  {
    label: 'Active',
    icon: 'check',
    command: (): void => {
      showBulkActionCustomFieldDialog.value = true;
      showBulkAction.value = 'activeBulk';
    },
  },
  {
    label: 'Inactive',
    icon: 'close',
    command: (): void => {
      showBulkActionCustomFieldDialog.value = true;
      showBulkAction.value = 'inactiveBulk';
    },
  },
  {
    label: 'Delete User',
    icon: 'delete-bin',
    danger: true,
    command: (): void => {
      showBulkActionCustomFieldDialog.value = true;
      showBulkAction.value = 'deleteBulk';
    },
  },
];

const dataSelected = shallowRef<CustomField[]>([]);
const listDataSelectedInBluk = shallowRef<Item[]>([]);
const showBulkAction = shallowRef<ShowOptionBulk>();
const showCreateCustomFieldDialog = shallowRef<boolean>(false);
const showBulkActionCustomFieldDialog = shallowRef<boolean>(false);

watch(dataSelected, (newVal) => {
  listDataSelectedInBluk.value = newVal.map((item) => {
    return { id: item._id, name: item.name };
  });
});
</script>

<template>
  <div class="flex justify-between">
    <ButtonBulkAction
      v-model:selected-data="dataSelected"
      :options="bulkAction"
      class="flex-1"
      table-name="custom-field-list"
    />
    <div class="flex flex-1 justify-end items-center gap-3">
      <div class="flex gap-4 items-center">
        <ButtonSearch table-name="custom-field-list" />
        <ButtonFilter table-name="custom-field-list" />
        <ButtonDownload
          file-name="Download custom-field-table"
          table-name="custom-field-list"
        />
        <Changelog
          header="Changelog: Custom Field > Global"
          object="Repositori"
        />
      </div>
      <Button
        @click="showCreateCustomFieldDialog = !showCreateCustomFieldDialog"
        icon="add"
        label="Custom Field"
        severity="secondary"
      />
    </div>
  </div>
  <FilterContainer
    :fields="filterFieldsCustomField"
    apply-text="Apply"
    clear-field-text="Clear Field"
    table-name="custom-field-list"
  />

  <CustomFieldDialogBulkConfirm
    v-model:option-bulk="showBulkAction"
    v-model:visible="showBulkActionCustomFieldDialog"
    :list-bulk="listDataSelectedInBluk"
  />

  <CustomFieldDialogForm v-model:visible="showCreateCustomFieldDialog" />
</template>
