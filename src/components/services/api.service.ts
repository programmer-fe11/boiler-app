// TODO: Rename file ini jadi asset.service.ts
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { FetchResponse } from '@fewangsit/wangsvue/datatable';
import { FetchOptionResponse } from '@fewangsit/workspace-api-services/src/types/fetchResponse.type';
import {
  GetOptionsParams,
  GetAssetParams,
  RegisterAssetBody,
} from '../dto/asset.dto';
import { Member } from '@/types/member.type';
import { getBaseURL } from '@fewangsit/workspace-api-services';

type GetOptionsResponse = FetchOptionResponse<GetOptionsParams>;

const API = ({ headers = {}, params = {} } = {}): AxiosInstance => {
  const user = JSON.parse(localStorage.getItem('user') ?? '{}');
  const BASE_URL = getBaseURL();

  const instance = axios.create({
    baseURL: `${BASE_URL}/v2/assets`,
    headers: {
      'Content-type': 'multipart/form-data',
      'Accept': 'application/json',
      'Authorization': `Bearer ${user.token}`,
      ...headers,
    },
    params,
  });

  return instance;
};

const AssetServices = {
  getAsset: (
    params: GetAssetParams,
  ): Promise<AxiosResponse<FetchResponse<Member>>> => {
    return API({ params }).get('');
  },

  /*
   * TODO: Kalau Dayen liat di API spec, get asset by ID enggak pake param
   * TODO: Ubah tipe responnya dari { data: Member } jadi FetchDetailResponse<Member>,
   * diimport tipenya
   */
  getAssetById: (
    id: string,
    params: GetAssetParams,
  ): Promise<AxiosResponse<{ data: Member }>> => {
    return API({ params }).get(`/detail/${id}`);
  },

  getOptions: (
    params: GetOptionsParams,
  ): Promise<AxiosResponse<GetOptionsResponse>> => {
    return API({ params }).get('/options');
  },

  postAsset: (body: RegisterAssetBody): Promise<AxiosResponse> => {
    return API().post('', body);
  },
}; // TODO: Komen di bawah dihapus, jangan kebiasaan ngekomentarin kode ya
// http://localhost:8040/v2/assets/

export default AssetServices;
