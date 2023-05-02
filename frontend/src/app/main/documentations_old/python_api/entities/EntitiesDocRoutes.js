import { lazy } from 'react';

const EntitiesDocRoutes = [
  {
    path: '/documentation/python_api/entities/project',
    component: lazy(() => import('./project/ProjectDoc')),
  },
  {
    path: '/documentation/python_api/entities/asset',
    component: lazy(() => import('./asset/AssetDoc')),
  },
  {
    path: '/documentation/python_api/entities/episode',
    component: lazy(() => import('./episode/EpisodeDoc')),
  },
  {
    path: '/documentation/python_api/entities/sequence',
    component: lazy(() => import('./sequence/SequenceDoc')),
  },
  {
    path: '/documentation/python_api/entities/shot',
    component: lazy(() => import('./shot/ShotDoc')),
  },
  {
    path: '/documentation/python_api/entities/step',
    component: lazy(() => import('./step/StepDoc')),
  },
  {
    path: '/documentation/python_api/entities/task',
    component: lazy(() => import('./task/TaskDoc')),
  },
  {
    path: '/documentation/python_api/entities/version',
    component: lazy(() => import('./version/VersionDoc')),
  },
  {
    path: '/documentation/python_api/entities/notes',
    component: lazy(() => import('./notes/NotesDoc')),
  },
];

export default EntitiesDocRoutes;
