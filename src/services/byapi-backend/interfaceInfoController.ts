// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addInterfaceInfo POST /api/interfaceInfo/add */
export async function addInterfaceInfoUsingPost(
  body: API.InterfaceInfoAddDto,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoid_>('/api/interfaceInfo/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** delInterfaceInfo DELETE /api/interfaceInfo/delete/${param0} */
export async function delInterfaceInfoUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delInterfaceInfoUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResultVoid_>(`/api/interfaceInfo/delete/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** getInterfaceInfoById GET /api/interfaceInfo/get/${param0} */
export async function getInterfaceInfoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInterfaceInfoByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResultInterfaceInfoVo_>(`/api/interfaceInfo/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** listInterfaceInfosByPage GET /api/interfaceInfo/list/page */
export async function listInterfaceInfosByPageUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listInterfaceInfosByPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultPageBeanInterfaceInfoVo_>('/api/interfaceInfo/list/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** updateInterfaceInfo PUT /api/interfaceInfo/update */
export async function updateInterfaceInfoUsingPut(
  body: API.InterfaceInfoUpdateDto,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoid_>('/api/interfaceInfo/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateInterfaceInfoStatus PUT /api/interfaceInfo/update/status */
export async function updateInterfaceInfoStatusUsingPut(
  body: API.StatusUpdateDto,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoid_>('/api/interfaceInfo/update/status', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
