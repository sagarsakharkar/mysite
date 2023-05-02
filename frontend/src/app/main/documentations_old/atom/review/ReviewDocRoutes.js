import { lazy } from 'react';

const ReviewDocRoutes = [
  {
    path: '/documentation/atom/review/internal',
    component: lazy(() => import('./internal/InternalDoc')),
  },
  {
    path: '/documentation/atom/review/client',
    component: lazy(() => import('./client/ClientDoc')),
  },
]

export default ReviewDocRoutes;
