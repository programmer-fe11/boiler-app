import { QueryParams } from '@fewangsit/workspace-api-services/src/types/fetchResponse.type';

export interface GetAssetParams extends QueryParams {
  search?: string;
  brand?: string[];
  group?: string[];
  name?: string[];
  model?: string[];
  page?: number;
  limit?: number;
  sortOrder?: number | 1 | -1;
  sortBy?: string;
  _id?: string;
}

export interface GetOptionsParams {
  country?: boolean;
}
