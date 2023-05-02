import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const TaskBoardApp = lazy(() => import('./TaskBoardApp'));

const TaskBoardsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
			path: 'taskboard/project/:project',
			element: <TaskBoardApp />
		},
    {
			path: 'taskBoard',
			element: <TaskBoardApp />
		},
  ],
};

export default TaskBoardsAppConfig;


