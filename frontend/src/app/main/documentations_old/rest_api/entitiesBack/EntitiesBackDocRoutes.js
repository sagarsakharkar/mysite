import { lazy } from 'react';

const EntitiesBackDocRoutes = [
  {
    path: '/documentation/rest_api/entitiesBack/project',
    component: lazy(() => import('./project/ProjectBackDoc')),
  },
  {
    path: '/documentation/rest_api/entitiesBack/asset',
    component: lazy(() => import('./asset/AssetBackDoc')),
  },
  {
    path: '/documentation/rest_api/entitiesBack/episode',
    component: lazy(() => import('./episode/EpisodeBackDoc')),
  },
  {
    path: '/documentation/rest_api/entitiesBack/sequence',
    component: lazy(() => import('./sequence/SequenceBackDoc')),
  },
  {
    path: '/documentation/rest_api/entitiesBack/shot',
    component: lazy(() => import('./shot/ShotBackDoc')),
  },
  {
    path: '/documentation/rest_api/entitiesBack/step',
    component: lazy(() => import('./step/StepBackDoc')),
  },
  {
    path: '/documentation/rest_api/entitiesBack/task',
    component: lazy(() => import('./task/TaskBackDoc')),
  },
  {
    path: '/documentation/rest_api/entitiesBack/version',
    component: lazy(() => import('./version/VersionBackDoc')),
  },
  {
    path: '/documentation/rest_api/entitiesBack/notes',
    component: lazy(() => import('./notes/NotesBackDoc')),
  },
];

export default EntitiesBackDocRoutes;
