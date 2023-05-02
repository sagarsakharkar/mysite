import { lazy } from 'react';

const StepAssetApp = lazy(() => import('./StepAssetApp'));

const StepAssetAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'utilities/stepAsset',
      element: <StepAssetApp />,
    },
  ],
};

export default StepAssetAppConfig;

