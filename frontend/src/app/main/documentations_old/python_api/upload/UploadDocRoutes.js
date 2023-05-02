import { lazy } from 'react';

const UploadDocRoutes = [
  {
    path: '/documentation/python_api/upload',
    component: lazy(() => import('./uploadFileDoc')),
  },
];

export default UploadDocRoutes;
