import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from 'src/app/auth/authRoles';

const Error404Page = lazy(() => import('./Error404Page'));
const Error500Page = lazy(() => import('./Error500Page'));

const errorPagesConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: 'pages/error',
      children: [
        {
          path: '',
          element: <Navigate to="404" />,
        },
        {
          path: '404',
          element: <Error404Page />,
        },
        {
          path: '500',
          element: <Error500Page />,
        },
      ],
    },
  ],
};

export default errorPagesConfig;
