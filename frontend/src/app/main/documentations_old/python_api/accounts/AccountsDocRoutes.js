import { lazy } from 'react';

const AccountsDocRoutes = [
  {
    path: '/documentation/python_api/accounts/groups',
    component: lazy(() => import('./groups/groupsDoc')),
  },
  {
    path: '/documentation/python_api/accounts/users',
    component: lazy(() => import('./users/usersDoc')),
  },
];

export default AccountsDocRoutes;
