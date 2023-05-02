import { lazy } from 'react';

const RolesApp = lazy(() => import('./RolesApp'));

const RolesAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'utilities/roles',
      element: <RolesApp />,
    },
  ],
};

export default RolesAppConfig;

