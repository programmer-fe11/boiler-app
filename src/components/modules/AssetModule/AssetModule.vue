<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { DataTable } from '@fewangsit/wangsvue';
import {
  FetchResponse,
  QueryParams,
  TableColumn,
} from '@fewangsit/wangsvue/datatable';
import { MenuItem } from '@fewangsit/wangsvue/menuitem';
import { Member } from '@/types/asset.type';
import AssetModuleTableFilter from './AssetModuleTableFilter.vue';
import AssetServices from '@/components/services/asset.service';
import AssetModuleHeader from './AssetModuleHeader.vue';
import DialogRegisterEditAsset from './DialogRegisterEditAsset.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
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

const selectedAsset = shallowRef<Member>();
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
    {
      field: 'AliasName',
      header: 'Alias Name',
      sortable: true,
      fixed: true,
    },
  ];
});

/*
 * TODO: Computed ini enggak berguna, langsung aja pake selectedAsset.value?._id
 *
 * Dayen, udah beberapa kali Dayen ada ngehapus komentar TODO, tapi bugnya masih belum difix.
 * Misalnya ini, kenapa masih ada computed ini? Kalau Dayen bingung cara fix TODOnya gimana,
 * langsung tanya aja ya, jangan asal diperbaikin.
 *
 * Aku lebih mending Dayen nanya 10 pertanyaan daripada aku harus nambahin 1 TODO. Karena
 * kalau aku nambahin TODO itu berarti Dayen ada kesalahan yang perlu aku koreksi, padahal
 * kesalahan itu bisa dicegah dengan Dayen nanya.
 */
const selectedAssetId = computed(() => selectedAsset.value?._id);

const getTableData = async (
  params: QueryParams,
): Promise<FetchResponse<Member> | undefined> => {
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

  <!--
    TODO: id-edit enggak perlu pake nullish coalescing operator, coba dibaca lagi operatornya untuk apa
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
  -->
  <DialogRegisterEditAsset
    v-model:visible="showEditUserDialog"
    :id-edit="selectedAssetId ?? undefined"
  />
</template>
