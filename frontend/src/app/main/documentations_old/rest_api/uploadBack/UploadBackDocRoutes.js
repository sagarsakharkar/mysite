import { lazy } from 'react';

const UploadBackDocRoutes = [
  {
    path: '/documentation/rest_api/uploadBack',
    component: lazy(() => import('./uploadFileBackDoc')),
  },
];

export default UploadBackDocRoutes;
