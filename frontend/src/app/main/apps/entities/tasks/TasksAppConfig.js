import { lazy } from 'react';

const TasksApp = lazy(() => import('./TasksApp'));

const TasksAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'entity/:entity/:uid/tasks',
      element: <TasksApp />,
    },
    {
      path: 'entity/:entity/:uid/assign-task',
      element: <TasksApp type="Assignment" />,
    },
  ],
};

export default TasksAppConfig;

