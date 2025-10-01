import { AxiosResponse } from 'axios';
import {
  FetchOptionResponse,
  FilterField,
} from '@fewangsit/wangsvue/filtercontainer';
import { GetOptionsAssetParams } from '@/components/dto/asset.dto';
import AssetServices from '@/components/services/asset.service';
import { Option } from '@fewangsit/wangsvue/dropdown';
import CustomFieldService from '@/components/services/customField.service';
import { GetOptionsCustomFieldParams } from '@/components/dto/customField.dto';

const getAllOptionsAsset = async (
  params: GetOptionsAssetParams,
): Promise<AxiosResponse<FetchOptionResponse>> => {
  return await AssetServices.getAssetOptions(params);
};

const getAllOptionsCustomField = async (
  params: GetOptionsCustomFieldParams,
): Promise<AxiosResponse<FetchOptionResponse>> => {
  return await CustomFieldService.getCustomFieldOptions(params);
};

export const filterFieldsAsset: FilterField[] = [
  {
    label: 'Asset',
    field: 'name',
    optionField: 'nameOptions',
    type: 'multiselect',
    placeholder: 'Select asset name',
    fetchOptionFn: getAllOptionsAsset,
  },
  {
    label: 'Group',
    field: 'group',
    optionField: 'groupOptions',
    type: 'multiselect',
    placeholder: 'Select group',
    fetchOptionFn: getAllOptionsAsset,
  },
  {
    label: 'Brand',
    field: 'brand',
    optionField: 'brandOptions',
    type: 'multiselect',
    placeholder: 'Select brand',
    fetchOptionFn: getAllOptionsAsset,
  },
  {
    label: 'Model/type',
    field: 'model',
    optionField: 'modelOptions',
    type: 'multiselect',
    placeholder: 'Select model/type',
    fetchOptionFn: getAllOptionsAsset,
  },
];

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
