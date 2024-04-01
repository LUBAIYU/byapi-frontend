export default [
  {
    path: '/welcome',
    name: '欢迎',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/user',
    layout: false,
    routes: [
      {name: '登录', path: '/user/login', component: './User/Login'},
      {name: '注册', path: '/user/register', component: './User/Register'}],
  },
  {
    path: '/user-manage',
    name: '用户管理',
    icon: 'UserOutlined',
    access: 'canAdmin',
    component: './User/UserManage',
  },
  {
    path: '/interfaceInfo-manage',
    name: '接口管理',
    icon: 'FolderOpenOutlined',
    access: 'canAdmin',
    component: './InterfaceInfo'
  },
  {path: '/', redirect: '/welcome'},
  {path: '*', layout: false, component: './404'},
];
