import { lazy } from 'react';

const UsersDocRoutes = [
  {
    path: '/documentation/atom/users/contact',
    component: lazy(() => import('./contact/ContactDoc')),
  },
  {
    path: '/documentation/atom/users/group',
    component: lazy(() => import('./group/GroupDoc')),
  },
  {
    path: '/documentation/atom/users/permision',
    component: lazy(() => import('./permision/PermisionDoc')),
  },
]

export default UsersDocRoutes;
