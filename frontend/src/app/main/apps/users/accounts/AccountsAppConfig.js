import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const AccountsApp = lazy(() => import('./AccountsApp'));

const AccountsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
			path: 'users/:entity/:id',
			element: <AccountsApp />
		},
    {
      path: 'users/accounts/all',
      element: <AccountsApp />,
    },
    {
			path: 'users/accounts',
			element: <Navigate to="/users/accounts/all" />
		}
  ],
};

export default AccountsAppConfig;

