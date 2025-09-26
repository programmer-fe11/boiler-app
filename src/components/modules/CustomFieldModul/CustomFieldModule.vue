<script setup lang="ts">
import { computed } from 'vue';
import { BadgeGroup, DataTable } from '@fewangsit/wangsvue';
import {
  FetchResponse,
  QueryParams,
  TableCellComponent,
  TableColumn,
} from '@fewangsit/wangsvue/datatable';
import { CustomField, CustomFieldCategory } from '@/types/customField.type';
import CustomFieldService from '@/components/services/customField.service';
import { MenuItem } from '@fewangsit/wangsvue/menuitem';
import { BadgeGroupProps } from '@fewangsit/wangsvue/badgegroup';
import CustomFieldHeader from './CustomFieldHeader.vue';

const singleAction: MenuItem[] = [
  {
    label: 'Edit',
    icon: 'edit',
  },
  {
    label: 'Delete',
    icon: 'delete-bin',
    danger: true,
  },
];

const tableColumns = computed<TableColumn[]>(() => {
  return [
    {
      field: 'status',
      header: 'Active',
      sortable: true,
      fixed: true,
      preset: {
        type: 'toggle',
        onToggle: (e: boolean, data): void => {
          data.status = e;
        },
      },
    },
    { field: 'name', header: 'Field Name', sortable: true, fixed: true },
    { field: 'dataType', header: 'Data Type', sortable: true, fixed: true },
    {
      field: 'optionValue',
      header: 'Value',
      sortable: true,
      fixed: true,
      bodyComponent: (data): TableCellComponent => {
        return {
          component: BadgeGroup,
          props: {
            labels: data.optionValue,
            limit: 2,
          } as BadgeGroupProps,
        };
      },
    },
    {
      field: 'isRequired',
      header: 'Required',
      sortable: true,
      fixed: true,
      bodyTemplate: (data): string => {
        return data.isRequired ? 'Yes' : 'No';
      },
    },
    {
      field: 'category',
      header: 'Item Name',
      sortable: true,
      fixed: true,
      bodyComponent: (data): TableCellComponent => {
        return {
          component: BadgeGroup,
          props: {
            labels: data.category.map((c: CustomFieldCategory) => c.name),
            limit: 2,
          } as BadgeGroupProps,
        };
      },
    },
  ];
});

const getTableData = async (
  params: QueryParams,
): Promise<FetchResponse<CustomField> | undefined> => {
  try {
    const { data } = await CustomFieldService.getAllCustomField(params);
    return data;
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <CustomFieldHeader />
  <DataTable
    :columns="tableColumns"
    :fetch-function="getTableData"
    :options="singleAction"
    data-key="id"
    empty-table-message="empty"
    lazy
    selection-type="checkbox"
    table-name="custom-field-list"
    use-option
    use-paginator
  />
</template>
