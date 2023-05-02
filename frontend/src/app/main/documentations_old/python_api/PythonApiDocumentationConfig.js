import { lazy } from 'react';
import {authRoles} from 'app/auth';
import { Redirect } from 'react-router-dom';
import EntitiesDocRoutes from './entities/EntitiesDocRoutes';
import UtilitiesDocRoutes from './utilities/UtilitiesDocRoutes';
import AccountsDocRoutes from './accounts/AccountsDocRoutes';
import UploadDocRoutes from './upload/UploadDocRoutes';
import TaskDocRoutes from './userTask/TaskDocRoutes';
import GettingStartedDocRoutes from './getting-started/GettingStartedDocRoutes';

const RestApiDocumentationConfig = {
  auth  : authRoles.developer,
  routes: [
    {
      path: '/documentation/python_api/changelog/',
      component: lazy(() => import('./changelog/ChangelogDoc')),
    },
    ...GettingStartedDocRoutes,
    ...AccountsDocRoutes,
    ...EntitiesDocRoutes,
    ...UtilitiesDocRoutes,
    ...UploadDocRoutes,
    ...TaskDocRoutes,
    {
      path: '/documentation/python_api/getting-started/introduction/',
      component: () => <Redirect to="./introduction/IntroductionDoc" />,
    },
  ],
};
export default RestApiDocumentationConfig;
