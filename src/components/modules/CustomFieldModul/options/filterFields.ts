import { AxiosResponse } from 'axios';
import {
  FetchOptionResponse,
  FilterField,
} from '@fewangsit/wangsvue/filtercontainer';
import { Option } from '@fewangsit/wangsvue/dropdown';
import CustomFieldService from '@/components/services/customField.service';
import { GetOptionsCustomFieldParams } from '@/components/dto/customField.dto';

const getAllOptionsCustomField = async (
  params: GetOptionsCustomFieldParams,
): Promise<AxiosResponse<FetchOptionResponse>> => {
  return await CustomFieldService.getCustomFieldOptions(params);
};

export const filterFieldsCustomField: FilterField[] = [
  {
    label: 'Active',
    field: 'status',
    type: 'multiselect',
    placeholder: 'Select status',
    fetchOptionFn(): Option[] {
      return [
        {
          label: 'Active',
          value: true,
        },
        {
          label: 'Inactive',
          value: false,
        },
      ];
    },
  },
  {
    label: 'Data Type',
    field: 'dataType',
    type: 'multiselect',
    placeholder: 'Select data type',
    optionField: 'dataTypeOptions',
    fetchOptionFn: getAllOptionsCustomField,
  },
  {
    label: 'Required',
    field: 'isRequired',
    type: 'multiselect',
    placeholder: 'Select requirement',
    fetchOptionFn(): Option[] {
      return [
        {
          label: 'Yes',
          value: true,
        },
        {
          label: 'No',
          value: false,
        },
      ];
    },
  },
];
