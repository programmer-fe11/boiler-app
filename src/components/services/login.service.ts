import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getBaseURL } from '@fewangsit/workspace-api-services';
import { LoginBody } from '../dto/login.dto';

const API = ({ headers = {}, params = {} } = {}): AxiosInstance => {
  const user = JSON.parse(localStorage.getItem('user') ?? '{}');
  const BASE_URL = getBaseURL();

  const instance = axios.create({
    baseURL: `${BASE_URL}/v2/login-user`,
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

const LoginServices = {
  postLogin: (body: LoginBody): Promise<AxiosResponse> => {
    return API().post('', body);
  },
};

export default LoginServices;
