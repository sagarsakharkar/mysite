import { lazy } from 'react';

const GettingStartedDocRoutes = [
  {
    path: '/documentation/atom/getting-started/introduction',
    component: lazy(() => import('./introduction/IntroductionDoc')),
  },
  {
    path: '/documentation/atom/getting-started/login',
    component: lazy(() => import('./login/LoginDoc')),
  },
  {
    path: '/documentation/atom/getting-started/notification',
    component: lazy(() => import('./notification/NotificationDoc')),
  },
  {
    path: '/documentation/atom/getting-started/logout',
    component: lazy(() => import('./logout/LogoutDoc')),
  },
  // {
  //   path: '/documentation/getting-started/installation',
  //   component: lazy(() => import('./installation/InstallationDoc')),
  // },
  // {
  //   path: '/documentation/getting-started/git-repository',
  //   component: lazy(() => import('./git-repository/GitRepositoryDoc')),
  // },
];

export default GettingStartedDocRoutes;
