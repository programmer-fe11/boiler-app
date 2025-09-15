/* eslint-disable multiline-comment-style */
/* eslint-disable capitalized-comments */
import { Option } from '@fewangsit/wangsvue/dropdown';
import { FilterField } from '@fewangsit/wangsvue/filtercontainer';

// TODO: Ini enggak dipake, dihapus aja
export const quickFilterFields: FilterField[] = [];

export const filterFields: FilterField[] = [
  {
    label: 'Asset',
    field: 'name',
    type: 'multiselect',
    placeholder: 'Select asset name',
    fetchOptionFn: async (): Promise<Option[]> => {
      try {
        return [{ label: 'Indonesia' }];
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
        return [{ label: 'Indonesia' }];
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
        return [{ label: 'Indonesia' }];
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
        return [{ label: 'Indonesia' }];
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  },
  // {
  //   label: 'Age',
  //   fields: ['minAge', 'maxAge'],
  //   type: 'rangenumber',
  //   placeholder: '0',
  // },
];
