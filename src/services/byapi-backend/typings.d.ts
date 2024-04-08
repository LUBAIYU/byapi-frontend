declare namespace API {
  type deleteUserUsingDELETEParams = {
    /** id */
    id: number;
  };

  type delInterfaceInfoUsingDELETEParams = {
    /** id */
    id: number;
  };

  type getInterfaceInfoByIdUsingGETParams = {
    /** id */
    id: number;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id: number;
  };

  type InterfaceInfoAddDto = {
    description?: string;
    method?: string;
    name?: string;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    status?: number;
    url?: string;
  };

  type InterfaceInfoUpdateDto = {
    description?: string;
    id?: number;
    method?: string;
    name?: string;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    status?: number;
    url?: string;
  };

  type InterfaceInfoVo = {
    createTime?: string;
    description?: string;
    id?: number;
    method?: string;
    name?: string;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    status?: number;
    updateTime?: string;
    url?: string;
  };

  type listInterfaceInfosByPageUsingGETParams = {
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

  type PageBeanInterfaceInfoVo_ = {
    records?: InterfaceInfoVo[];
    total?: number;
  };

  type PageBeanUserVo_ = {
    records?: UserVo[];
    total?: number;
  };

  type ResultInterfaceInfoVo_ = {
    code?: number;
    data?: InterfaceInfoVo;
    message?: string;
  };

  type ResultPageBeanInterfaceInfoVo_ = {
    code?: number;
    data?: PageBeanInterfaceInfoVo_;
    message?: string;
  };

  type ResultPageBeanUserVo_ = {
    code?: number;
    data?: PageBeanUserVo_;
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

  type StatusUpdateDto = {
    id?: number;
    status?: number;
  };

  type UpdateStatusDto = {
    id?: number;
    status?: number;
  };

  type UserLoginDto = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserRegisterDto = {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type UserUpdateDto = {
    gender?: number;
    id?: number;
    status?: number;
    userAccount?: string;
    userName?: string;
    userRole?: string;
  };

  type UserVo = {
    createTime?: string;
    gender?: number;
    id?: number;
    status?: number;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };
}
