import authRoles from 'src/app/auth/authRoles';
import { lazy } from 'react';

const EmailsApp = lazy(() => import('./EmailsApp'));

const EmailsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
    auth  : authRoles.lead,
	routes: [
    {
      path: 'tools/emails',
      element: <EmailsApp />,
    },
  ],
};

export default EmailsAppConfig;

