import { lazy } from 'react';

const GettingStartedDocRoutes = [
  {
    path: '/documentation/rest_api/getting-started/introduction',
    component: lazy(() => import('./introduction/IntroductionBackDoc')),
  },
  {
    path: '/documentation/rest_api/getting-started/login',
    component: lazy(() => import('./login/LoginBackDoc')),
  },
];

export default GettingStartedDocRoutes;
