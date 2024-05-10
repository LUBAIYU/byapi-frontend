import {history} from '@umijs/max';
import {requestConfig} from './requestConfig';
import {getLoginUserUsingGet} from "@/services/byapi-backend/userController";
import {RunTimeLayoutConfig} from "@@/plugin-layout/types";
import React from "react";
import {AvatarDropdown, AvatarName, Question} from "@/components";
import {Image} from "antd";

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

//退出登录，头像显示
export const layout: RunTimeLayoutConfig = ({initialState}) => {
  return {
    title: 'By API',
    logo: (
      <Image width={30} height={30} src={'https://img2.imgtp.com/2024/05/10/226I3pTg.svg'}/>
    ),
    actionsRender: () => [<Question key="doc"/>],
    avatarProps: {
      src: initialState?.loginUser?.userAvatar,
      title: <AvatarName/>,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: initialState?.loginUser?.userName,
    },
  };
};


/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 */
export const request = requestConfig;
