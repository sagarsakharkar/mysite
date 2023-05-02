import { lazy } from 'react';

const AccountsBackDocRoutes = [
  {
    path: '/documentation/rest_api/accountsBack/groups',
    component: lazy(() => import('./groups/groupsBackDoc')),
  },
  {
    path: '/documentation/rest_api/accountsBack/users',
    component: lazy(() => import('./users/usersBackDoc')),
  },
];

export default AccountsBackDocRoutes;