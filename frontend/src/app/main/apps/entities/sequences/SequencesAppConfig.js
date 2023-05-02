import { lazy } from 'react';

const SequencesApp = lazy(() => import('./SequencesApp'));

const SequencesAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'entity/:entity/:uid/sequences',
      element: <SequencesApp />,
    },
  ],
};

export default SequencesAppConfig;

