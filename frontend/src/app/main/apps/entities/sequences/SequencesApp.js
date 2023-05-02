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
import SequenceDialog from './SequenceDialog';
import SequencesList from './SequencesList';
import { getSequences, selectSequences } from './store/sequencesSlice';
import { getEpisodes } from 'src/app/main/apps/entities/episodes/store/episodesSlice';

function SequencesApp() {
	const dispatch = useDispatch();
	const routeParams = useParams();
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const data = useSelector(selectSequences);

	const sequenceDialog = useSelector(({ sequencesApp }) => sequencesApp.sequences.sequenceDialog);
	const sequenceIds = useSelector(({ sequencesApp }) => sequencesApp.sequences.ids);

	const episodeIds = useSelector(({ sequencesApp }) => sequencesApp.episodes.ids);

	useEffect(() => {
		dispatch(getSequences(routeParams));
		dispatch(getEpisodes(routeParams));
	}, [routeParams]);

	return (
		<>
			<FusePageCarded
				header={<EntityHeader entity='Sequences' data={data} />}
				content={<SequencesList />}
				scroll={isMobile ? 'normal' : 'content'}
			/>
			<SequenceDialog
				sequenceDialog={sequenceDialog}
				episodeIds={episodeIds}
				sequenceIds={sequenceIds}
			/>
		</>
	);
}

export default withReducer('sequencesApp', reducer)(SequencesApp);

