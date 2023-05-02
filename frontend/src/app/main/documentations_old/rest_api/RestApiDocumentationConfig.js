import { Redirect } from 'react-router-dom';
import {authRoles} from 'app/auth';
import EntitiesBackDocRoutes from './entitiesBack/EntitiesBackDocRoutes';
import UtilitiesBackDocRoutes from './utilitiesBack/UtilitiesBackDocRoutes';
import AccountsBackDocRoutes from './accountsBack/AccountsBackDocRoutes';
import UploadBackDocRoutes from './uploadBack/UploadBackDocRoutes';
import TaskBackDocRoutes from './userTaskBack/TaskBackDocRoutes';
import GettingStartedDocRoutes from './getting-started/GettingStartedDocRoutes';

const PythonApiDocumentationConfig = {
  auth  : authRoles.developer,
  routes: [
    ...GettingStartedDocRoutes,
    ...AccountsBackDocRoutes,
    ...EntitiesBackDocRoutes,
    ...UtilitiesBackDocRoutes,
    ...UploadBackDocRoutes,
    ...TaskBackDocRoutes,
    {
      path: '/documentation/rest_api/getting-started/introduction/',
      component: () => <Redirect to="./introduction/IntroductionBackDoc" />,
    },
  ],
};
export default PythonApiDocumentationConfig;
