import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import reducer from './store';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import OverviewList from './OverviewList';
import EntityHeader from 'app/shared-components/header/EntityHeader';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { getProject, selectProjectById } from 'src/app/main/apps/entities/projects/store/projectsSlice';
import { getAsset, selectAssetById } from 'src/app/main/apps/entities/assets/store/assetsSlice';
import { getEpisode, selectEpisodeById } from 'src/app/main/apps/entities/episodes/store/episodesSlice';
import { getSequence, selectSequenceById } from 'src/app/main/apps/entities/sequences/store/sequencesSlice';
import { getShot, selectShotById } from 'src/app/main/apps/entities/shots/store/shotsSlice';
import { getStep, selectStepById } from 'src/app/main/apps/entities/steps/store/stepsSlice';
import { getTask, selectTaskById } from 'src/app/main/apps/entities/tasks/store/tasksSlice';

import NoteDialog from '../notes/NoteDialog';
import { getNotes, selectNotes } from 'src/app/main/apps/entities/notes/store/notesSlice';
import { getActivities, selectActivities } from 'src/app/main/apps/tools/activities/store/activitiesSlice';

import { getStatuses } from 'src/app/main/apps/utilities/statuses/store/statusesSlice';
import { getPriorities } from 'src/app/main/apps/utilities/priorities/store/prioritiesSlice';
import { getAccounts } from 'src/app/main/apps/users/accounts/store/accountsSlice';
import { getUtilSteps } from 'src/app/main/apps/utilities/steps/store/stepsSlice';


const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
    '& > .container': {
      maxWidth: '100%',
    },
  },
}));

function OverviewApp() {
  const dispatch = useDispatch();
  const routeParams = useParams();

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  const entity = routeParams.entity;
  const uid = routeParams.uid;

  const users = useSelector(({ overviewApp }) => overviewApp.users.entities);
  const statuses = useSelector(({ overviewApp }) => overviewApp.statuses.entities);
  const priorities = useSelector(({ overviewApp }) => overviewApp.priorities.entities);
  const utilSteps = useSelector(({ overviewApp }) => overviewApp.utilSteps.entities)

  const notes = useSelector(selectNotes)
  const activities = useSelector(selectActivities)

  const noteDialog = useSelector(({ overviewApp }) => overviewApp.notes.noteDialog);
  const noteIds = useSelector(({ overviewApp }) => overviewApp.notes.ids);

  useEffect(() => {
    dispatch(getStatuses(routeParams));
    dispatch(getPriorities(routeParams));
    dispatch(getAccounts(routeParams));
    dispatch(getUtilSteps());
  }, [])

  useEffect(() => {
    dispatch(getNotes(routeParams));
    dispatch(getActivities(routeParams));
  }, [routeParams]);

  useEffect(() => {
    if (entity === 'project') {
      dispatch(getProject(routeParams));
    } else if (entity === 'asset') {
      dispatch(getAsset(routeParams));
    } else if (entity === 'episode') {
      dispatch(getEpisode(routeParams));
    } else if (entity === 'sequence') {
      dispatch(getSequence(routeParams));
    } else if (entity === 'shot') {
      dispatch(getShot(routeParams));
    } else if (entity === 'step') {
      dispatch(getStep(routeParams));
    } else if (entity === 'task') {
      dispatch(getTask(routeParams));
    }
  }, [entity, routeParams]);

  const data = useSelector((state) =>
    entity === 'project'
      ? selectProjectById(state, routeParams.uid)
      : entity === 'asset'
        ? selectAssetById(state, routeParams.uid)
        : entity === 'episode'
          ? selectEpisodeById(state, routeParams.uid)
          : entity === 'sequence'
            ? selectSequenceById(state, routeParams.uid)
            : entity === 'shot'
              ? selectShotById(state, routeParams.uid)
              : entity === 'step'
                ? selectStepById(state, routeParams.uid)
                : entity === 'task'
                  ? selectTaskById(state, routeParams.uid)
                  : null
  );

  return (<>
    <Root
      header={
        <div className="flex flex-col">
          <img
            className="h-160 md:h-240 xl:h-320 object-cover w-full"
            src="static/images/pages/profile/entity_cover.jpg"
            alt="Overview Cover"
          />
           {/* <video width="100%" height="240" src="static/images/pages/profile/cover.mp4" controls>
              Your browser does not support the video tag.
          </video>  */}

          <div className="flex flex-col flex-0 lg:flex-row items-center w-full mx-auto px-32 lg:h-72">
            <div className="-mt-96 lg:-mt-88 rounded-full">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.1 } }}>
                <Avatar
                  sx={{ borderColor: 'background.paper' }}
                  className="w-128 h-128 border-4"
                  src={data?.thumbnail}
                  alt="User avatar"
                />
              </motion.div>
            </div>

            <EntityHeader />

          </div>
        </div>
      }
      content={
        <div className="flex flex-auto justify-center w-full mx-auto p-24 sm:p-32">
          <OverviewList
            entity={entity}
            data={data}
            users={users}
            statuses={statuses}
            priorities={priorities}
            activities={activities}
            notes={notes}
          />
        </div>
      }
      scroll={isMobile ? 'normal' : 'page'}
    />
    <NoteDialog
      noteDialog={noteDialog}
      noteIds={noteIds}
    />
  </>
  );
}

export default withReducer('overviewApp', reducer)(OverviewApp);
