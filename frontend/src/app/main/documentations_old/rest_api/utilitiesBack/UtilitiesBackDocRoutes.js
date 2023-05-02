import { lazy } from 'react';

const UtilitiesBackDocRoutes = [
  {
    path: '/documentation/rest_api/utilitiesBack/priority',
    component: lazy(() => import('./priority/PriorityBackDoc')),
  },
  {
    path: '/documentation/rest_api/utilitiesBack/role',
    component: lazy(() => import('./role/RoleBackDoc')),
  },
  {
    path: '/documentation/rest_api/utilitiesBack/status',
    component: lazy(() => import('./status/StatusBackDoc')),
  },
  {
    path: '/documentation/rest_api/utilitiesBack/step',
    component: lazy(() => import('./step/StepBackDoc')),
  },
  {
    path: '/documentation/rest_api/utilitiesBack/tool',
    component: lazy(() => import('./tool/ToolBackDoc')),
  },
];

export default UtilitiesBackDocRoutes;
