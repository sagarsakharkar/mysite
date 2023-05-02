import { lazy } from 'react';

const SettingsDocRoutes = [
  {
    path: '/documentation/atom/settings/email',
    component: lazy(() => import('./email/EmailDoc')),
  },
]

export default SettingsDocRoutes;
