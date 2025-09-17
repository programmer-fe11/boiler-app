// TODO: Rename file ini jadi asset.dto.ts. Kalau ada nama file lain yang enggak sesuai, diubah juga
import { QueryParams } from '@fewangsit/workspace-api-services/src/types/fetchResponse.type';

/*
 * TODO: Ubah nama interface ini jadi GetAssetsParams, pake tombol F2 kayak yang aku ajarin kemarin.
 * Kalau ada nama const/interface/type lain yang enggak sesuai, diubah juga
 */
export interface GetUsersParams extends QueryParams {
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
