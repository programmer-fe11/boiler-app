import { QueryParams } from '@fewangsit/workspace-api-services/src/types/fetchResponse.type';

export type TypeParamsBody = 'global' | 'specific';

export interface GetCustomFieldParams extends QueryParams {
  page: string;
  limit: string;
  sortBy: string;
  sortOrder: string;
  search: string;
  type: TypeParamsBody;
  status: boolean;
  dataType: string;
  isRequired: string;
  itemName: string;
}

export interface GetOptionsCustomFieldParams {
  dataTypeOptions?: boolean;
  nameOptions?: boolean;
}
export interface PostPutCustomFieldRequestBody {
  isRequired: boolean;
  type: TypeParamsBody;
  name: string;
  dataType: string;
  itemName: string[];
  optionValue: string[];
  isShowOnTable: boolean;
}

export interface ActivateInactivateCustomFieldBody {
  customFieldIds?: string[];
  status: boolean;
}

export interface DeleteCustomFieldBody {
  customFieldIds?: string[];
}
