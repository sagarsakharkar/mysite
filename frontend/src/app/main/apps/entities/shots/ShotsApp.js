import FusePageCarded from '@fuse/core/FusePageCarded';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from './store';
import EntityHeader from 'app/shared-components/header/EntityHeader';
import ShotDialog from './ShotDialog';
import ShotsList from './ShotsList';
import { getShots, selectShots } from './store/shotsSlice';
import { getEpisodes } from 'src/app/main/apps/entities/episodes/store/episodesSlice';
import { getUtilSteps } from 'src/app/main/apps/utilities/steps/store/stepsSlice';
import { getAccounts } from 'src/app/main/apps/users/accounts/store/accountsSlice';

function ShotsApp() {
	const dispatch = useDispatch();
	const routeParams = useParams();
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const data = useSelector(selectShots);

	const shotDialog = useSelector(({ shotsApp }) => shotsApp.shots.shotDialog);

	const episodeIds = useSelector(({ shotsApp }) => shotsApp.episodes.ids);
	const sequenceIds = useSelector(({ shotsApp }) => shotsApp.sequences.ids);
	const shotIds = useSelector(({ shotsApp }) => shotsApp.shots.ids);

	useEffect(() => {
		dispatch(getEpisodes(routeParams));
		dispatch(getShots(routeParams));
		dispatch(getUtilSteps({entity: 'Shot'}));
		dispatch(getAccounts(routeParams));
	}, [routeParams]);

	return (
		<>
			<FusePageCarded
				header={<EntityHeader entity='Shots' data={data} />}
				content={<ShotsList />}
				scroll={isMobile ? 'normal' : 'content'}
			/>
			<ShotDialog
				shotDialog={shotDialog}
				episodeIds={episodeIds}
				sequenceIds={sequenceIds}
				shotIds={shotIds}
			/>
		</>
	);
}

export default withReducer('shotsApp', reducer)(ShotsApp);

