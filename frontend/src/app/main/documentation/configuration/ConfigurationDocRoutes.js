import { lazy } from 'react';

const SettingsDoc = lazy(() => import('./settings/SettingsDoc'));
const NavigationDoc = lazy(() => import('./navigation/NavigationDoc'));
const CodeSplittingDoc = lazy(() => import('./code-splitting/CodeSplittingDoc'));

const ConfigurationDocRoutes = [
  {
    path: 'configuration/settings',
    element: <SettingsDoc />,
  },
  {
    path: 'configuration/navigation',
    element: <NavigationDoc />,
  },
  {
    path: 'configuration/code-splitting',
    element: <CodeSplittingDoc />,
  },
];

export default ConfigurationDocRoutes;
