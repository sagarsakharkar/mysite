import { lazy } from 'react';

const EpisodesApp = lazy(() => import('./EpisodesApp'));

const EpisodesAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'entity/:entity/:uid/episodes',
      element: <EpisodesApp />,
    },
  ],
};

export default EpisodesAppConfig;

