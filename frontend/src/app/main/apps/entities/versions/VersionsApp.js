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
import VersionDialog from './VersionDialog';
import VersionsList from './VersionsList';
import { getVersions, selectVersions } from './store/versionsSlice';
import { getStatuses } from 'src/app/main/apps/utilities/statuses/store/statusesSlice';
import { getPriorities } from 'src/app/main/apps/utilities/priorities/store/prioritiesSlice';


function VersionsApp() {
	const dispatch = useDispatch();
	const routeParams = useParams();
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const data = useSelector(selectVersions);

	const versionDialog = useSelector(({ versionsApp }) => versionsApp.versions.versionDialog);
	const versionIds = useSelector(({ versionsApp }) => versionsApp.versions.ids);

	const versionEntities = useSelector(({ versionsApp }) => versionsApp.versions.entities);
	const utilStepEntities = useSelector(({ versionsApp }) => versionsApp.utilSteps.entities);

	const episodeIds = useSelector(({ versionsApp }) => versionsApp.episodes.ids)
	const sequenceIds = useSelector(({ versionsApp }) => versionsApp.sequences.ids)
	const shotIds = useSelector(({ versionsApp }) => versionsApp.shots.ids)
	const assetIds = useSelector(({ versionsApp }) => versionsApp.assets.ids)

	const users = useSelector(({ versionsApp }) => versionsApp.users.entities);
	const statuses = useSelector(({ versionsApp }) => versionsApp.status.entities);


	useEffect(() => {
		dispatch(getVersions(routeParams));
		dispatch(getStatuses(routeParams));
		dispatch(getPriorities(routeParams));
	}, [routeParams]);

	return (
		<>
			<FusePageCarded
				header={<EntityHeader
					entity='Versions'
					data={data} 
				/>}
				content={<VersionsList 
					users={users}
					statuses={statuses}
				/>}
				scroll={isMobile ? 'normal' : 'content'}
			/>
			<VersionDialog
				versionDialog={versionDialog}
				versionEntities={versionEntities}
				users={users}
				statuses={statuses}
				episodeIds={episodeIds}
				sequenceIds={sequenceIds}
				shotIds={shotIds}
				assetIds={assetIds}
				versionIds={versionIds}
				utilSteps={utilStepEntities}
			/>
		</>
	);
}

export default withReducer('versionsApp', reducer)(VersionsApp);

