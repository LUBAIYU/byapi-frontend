import type {RequestConfig} from '@umijs/max';

/**
 * 全局请求配置
 */
export const requestConfig: RequestConfig = {
  // 请求地址
  baseURL: 'http://localhost:9010',
  // 允许携带cookie
  withCredentials: true,
  // 请求拦截器
  requestInterceptors: [],

  // 响应拦截器
  responseInterceptors: [],
};
