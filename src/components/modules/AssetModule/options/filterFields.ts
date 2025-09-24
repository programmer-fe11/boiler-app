import { Option } from '@fewangsit/wangsvue/dropdown';
import { AxiosResponse } from 'axios';
import {
  FetchOptionResponse,
  FilterField,
} from '@fewangsit/wangsvue/filtercontainer';
import { GetOptionsParams } from '@/components/dto/asset.dto';
import AssetServices from '@/components/services/asset.service';

const getAllOptions = async (
  params: GetOptionsParams,
): Promise<AxiosResponse<FetchOptionResponse>> => {
  return await AssetServices.getOptions(params);
};

export const filterFields: FilterField[] = [
  /*
   * TODO: Untuk fungsi getAllOptions, udah aku singkatin, filter name juga udah aku sesuaiin,
   * filter yang lainnya juga disesuaiin ya.
   *
   * `optionField` itu untuk query API, jadi untuk filter name, bakal request dengan
   * query `nameOptions: true`, dan return options yang `nameOptions`.
   */
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
    type: 'multiselect',
    placeholder: 'Select group',
    fetchOptionFn: async (): Promise<Option[]> => {
      try {
        const { groupOptions } = await getAllOptions({});
        return groupOptions as Option[];
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  },
  {
    label: 'Brand',
    field: 'brand',
    type: 'multiselect',
    placeholder: 'Select brand',
    fetchOptionFn: async (): Promise<Option[]> => {
      try {
        const { brandOptions } = await getAllOptions({});
        return brandOptions as Option[];
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  },
  {
    label: 'Model/type',
    field: 'model',
    type: 'multiselect',
    placeholder: 'Select model/type',
    fetchOptionFn: async (): Promise<Option[]> => {
      try {
        const { modelOptions } = await getAllOptions({});
        return modelOptions as Option[];
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  },
];
