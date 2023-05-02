import { lazy } from 'react';

const ShotsApp = lazy(() => import('./ShotsApp'));

const ShotsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'entity/:entity/:uid/shots',
      element: <ShotsApp />,
    },
  ],
};

export default ShotsAppConfig;

