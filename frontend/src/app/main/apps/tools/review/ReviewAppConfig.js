import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const ReviewApp = lazy(() => import('./ReviewApp'));

const ReviewsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
			path: 'tools/review/:review_type/:project',
			element: <ReviewApp />
		},
    {
      path: 'tools/review/:review_type',
      element: <ReviewApp />,
    },
    {
			path: 'tools/review',
			element: <Navigate to="/tools/review/client" />
		}
  ],
};

export default ReviewsAppConfig;


