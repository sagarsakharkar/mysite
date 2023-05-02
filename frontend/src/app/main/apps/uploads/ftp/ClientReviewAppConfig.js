import authRoles from 'src/app/auth/authRoles';
import { lazy } from 'react';

const ClientReviewApp = lazy(() => import('./ClientReviewApp'));

const ClientReviewAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
    auth  : authRoles.production,
	routes: [
    {
      path: 'uploads/ftp',
      element: <ClientReviewApp />,
    },
  ],
};

export default ClientReviewAppConfig;

