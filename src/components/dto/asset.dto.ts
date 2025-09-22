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
  brandOptions?: boolean;
  nameOptions?: boolean;
  categoryOptions?: boolean;
  modelOptions?: boolean;
  groupOptions?: boolean;
}

export interface RegisterEditAssetBody {
  category?: string;
  brand?: string;
  model?: string;
  group?: string;
  aliasName?: string;
  name?: string;
  assetImage?: string;
}
export interface EditAssetBody {
  category?: string;
  brand?: string;
  model?: string;
  aliasName?: string;
  name?: string;
  assetImage?: string;
}
