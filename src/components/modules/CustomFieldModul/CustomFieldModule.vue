<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { BadgeGroup, DataTable } from '@fewangsit/wangsvue';
import {
  FetchResponse,
  QueryParams,
  TableCellComponent,
  TableColumn,
} from '@fewangsit/wangsvue/datatable';
import { CustomField, CustomFieldItemName } from '@/types/customField.type';
import CustomFieldService from '@/components/services/customField.service';
import { MenuItem } from '@fewangsit/wangsvue/menuitem';
import { BadgeGroupProps } from '@fewangsit/wangsvue/badgegroup';
import CustomFieldHeader from './CustomFieldHeader.vue';
import {
  GetCustomFieldParams,
  TypeParamsBody,
} from '@/components/dto/customField.dto';
import CustomFieldDialogForm from './CustomFieldDialogForm.vue';
import CustomFieldDialogBulkConfirm from './CustomFieldDialogBulkConfirm.vue';

const props = defineProps<{ typeModule: TypeParamsBody }>();

const singleAction: MenuItem[] = [
  {
    label: 'Edit',
    icon: 'edit',
    command: (): void => {
      showCustomFieldEditDialog.value = true;
    },
  },
  {
    label: 'Delete',
    icon: 'delete-bin',
    danger: true,
    command: (): void => {
      showCustomFieldConfirmDialog.value = true;
    },
  },
];

const showCustomFieldEditDialog = shallowRef<boolean>(false);
const showCustomFieldConfirmDialog = shallowRef<boolean>(false);
const selectedCustomField = shallowRef<CustomField>();

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
    { field: 'dataType', header: 'Data Type', sortable: true, fixed: false },
    {
      field: 'optionValue',
      header: 'Value',
      sortable: true,
      fixed: false,
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
      fixed: false,
      bodyTemplate: (data): string => {
        return data.isRequired ? 'Yes' : 'No';
      },
    },
    {
      field: 'itemName',
      header: 'Item Name',
      sortable: true,
      fixed: false,
      bodyComponent: (data): TableCellComponent => {
        return {
          component: BadgeGroup,
          props: {
            labels: data.itemName.map((c: CustomFieldItemName) => c.name),
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
    const { data } = await CustomFieldService.getAllCustomField(
      params as GetCustomFieldParams,
      props.typeModule,
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <CustomFieldHeader :type-header="props.typeModule" />
  <DataTable
    :columns="tableColumns"
    :fetch-function="getTableData"
    :options="singleAction"
    @toggle-option="selectedCustomField = $event"
    data-key="_id"
    empty-table-message="empty"
    lazy
    selection-type="checkbox"
    table-name="custom-field-list"
    use-option
    use-paginator
  />
  <CustomFieldDialogForm
    v-model:visible="showCustomFieldEditDialog"
    :custom-field-data="selectedCustomField"
    :type-form="props.typeModule"
  />

  <CustomFieldDialogBulkConfirm
    v-model:visible="showCustomFieldConfirmDialog"
    :list-bulk="selectedCustomField ? [selectedCustomField] : undefined"
    option-bulk="deleteBulk"
  />
</template>
