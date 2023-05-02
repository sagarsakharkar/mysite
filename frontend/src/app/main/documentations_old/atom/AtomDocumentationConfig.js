import { lazy } from 'react';
import GettingStartedDocRoutes from './getting-started/GettingStartedDocRoutes';
import EntitiesDocRoutes from './entities/EntitiesDocRoutes';
import UtilitiesDocRoutes from './utilities/UtilitiesDocRoutes';
import SettingsDocRoutes from './settings/SettingsDocRoutes';
import ReviewDocRoutes from './review/ReviewDocRoutes';
import UsersDocRoutes from './users/UsersDocRoutes';

const AtomDocumentationConfig = {
    routes: [
      {
        path: '/documentation/atom/changelog',
        component: lazy(() => import('./changelog/ChangelogDoc')),
      },
      ...GettingStartedDocRoutes,
      ...EntitiesDocRoutes,
      ...UtilitiesDocRoutes,
      ...SettingsDocRoutes,
      ...ReviewDocRoutes,
      ...UsersDocRoutes,
      // ...UploadDocRoutes,
      {
        path: '/documentation/atom/mytask',
        component: lazy(() => import('./mytask/MyTaskDoc')),
      },
    ]
  }

export default AtomDocumentationConfig;
