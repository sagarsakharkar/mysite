import { lazy } from 'react';

const AssetsApp = lazy(() => import('./AssetsApp'));

const AssetsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'entity/:entity/:uid/assets',
      element: <AssetsApp />,
    },
  ],
};

export default AssetsAppConfig;

