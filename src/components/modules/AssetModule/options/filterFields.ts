import { AxiosResponse } from 'axios';
import {
  FetchOptionResponse,
  FilterField,
} from '@fewangsit/wangsvue/filtercontainer';
import { GetOptionsAssetParams } from '@/components/dto/asset.dto';
import AssetServices from '@/components/services/asset.service';

const getAllOptions = async (
  params: GetOptionsAssetParams,
): Promise<AxiosResponse<FetchOptionResponse>> => {
  return await AssetServices.getOptions(params);
};

export const filterFields: FilterField[] = [
  {
    label: 'Asset',
    field: 'name',
    optionField: 'nameOptions',
    type: 'multiselect',
    placeholder: 'Select asset name',
    fetchOptionFn: getAllOptions,
  },
  {
    label: 'Group',
    field: 'group',
    optionField: 'groupOptions',
    type: 'multiselect',
    placeholder: 'Select group',
    fetchOptionFn: getAllOptions,
  },
  {
    label: 'Brand',
    field: 'brand',
    optionField: 'brandOptions',
    type: 'multiselect',
    placeholder: 'Select brand',
    fetchOptionFn: getAllOptions,
  },
  {
    label: 'Model/type',
    field: 'model',
    optionField: 'modelOptions',
    type: 'multiselect',
    placeholder: 'Select model/type',
    fetchOptionFn: getAllOptions,
  },
];
