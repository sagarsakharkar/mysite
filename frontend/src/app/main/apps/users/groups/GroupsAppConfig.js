import { lazy } from 'react';

const GroupsApp = lazy(() => import('./GroupsApp'));

const GroupsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'users/groups',
      element: <GroupsApp />,
    },
  ],
};

export default GroupsAppConfig;

