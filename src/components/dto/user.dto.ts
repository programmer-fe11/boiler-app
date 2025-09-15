import { QueryParams } from '@fewangsit/workspace-api-services/src/types/fetchResponse.type';

export interface GetUsersParams extends QueryParams {
  country?: string;
  minAge?: number;
  maxAge?: number;
}

export interface GetOptionsParams {
  country?: boolean;
}
