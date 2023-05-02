import { lazy } from 'react';

const UtilitiesDocRoutes = [
  {
    path: '/documentation/atom/utilities/role',
    component: lazy(() => import('./role/RoleDoc')),
  },
  {
    path: '/documentation/atom/utilities/status',
    component: lazy(() => import('./status/StatusDoc')),
  },
  {
    path: '/documentation/atom/utilities/step',
    component: lazy(() => import('./step/StepDoc')),
  },
  {
    path: '/documentation/atom/utilities/priority',
    component: lazy(() => import('./priority/PriorityDoc')),
  },
  {
    path: '/documentation/atom/utilities/tool',
    component: lazy(() => import('./tool/ToolDoc')),
  },
];

export default UtilitiesDocRoutes;
