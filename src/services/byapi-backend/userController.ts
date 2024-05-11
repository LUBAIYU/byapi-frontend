// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** alterStatus PUT /user/alter/status */
export async function alterStatusUsingPut1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.alterStatusUsingPUT1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoid_>('/user/alter/status', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** applyKey POST /user/apply/key */
export async function applyKeyUsingPost(options?: { [key: string]: any }) {
  return request<API.ResultKeyVo_>('/user/apply/key', {
    method: 'POST',
    ...(options || {}),
  });
}

/** deleteUser DELETE /user/delete/${param0} */
export async function deleteUserUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResultVoid_>(`/user/delete/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** emailLogin POST /user/email/login */
export async function emailLoginUsingPost(body: API.EmailDto, options?: { [key: string]: any }) {
  return request<API.ResultUserVo_>('/user/email/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** emailRegister POST /user/email/register */
export async function emailRegisterUsingPost(body: API.EmailDto, options?: { [key: string]: any }) {
  return request<API.ResultVoid_>('/user/email/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getAvatar GET /user/get/avatar/${param0} */
export async function getAvatarUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAvatarUsingGETParams,
  options?: { [key: string]: any },
) {
  const { fileName: param0, ...queryParams } = params;
  return request<any>(`/user/get/avatar/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** getKeyById GET /user/get/key */
export async function getKeyByIdUsingGet(options?: { [key: string]: any }) {
  return request<API.ResultKeyVo_>('/user/get/key', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getLoginUser GET /user/get/loginUser */
export async function getLoginUserUsingGet(options?: { [key: string]: any }) {
  return request<API.ResultUserVo_>('/user/get/loginUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** userLogin POST /user/login */
export async function userLoginUsingPost(body: API.LoginDto, options?: { [key: string]: any }) {
  return request<API.ResultUserVo_>('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userLogout POST /user/logout */
export async function userLogoutUsingPost(options?: { [key: string]: any }) {
  return request<API.ResultVoid_>('/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** sendMail POST /user/mail/send */
export async function sendMailUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sendMailUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoid_>('/user/mail/send', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listUsersByPage GET /user/page */
export async function listUsersByPageUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUsersByPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultPageBeanUser_>('/user/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** userRegister POST /user/register */
export async function userRegisterUsingPost(
  body: API.RegisterDto,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoid_>('/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateUser PUT /user/update */
export async function updateUserUsingPut(
  body: API.UserUpdateDto,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoid_>('/user/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** uploadAvatar POST /user/upload/avatar */
export async function uploadAvatarUsingPost(body: string, options?: { [key: string]: any }) {
  const formData = new FormData();

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.ResultString_>('/user/upload/avatar', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
