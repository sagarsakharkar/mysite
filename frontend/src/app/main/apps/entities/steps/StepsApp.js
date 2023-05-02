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
import StepDialog from './StepDialog';
import StepsList from './StepsList';
import { getSteps, selectSteps } from './store/stepsSlice';
import { getStatuses } from 'src/app/main/apps/utilities/statuses/store/statusesSlice';
import { getPriorities } from 'src/app/main/apps/utilities/priorities/store/prioritiesSlice';
import { getUtilSteps } from 'src/app/main/apps/utilities/steps/store/stepsSlice';

function StepsApp() {
	const dispatch = useDispatch();
	const routeParams = useParams();
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const data = useSelector(selectSteps);

	const stepDialog = useSelector(({ stepsApp }) => stepsApp.steps.stepDialog);

	const statuses = useSelector(({ stepsApp }) => stepsApp.status.entities);
	const priorities = useSelector(({ stepsApp }) => stepsApp.priorities.entities);
	const utilSteps = useSelector(({ stepsApp }) => stepsApp.utilSteps.entities)

	const episodeIds = useSelector(({ stepsApp }) => stepsApp.episodes.ids)
	const sequenceIds = useSelector(({ stepsApp }) => stepsApp.sequences.ids)
	const shotIds = useSelector(({ stepsApp }) => stepsApp.shots.ids)
	const stepIds = useSelector(({ stepsApp }) => stepsApp.steps.ids)
	const assetIds = useSelector(({ stepsApp }) => stepsApp.assets.ids)

	useEffect(() => {
		dispatch(getSteps(routeParams));
	}, [routeParams]);

	useEffect(() => {
		dispatch(getUtilSteps());
		dispatch(getStatuses(routeParams));
		dispatch(getPriorities(routeParams));
	}, [routeParams]);

	return (
		<>
			<FusePageCarded
				header={<EntityHeader entity='Steps' data={data} />}
				content={<StepsList
					statuses={statuses}
					priorities={priorities}
				/>}
				scroll={isMobile ? 'normal' : 'content'}
			/>
			<StepDialog 
				stepDialog={stepDialog}
				episodeIds={episodeIds}
				sequenceIds={sequenceIds}
				shotIds={shotIds}
				stepIds={stepIds}
				assetIds={assetIds}
				utilSteps={utilSteps}
				statuses={statuses}
				priorities={priorities}
			/>
		</>
	);
}

export default withReducer('stepsApp', reducer)(StepsApp);

