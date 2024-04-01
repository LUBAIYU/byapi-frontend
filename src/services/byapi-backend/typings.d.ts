declare namespace API {
  type deleteUserUsingDELETEParams = {
    /** id */
    id: number;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id: number;
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

  type PageBeanUserVo_ = {
    records?: UserVo[];
    total?: number;
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
    userAvatar?: string;
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
