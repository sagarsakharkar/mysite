import { lazy } from 'react';

const NotesApp = lazy(() => import('./NotesApp'));

const NotesAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'entity/:entity/:uid/notes',
      element: <NotesApp />,
    },
  ],
};

export default NotesAppConfig;

