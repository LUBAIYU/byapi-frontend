// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** delUserInterface DELETE /userInterface/delete */
export async function delUserInterfaceUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delUserInterfaceUsingDELETEParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoid_>('/userInterface/delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** pageUserInterfaces GET /userInterface/page */
export async function pageUserInterfacesUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageUserInterfacesUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultPageBeanUserInterfaceInfo_>('/userInterface/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** updateUserInterface PUT /userInterface/update */
export async function updateUserInterfaceUsingPut(
  body: API.UserInterfaceUpdateDto,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoid_>('/userInterface/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
