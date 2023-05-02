import { lazy } from 'react';

const PrioritiesApp = lazy(() => import('./PrioritiesApp'));

const PrioritiesAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'utilities/priorities',
      element: <PrioritiesApp />,
    },
  ],
};

export default PrioritiesAppConfig;

