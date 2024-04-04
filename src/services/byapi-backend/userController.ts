// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** deleteUser DELETE /api/user/delete/${param0} */
export async function deleteUserUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResultVoid_>(`/api/user/delete/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** getUserById GET /api/user/get/${param0} */
export async function getUserByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResultUserVo_>(`/api/user/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** listUsersByPage GET /api/user/list/page */
export async function listUsersByPageUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUsersByPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultPageBeanUserVo_>('/api/user/list/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** login POST /api/user/login */
export async function loginUsingPost(body: API.UserLoginDto, options?: { [key: string]: any }) {
  return request<API.ResultUserVo_>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getLoginUser GET /api/user/loginUser */
export async function getLoginUserUsingGet(options?: { [key: string]: any }) {
  return request<API.ResultUserVo_>('/api/user/loginUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** logout POST /api/user/logout */
export async function logoutUsingPost(options?: { [key: string]: any }) {
  return request<API.ResultVoid_>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** register POST /api/user/register */
export async function registerUsingPost(
  body: API.UserRegisterDto,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoid_>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateUser PUT /api/user/update */
export async function updateUserUsingPut(
  body: API.UserUpdateDto,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoid_>('/api/user/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateUserStatus PUT /api/user/update/status */
export async function updateUserStatusUsingPut(
  body: API.UpdateStatusDto,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoid_>('/api/user/update/status', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
