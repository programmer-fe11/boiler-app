import { getBaseURL } from '@fewangsit/workspace-api-services';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { FetchResponse } from '@fewangsit/wangsvue/datatable';
import { CustomField } from '@/types/customField.type';
import {
  ActivateInactivateCustomFieldBody,
  PostPutCustomFieldRequestBody,
  DeleteCustomFieldBody,
  GetCustomFieldParams,
  GetOptionsCustomFieldParams,
  TypeParamsBody,
} from '../dto/customField.dto';
import { FetchOptionResponse } from '@fewangsit/wangsvue/filtercontainer';

type GetOptionsCustomFieldResponse =
  FetchOptionResponse<GetOptionsCustomFieldParams>;

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
    type: TypeParamsBody,
  ): Promise<AxiosResponse<FetchResponse<CustomField>>> => {
    return API({ params: { ...params, type } }).get('');
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
    body: PostPutCustomFieldRequestBody,
    type: TypeParamsBody,
  ): Promise<AxiosResponse> => {
    return API().post('', { ...body, type });
  },

  editCustomField: (
    id: string,
    body: PostPutCustomFieldRequestBody,
    type: TypeParamsBody,
  ): Promise<AxiosResponse> => {
    return API().put(`/edit/${id}`, { ...body, type });
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
