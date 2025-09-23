<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { DataTable } from '@fewangsit/wangsvue';
import {
  FetchResponse,
  QueryParams,
  TableColumn,
} from '@fewangsit/wangsvue/datatable';
import { MenuItem } from '@fewangsit/wangsvue/menuitem';
import { Asset } from '@/types/asset.type';
import AssetModuleTableFilter from './AssetModuleTableFilter.vue';
import AssetServices from '@/components/services/asset.service';
import AssetModuleHeader from './AssetModuleHeader.vue';
import DialogRegisterEditAsset from './DialogRegisterEditAsset.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
// TODO: Label sama icon untuk single action sesuaiin sama di Figma
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

const selectedAsset = shallowRef<Asset>();
const showEditUserDialog = shallowRef<boolean>(false);

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
    // TODO: Alias name masih belum keliatan di tabel
    {
      field: 'AliasName',
      header: 'Alias Name',
      sortable: true,
      fixed: true,
    },
  ];
});

const getTableData = async (
  params: QueryParams,
): Promise<FetchResponse<Asset> | undefined> => {
  try {
    const { data } = await AssetServices.getAllAsset(params);
    return data;
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <AssetModuleHeader />
  <AssetModuleTableFilter />
  <!-- TODO: Atur prop `selectionType` untuk datatable biar sesuai sama di figma -->
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

  <DialogRegisterEditAsset
    v-model:visible="showEditUserDialog"
    :id-edit="selectedAsset?._id"
  />
</template>
