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
import ReviewDialog from './ReviewDialog';
import ReviewList from './ReviewList';
import ReviewHeader from './ReviewHeader';
import { getUtilReviews } from './store/reviewSlice';
import { getStatuses } from 'src/app/main/apps/utilities/statuses/store/statusesSlice';
import { getAccounts } from 'src/app/main/apps/users/accounts/store/accountsSlice';

function ReviewApp() {
	const dispatch = useDispatch();
	const routeParams = useParams();
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const project = routeParams?.project || null
	const reviewType = routeParams.review_type

	const reviewDialog = useSelector(({ reviewApp }) => reviewApp.review.reviewDialog);
	const statuses = useSelector(({ reviewApp }) => reviewApp.status.entities);

	useEffect(() => {
		dispatch(getUtilReviews(routeParams));
		dispatch(getStatuses(routeParams));
		dispatch(getAccounts(routeParams));
	}, [routeParams]);

	return (
		<>
			<FusePageCarded
				header={<ReviewHeader project={project} reviewType={reviewType} />}
				content={project && <ReviewList />}
				scroll={isMobile ? 'normal' : 'content'}
			/>
			<ReviewDialog 
				reviewDialog={reviewDialog}
				statuses={statuses}
			/>
		</>
	);
}

export default withReducer('reviewApp', reducer)(ReviewApp);

