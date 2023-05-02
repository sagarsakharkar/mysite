import { lazy } from 'react';

const UtilitiesDocRoutes = [
  {
    path: '/documentation/python_api/utilities/priority',
    component: lazy(() => import('./priority/PriorityDoc')),
  },
  {
    path: '/documentation/python_api/utilities/role',
    component: lazy(() => import('./role/RoleDoc')),
  },
  {
    path: '/documentation/python_api/utilities/status',
    component: lazy(() => import('./status/StatusDoc')),
  },
  {
    path: '/documentation/python_api/utilities/step',
    component: lazy(() => import('./step/StepDoc')),
  },
  {
    path: '/documentation/python_api/utilities/tool',
    component: lazy(() => import('./tool/ToolDoc')),
  },
];

export default UtilitiesDocRoutes;
