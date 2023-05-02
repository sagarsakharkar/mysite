import { lazy } from 'react';

const TaskBackDocRoutes = [
  {
    path: '/documentation/rest_api/userTaskBack',
    component: lazy(() => import('./userTaskBackDoc')),
  },
];

export default TaskBackDocRoutes;
