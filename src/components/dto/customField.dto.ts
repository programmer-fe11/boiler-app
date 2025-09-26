import { QueryParams } from '@fewangsit/workspace-api-services/src/types/fetchResponse.type';

export interface GetCustomFieldParams extends QueryParams {
  page: string;
  limit: string;
  sortBy: string;
  sortOrder: string;
  search: string;
  type: string;
  status: boolean;
  dataType: string;
  isRequired: string;
  category: string;
}

export interface GetOptionsCustomFieldParams {
  dataTypeOptions: string;
  nameOptions: string;
}
export interface CreateCustomFieldRequest {
  isRequired: boolean;
  type: string;
  name: string;
  dataType: string;
  category: string[];
  optionValue: string[];
  isShowOnTable: boolean;
}
