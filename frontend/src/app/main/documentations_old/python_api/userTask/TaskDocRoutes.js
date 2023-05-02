import { lazy } from 'react';

const TaskDocRoutes = [
  {
    path: '/documentation/python_api/userTask',
    component: lazy(() => import('./userTaskDoc')),
  },
];

export default TaskDocRoutes;
