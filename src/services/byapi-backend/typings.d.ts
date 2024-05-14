declare namespace API {
  type addInvokeCountUsingPOSTParams = {
    /** interfaceId */
    interfaceId?: number;
  };

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

  type delUserInterfaceUsingDELETEParams = {
    /** id */
    id?: number;
  };

  type EmailDto = {
    email?: string;
    verCode?: string;
  };

  type getAvatarUsingGETParams = {
    /** fileName */
    fileName: string;
  };

  type getCodeExampleUsingGETParams = {
    /** interfaceId */
    interfaceId?: number;
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
    codeExample?: string;
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
    codeExample?: string;
    description?: string;
    id?: number;
    method?: string;
    name?: string;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    url?: string;
  };

  type InterfaceVo = {
    codeExample?: string;
    createTime?: string;
    description?: string;
    id?: number;
    isDeleted?: number;
    leftNum?: number;
    method?: string;
    name?: string;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    status?: number;
    totalNum?: number;
    updateTime?: string;
    url?: string;
  };

  type InvokeCountVo = {
    count?: number;
    name?: string;
  };

  type KeyVo = {
    accessKey?: string;
    secretKey?: string;
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

  type openPermissionUsingPOSTParams = {
    /** interfaceId */
    interfaceId?: number;
  };

  type PageBeanInterfaceInfo_ = {
    records?: InterfaceInfo[];
    total?: number;
  };

  type PageBeanUser_ = {
    records?: User[];
    total?: number;
  };

  type PageBeanUserInterfaceInfo_ = {
    records?: UserInterfaceInfo[];
    total?: number;
  };

  type pageUserInterfacesUsingGETParams = {
    current?: number;
    id?: number;
    interfaceInfoId?: number;
    pageSize?: number;
    userId?: number;
  };

  type RegisterDto = {
    confirmPassword?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type ResultInterfaceVo_ = {
    code?: number;
    data?: InterfaceVo;
    message?: string;
  };

  type ResultKeyVo_ = {
    code?: number;
    data?: KeyVo;
    message?: string;
  };

  type ResultListInterfaceVo_ = {
    code?: number;
    data?: InterfaceVo[];
    message?: string;
  };

  type ResultListInvokeCountVo_ = {
    code?: number;
    data?: InvokeCountVo[];
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

  type ResultPageBeanUserInterfaceInfo_ = {
    code?: number;
    data?: PageBeanUserInterfaceInfo_;
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

  type sendMailUsingPOSTParams = {
    /** email */
    email?: string;
  };

  type User = {
    accessKey?: string;
    createTime?: string;
    email?: string;
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

  type UserInterfaceInfo = {
    createTime?: string;
    id?: number;
    interfaceId?: number;
    isDeleted?: number;
    leftNum?: number;
    totalNum?: number;
    updateTime?: string;
    userId?: number;
  };

  type UserInterfaceUpdateDto = {
    id?: number;
    leftNum?: number;
    totalNum?: number;
  };

  type UserUpdateDto = {
    email?: string;
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
    email?: string;
    gender?: number;
    id?: number;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };
}
