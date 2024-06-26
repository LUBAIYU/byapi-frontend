// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addInterface POST /interface/add */
export async function addInterfaceUsingPost(
  body: API.InterfaceAddDto,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoid_>('/interface/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** alterStatus PUT /interface/alter/status */
export async function alterStatusUsingPut(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.alterStatusUsingPUTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoid_>('/interface/alter/status', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** deleteInterface DELETE /interface/delete/${param0} */
export async function deleteInterfaceUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteInterfaceUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResultVoid_>(`/interface/delete/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** getInterfaceById GET /interface/get/${param0} */
export async function getInterfaceByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInterfaceByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResultInterfaceVo_>(`/interface/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** getCodeExample GET /interface/get/code */
export async function getCodeExampleUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCodeExampleUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultString_>('/interface/get/code', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** invokeInterface POST /interface/invoke */
export async function invokeInterfaceUsingPost(
  body: API.InterfaceInvokeDto,
  options?: { [key: string]: any },
) {
  return request<API.ResultObject_>('/interface/invoke', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listInvokeRecords GET /interface/list/record */
export async function listInvokeRecordsUsingGet(options?: { [key: string]: any }) {
  return request<API.ResultListInterfaceVo_>('/interface/list/record', {
    method: 'GET',
    ...(options || {}),
  });
}

/** openPermission POST /interface/open */
export async function openPermissionUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.openPermissionUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoid_>('/interface/open', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listInterfacesByPage GET /interface/page */
export async function listInterfacesByPageUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listInterfacesByPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultPageBeanInterfaceInfo_>('/interface/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** updateInterface PUT /interface/update */
export async function updateInterfaceUsingPut(
  body: API.InterfaceUpdateDto,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoid_>('/interface/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
