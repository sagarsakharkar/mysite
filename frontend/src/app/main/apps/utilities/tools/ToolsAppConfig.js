import { lazy } from 'react';

const ToolsApp = lazy(() => import('./ToolsApp'));

const ToolsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'utilities/tools',
      element: <ToolsApp />,
    },
  ],
};

export default ToolsAppConfig;

