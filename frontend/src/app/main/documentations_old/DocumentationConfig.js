import { lazy } from 'react';
import { authRoles } from 'src/app/auth';
import AtomDocumentationConfig from './atom/AtomDocumentationConfig';
import RestApiDocumentationConfig from './rest_api/RestApiDocumentationConfig';
import PythonApiDocumentationConfig from './python_api/PythonApiDocumentationConfig';

const DocumentationConfig = {
  auth  : authRoles.user,
  routes: [
    {
      path: '/documentation/atom',
      component: lazy(() => import('./DocumentationPageLayout')),
      ...AtomDocumentationConfig,
    },
    {
      path: '/documentation/rest_api',
      component: lazy(() => import('./DocumentationPageLayout')),
      ...RestApiDocumentationConfig,
    },
    {
      path: '/documentation/python_api',
      component: lazy(() => import('./DocumentationPageLayout')),
      ...PythonApiDocumentationConfig,
    },
  ],
};

export default DocumentationConfig;
