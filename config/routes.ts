export default [
  {
    name: '主页',
    icon: 'CloudOutlined',
    path: '/home',
    component: './Home'
  },
  {
    path: '/user',
    layout: false,
    routes: [
      {name: '登录', path: '/user/login', component: './User/Login'},
      {name: '注册', path: '/user/register', component: './User/Register'}],
  },
  {
    name: '用户管理',
    access: 'canAdmin',
    icon: 'UserOutlined',
    path: '/admin/user-manage',
    component: './Admin/UserManage'
  },
  {
    name: '接口管理',
    access: 'canAdmin',
    icon: 'FolderOpenOutlined',
    path: '/admin/interface-manage',
    component: './Admin/InterfaceManage'
  },
  {
    name: '接口详情',
    path: '/interface_info/:id',
    component: './InterfaceInfo',
    hideInMenu: true
  },
  {
    name: '个人信息',
    path: '/account/Info',
    component: './Info',
    hideInMenu: true
  },
  {path: '/', redirect: '/home'},
  {path: '*', layout: false, component: './404'},
];
