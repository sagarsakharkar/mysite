import { lazy } from 'react';

const StepsApp = lazy(() => import('./StepsApp'));

const StepsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'utilities/steps',
      element: <StepsApp />,
    },
  ],
};

export default StepsAppConfig;

