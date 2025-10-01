import { AxiosResponse } from 'axios';
import {
  FetchOptionResponse,
  FilterField,
} from '@fewangsit/wangsvue/filtercontainer';
import { GetOptionsAssetParams } from '@/components/dto/asset.dto';
import AssetServices from '@/components/services/asset.service';

const getAllOptionsAsset = async (
  params: GetOptionsAssetParams,
): Promise<AxiosResponse<FetchOptionResponse>> => {
  return await AssetServices.getAssetOptions(params);
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
