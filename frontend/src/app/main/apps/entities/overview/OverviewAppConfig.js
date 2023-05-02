import { lazy } from 'react';

const OverviewApp = lazy(() => import('./OverviewApp'));

const OverviewAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'entity/:entity/:uid/overview',
      element: <OverviewApp />,
    },
  ],
};

export default OverviewAppConfig;
