import { getBaseURL } from '@fewangsit/workspace-api-services';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { GetAssetParams } from '../dto/asset.dto';
import { FetchResponse } from '@fewangsit/wangsvue/datatable';
import { CustomField } from '@/types/customField.type';

const API = ({ headers = {}, params = {} } = {}): AxiosInstance => {
  const BASE_URL = getBaseURL();

  const instance = axios.create({
    baseURL: `${BASE_URL}/v2/custom-field`,
    headers: {
      'Content-type': 'multipart/form-data',
      'Accept': 'application/json',

      ...headers,
    },
    params,
  });

  return instance;
};

const CustomFieldService = {
  getAllCustomField: (
    params: GetAssetParams,
  ): Promise<AxiosResponse<FetchResponse<CustomField>>> => {
    return API({ params }).get('');
  },
};

export default CustomFieldService;
