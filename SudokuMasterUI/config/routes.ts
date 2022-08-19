export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
      {
        component: './404',
      },
    ],
  },
  // {
  //   path: '/welcome',
  //   name: 'welcome',
  //   icon: 'smile',
  //   component: './Welcome',
  // },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },
  {
    name: 'sudoku',
    icon: 'crown',
    path: '/welcome',
    component: './sudoku/Sudoku',
  },
  {
    name: 'user',
    icon: 'user',
    path: '/user',
    access: 'canAdmin',
    routes: [
      {
        path: '/user/full',
        name: 'alluser',
        icon: 'user',
        component: './User/UserList',
      },
      {
        path: '/user/UserPageable',
        name: 'pageableuser',
        icon: 'user',
        component: './User/UserPageable',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
