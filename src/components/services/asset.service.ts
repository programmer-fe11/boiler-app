import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { FetchResponse } from '@fewangsit/wangsvue/datatable';
import { FetchDetailResponse } from '@fewangsit/workspace-api-services/src/types/fetchResponse.type';
import {
  GetOptionsParams,
  GetAssetParams,
  RegisterEditAssetBody,
} from '../dto/asset.dto';
import { Asset } from '@/types/asset.type';
import { getBaseURL } from '@fewangsit/workspace-api-services';
import { FetchOptionResponse } from '@fewangsit/wangsvue/filtercontainer';

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
  getAllAsset: (
    params: GetAssetParams,
  ): Promise<AxiosResponse<FetchResponse<Asset>>> => {
    return API({ params }).get('');
  },

  getAssetById: (
    id: string,
  ): Promise<AxiosResponse<FetchDetailResponse<Asset>>> => {
    return API().get(`/detail/${id}`);
  },

  getOptions: (
    params: GetOptionsParams,
  ): Promise<AxiosResponse<GetOptionsResponse>> => {
    return API({ params }).get('/options');
  },

  postAsset: (body: RegisterEditAssetBody): Promise<AxiosResponse> => {
    return API().post('', body);
  },

  editAsset: (
    id: string,
    body: RegisterEditAssetBody,
  ): Promise<AxiosResponse> => {
    return API().put(`/${id}`, body);
  },
};

export default AssetServices;
