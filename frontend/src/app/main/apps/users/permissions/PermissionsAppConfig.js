import { lazy } from 'react';

const PermissionsApp = lazy(() => import('./PermisionsApp'));

const PermissionsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'users/permissions',
      element: <PermissionsApp />,
    },
  ],
};

export default PermissionsAppConfig;

