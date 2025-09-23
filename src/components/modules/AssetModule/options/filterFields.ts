import { Option } from '@fewangsit/wangsvue/dropdown';
import { FilterField } from '@fewangsit/wangsvue/filtercontainer';
import { GetOptionsParams } from '@/components/dto/asset.dto';
import AssetServices from '@/components/services/asset.service';
import { FilterOptions } from '@fewangsit/workspace-api-services/src/types/fetchResponse.type';

const getAllOptions = async (
  params: GetOptionsParams,
): Promise<FilterOptions<GetOptionsParams>> => {
  try {
    const response = await AssetServices.getOptions(params);
    return response.data.data;
  } catch (error) {
    console.error(error);

    return {
      categoryOptions: [],
      nameOptions: [],
      groupOptions: [],
      brandOptions: [],
      modelOptions: [],
    };
  }
};

export const filterFields: FilterField[] = [
  {
    label: 'Asset',
    field: 'name',
    type: 'multiselect',
    placeholder: 'Select asset name',
    fetchOptionFn: async (): Promise<Option[]> => {
      try {
        const { nameOptions } = await getAllOptions({});
        return nameOptions as Option[];
      } catch (error) {
        console.error(error);
        return [];
      }
    },
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
