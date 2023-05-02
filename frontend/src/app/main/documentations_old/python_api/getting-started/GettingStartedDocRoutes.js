import { lazy } from 'react';

const GettingStartedDocRoutes = [
  {
    path: '/documentation/python_api/getting-started/introduction',
    component: lazy(() => import('./introduction/IntroductionDoc')),
  },
];

export default GettingStartedDocRoutes;
