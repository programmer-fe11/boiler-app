<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { DataTable } from '@fewangsit/wangsvue';
import {
  FetchResponse,
  QueryParams,
  TableColumn,
} from '@fewangsit/wangsvue/datatable';
import { MenuItem } from '@fewangsit/wangsvue/menuitem';
import { Member } from '@/types/member.type';
import router from '@/router';
import AssetModuleTableFilter from './AssetModuleTableFilter.vue';
import AssetServices from '@/components/services/api.service';
import AssetModuleHeader from './AssetModuleHeader.vue';
import DialogRegisterEditLayout from './DialogRegisterEditLayout.vue';

const selectedAsset = shallowRef<Member>();
const showEditUserDialog = shallowRef<boolean>(false);

const singleAction: MenuItem[] = [
  {
    label: 'Detail',
    icon: 'checkbox-blank-circle',
    command: (): void => {
      router.push(`/detail/${selectedAsset.value?._id}`);
    },
  },
  {
    label: 'Edit',
    icon: 'checkbox-blank-circle',
    command: (): void => {
      showEditUserDialog.value = true;
    },
  },
];

const tableColumns = computed<TableColumn[]>(() => {
  return [
    {
      field: 'name',
      header: 'Asset',
      sortable: true,
      fixed: true,
    },
    {
      field: 'group',
      header: 'Group',
      sortable: true,
      fixed: true,
    },
    {
      field: 'category',
      header: 'Category',
      sortable: true,
      fixed: true,
    },
    {
      field: 'brand',
      header: 'Brand',
      sortable: true,
      fixed: true,
    },
    {
      field: 'model',
      header: 'Model/Type',
      sortable: true,
      fixed: true,
    },
    {
      field: 'AliasName',
      header: 'Alias Name',
      sortable: true,
      fixed: true,
    },
  ];
});
const selectedAssetId = computed<string | undefined>(() => {
  return selectedAsset.value?._id;
});

const getTableData = async (
  params: QueryParams,
): Promise<FetchResponse<Member> | undefined> => {
  try {
    const { data } = await AssetServices.getAsset(params);
    return data;
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <AssetModuleHeader />
  <AssetModuleTableFilter />
  <DataTable
    :columns="tableColumns"
    :fetch-function="getTableData"
    :options="singleAction"
    @toggle-option="selectedAsset = $event"
    data-key="_id"
    lazy
    table-name="user-list"
    use-option
    use-paginator
  />

  <DialogRegisterEditLayout
    v-model:id-edit="selectedAssetId"
    v-model:visible="showEditUserDialog"
  />
</template>
