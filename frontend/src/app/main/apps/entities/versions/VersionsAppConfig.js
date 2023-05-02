import { lazy } from 'react';

const VersionsApp = lazy(() => import('./VersionsApp'));

const VersionsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'entity/:entity/:uid/versions',
      element: <VersionsApp />,
    },
  ],
};

export default VersionsAppConfig;

