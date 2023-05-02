import { lazy } from 'react';

const StatusesApp = lazy(() => import('./StatusesApp'));

const StatusesAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'utilities/statuses',
      element: <StatusesApp />,
    },
  ],
};

export default StatusesAppConfig;

