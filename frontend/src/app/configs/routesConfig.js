import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';

import appsConfigs from '../main/apps/appsConfigs';
import pagesConfigs from '../main/pages/pagesConfigs';

import LoginConfig from '../auth/login/LoginConfig';
import LogoutConfig from '../auth/logout/LogoutConfig';

import DocumentationConfig from '../main/documentation/DocumentationConfig';

const routeConfigs = [
  ...appsConfigs,
  ...pagesConfigs,

  LoginConfig,
  LogoutConfig,

  DocumentationConfig,
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
  {
    path: '/',
    element: <Navigate to="users/profile" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '*',
    element: <Navigate to="pages/error/404" />,
  },
];

export default routes;
