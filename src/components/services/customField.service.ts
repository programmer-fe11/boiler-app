import { getBaseURL } from '@fewangsit/workspace-api-services';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { FetchResponse } from '@fewangsit/wangsvue/datatable';
import { CustomField } from '@/types/customField.type';
import {
  ActivateInactivateCustomFieldBody,
  CreateCustomFieldRequestBody,
  DeleteCustomFieldBody,
  GetCustomFieldParams,
  GetOptionsCustomFieldParams,
} from '../dto/customField.dto';

type GetOptionsCustomFieldResponse = FetchResponse<GetOptionsCustomFieldParams>;

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
    params: GetCustomFieldParams,
  ): Promise<AxiosResponse<FetchResponse<CustomField>>> => {
    return API({ params }).get('');
  },

  getCustomFieldOptions: (
    params: GetOptionsCustomFieldParams,
  ): Promise<AxiosResponse<GetOptionsCustomFieldResponse>> => {
    return API({ params }).get('/options');
  },

  getCustomFieldById: (
    id: string,
  ): Promise<AxiosResponse<FetchResponse<CustomField>>> => {
    return API().get(`/edit/${id}`);
  },

  postCustomField: (
    body: CreateCustomFieldRequestBody,
  ): Promise<AxiosResponse> => {
    return API().post('', body);
  },

  editCustomField: (
    id: string,
    body: CreateCustomFieldRequestBody,
  ): Promise<AxiosResponse> => {
    return API().put(`/edit/${id}`, body);
  },

  editStatusByBulk: (
    body: ActivateInactivateCustomFieldBody,
  ): Promise<AxiosResponse> => {
    return API().put('/bulk', body);
  },

  deleteCustomField: (body: DeleteCustomFieldBody): Promise<AxiosResponse> => {
    return API().delete('/bulk', { data: body });
  },
};

export default CustomFieldService;
