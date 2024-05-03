declare namespace API {
  type alterStatusUsingPUT1Params = {
    /** id */
    id?: number;
    /** status */
    status?: number;
  };

  type alterStatusUsingPUTParams = {
    /** id */
    id?: number;
    /** status */
    status?: number;
  };

  type deleteInterfaceUsingDELETEParams = {
    /** id */
    id: number;
  };

  type deleteUserUsingDELETEParams = {
    /** id */
    id: number;
  };

  type getAvatarUsingGETParams = {
    /** fileName */
    fileName: string;
  };

  type getInterfaceByIdUsingGETParams = {
    /** id */
    id: number;
  };

  type InterfaceAddDto = {
    description?: string;
    method?: string;
    name?: string;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    status?: number;
    url?: string;
  };

  type InterfaceInfo = {
    createTime?: string;
    description?: string;
    id?: number;
    isDeleted?: number;
    method?: string;
    name?: string;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    status?: number;
    updateTime?: string;
    url?: string;
  };

  type InterfaceInvokeDto = {
    id?: number;
    userRequestParams?: string;
  };

  type InterfaceUpdateDto = {
    description?: string;
    id?: number;
    method?: string;
    name?: string;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    url?: string;
  };

  type listInterfacesByPageUsingGETParams = {
    current?: number;
    id?: number;
    method?: string;
    name?: string;
    pageSize?: number;
    status?: number;
    url?: string;
  };

  type listUsersByPageUsingGETParams = {
    current?: number;
    gender?: number;
    id?: number;
    pageSize?: number;
    status?: number;
    userAccount?: string;
    userName?: string;
  };

  type LoginDto = {
    userAccount?: string;
    userPassword?: string;
  };

  type PageBeanInterfaceInfo_ = {
    records?: InterfaceInfo[];
    total?: number;
  };

  type PageBeanUser_ = {
    records?: User[];
    total?: number;
  };

  type RegisterDto = {
    confirmPassword?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type ResultInterfaceInfo_ = {
    code?: number;
    data?: InterfaceInfo;
    message?: string;
  };

  type ResultObject_ = {
    code?: number;
    data?: Record<string, any>;
    message?: string;
  };

  type ResultPageBeanInterfaceInfo_ = {
    code?: number;
    data?: PageBeanInterfaceInfo_;
    message?: string;
  };

  type ResultPageBeanUser_ = {
    code?: number;
    data?: PageBeanUser_;
    message?: string;
  };

  type ResultString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type ResultUserVo_ = {
    code?: number;
    data?: UserVo;
    message?: string;
  };

  type ResultVoid_ = {
    code?: number;
    message?: string;
  };

  type User = {
    accessKey?: string;
    createTime?: string;
    gender?: number;
    id?: number;
    isDeleted?: number;
    salt?: string;
    secretKey?: string;
    status?: number;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userRole?: string;
  };

  type UserUpdateDto = {
    gender?: number;
    id?: number;
    status?: number;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type UserVo = {
    createTime?: string;
    gender?: number;
    id?: number;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };
}
