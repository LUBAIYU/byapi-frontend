import {history} from '@umijs/max';
import {requestConfig} from './requestConfig';
import {getLoginUserUsingGet} from "@/services/byapi-backend/userController";

const loginPath = '/user/login';
const registerPath = '/user/register';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<InitialState> {
  const state: InitialState = {
    loginUser: undefined
  };
  try {
    const path = window.location.pathname;
    if (path === loginPath || path === registerPath) {
      return state;
    }
    const res = await getLoginUserUsingGet();
    if (res.data) {
      state.loginUser = res.data;
    } else {
      throw new Error(res.message)
    }
  } catch (error) {
    history.push(loginPath);
  }
  return state;
}

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = requestConfig;
