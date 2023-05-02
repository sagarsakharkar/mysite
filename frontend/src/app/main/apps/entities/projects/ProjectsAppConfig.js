import authRoles from 'src/app/auth/authRoles';
import { lazy } from 'react';
import OverviewApp from '../overview/OverviewApp';

const ProjectsApp = lazy(() => import('./ProjectsApp'));

const ProjectsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
    auth  : authRoles.lead,
	routes: [
    {
      path: 'entities/projects',
      element: <ProjectsApp />,
      children: [
        {
          path: 'entities/:entity/:uid/overview',
          element: <OverviewApp />,
        }
      ],
    },
  ],
};

export default ProjectsAppConfig;

