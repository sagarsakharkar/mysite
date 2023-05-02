import LogoutPage from './LogoutPage';

const LogoutConfig = {
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
  auth: null,
  routes: [
    {
      path: 'logout',
      element: <LogoutPage />,
    },
  ],
};

export default LogoutConfig;
