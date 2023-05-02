import { lazy } from 'react';

const EntitiesDocRoutes = [
  {
    path: '/documentation/atom/entities/overview',
    component: lazy(() => import('./overview/OverviewDoc')),
  },
  {
    path: '/documentation/atom/entities/project',
    component: lazy(() => import('./project/ProjectDoc')),
  },
  {
    path: '/documentation/atom/entities/asset',
    component: lazy(() => import('./asset/AssetDoc')),
  },
  {
    path: '/documentation/atom/entities/episode',
    component: lazy(() => import('./episode/EpisodeDoc')),
  },
  {
    path: '/documentation/atom/entities/sequence',
    component: lazy(() => import('./sequence/SequenceDoc')),
  },
  {
    path: '/documentation/atom/entities/shot',
    component: lazy(() => import('./shot/ShotDoc')),
  },
  {
    path: '/documentation/atom/entities/step',
    component: lazy(() => import('./step/StepDoc')),
  },
  {
    path: '/documentation/atom/entities/task',
    component: lazy(() => import('./task/TaskDoc')),
  },
  {
    path: '/documentation/atom/entities/version',
    component: lazy(() => import('./version/VersionDoc')),
  },
  {
    path: '/documentation/atom/entities/task_assignment',
    component: lazy(() => import('./task_assignment/Task_AssignmentDoc')),
  },
  {
    path: '/documentation/atom/entities/notes',
    component: lazy(() => import('./notes/NotesDoc')),
  },
];

export default EntitiesDocRoutes;
