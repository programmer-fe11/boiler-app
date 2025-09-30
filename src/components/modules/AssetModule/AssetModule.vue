<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { Badge, DataTable } from '@fewangsit/wangsvue';
import {
  FetchResponse,
  QueryParams,
  TableCellComponent,
  TableColumn,
} from '@fewangsit/wangsvue/datatable';
import { MenuItem } from '@fewangsit/wangsvue/menuitem';
import { Asset } from '@/types/asset.type';
import AssetTableFilter from './AssetTableFilter.vue';
import AssetServices from '@/components/services/asset.service';
import AssetHeader from './AssetHeader.vue';
import DialogRegisterEditAsset from './DialogRegisterEditAsset.vue';
import { useRouter } from 'vue-router';
import { BadgeProps } from '@fewangsit/wangsvue/badge';

const router = useRouter();

const singleAction: MenuItem[] = [
  {
    label: 'Detail Asset',
    icon: 'file-copy-2-line',
    command: (): void => {
      router.push(`/detail/${selectedAsset.value?._id}`);
    },
  },
  {
    label: 'Edit',
    icon: 'edit',
    command: (): void => {
      showEditAssetDialog.value = true;
    },
  },
];

const selectedAsset = shallowRef<Asset>();
const showEditAssetDialog = shallowRef<boolean>(false);

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
      bodyComponent: (data): TableCellComponent => {
        return {
          component: Badge,
          props: {
            label: data.group,
            severity: 'primary',
          } as BadgeProps,
        };
      },
    },
    {
      field: 'category',
      header: 'Category',
      sortable: true,
      fixed: true,
      bodyComponent: (data): TableCellComponent => {
        return {
          component: Badge,
          props: {
            label: data.category,
            severity: 'primary',
          } as BadgeProps,
        };
      },
    },
    {
      field: 'brand',
      header: 'Brand',
      sortable: true,
      fixed: true,
      bodyComponent: (data): TableCellComponent => {
        return {
          component: Badge,
          props: {
            label: data.brand,
            severity: 'dark',
          } as BadgeProps,
        };
      },
    },
    {
      field: 'model',
      header: 'Model/Type',
      sortable: true,
      fixed: true,
      bodyComponent: (data): TableCellComponent => {
        return {
          component: Badge,
          props: {
            label: data.model,
            severity: 'dark',
          } as BadgeProps,
        };
      },
    },

    {
      field: 'aliasName',
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
  <AssetHeader />
  <AssetTableFilter />
  <DataTable
    :columns="tableColumns"
    :fetch-function="getTableData"
    :options="singleAction"
    @toggle-option="selectedAsset = $event"
    data-key="_id"
    empty-table-message="empty"
    lazy
    selection-type="none"
    table-name="asset-list"
    use-option
    use-paginator
  />

  <DialogRegisterEditAsset
    v-model:visible="showEditAssetDialog"
    :id-edit="selectedAsset?._id"
  />
</template>
