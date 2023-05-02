import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import IconButton from '@mui/material/IconButton';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Typography from '@mui/material/Typography';
import history from '@history';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from './store';
import ClientReviewList from './ClientReviewList';
import ClientReviewSidebarContent from './ClientReviewSidebar';
import { getStatuses } from 'src/app/main/apps/utilities/statuses/store/statusesSlice';
import { getAccounts } from 'src/app/main/apps/users/accounts/store/accountsSlice';
import { getStepAssets } from 'src/app/main/apps/utilities/step_assets/store/stepAssetSlice';


function ClientReviewApp() {
	const dispatch = useDispatch();
	const routeParams = useParams();
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);

	const users = useSelector(({ clientReviewApp }) => clientReviewApp.users.entities);
	const statuses = useSelector(({ clientReviewApp }) => clientReviewApp.status.entities);
	const utilSteps = useSelector(({ clientReviewApp }) => clientReviewApp.utilSteps.entities);

	const episodeIds = useSelector(({ clientReviewApp }) => clientReviewApp.episodes.ids)
	const stepIds = useSelector(({ clientReviewApp }) => clientReviewApp.steps.ids)

	const stepAssetTypes = useSelector(({ clientReviewApp }) => clientReviewApp.stepAsset.entities) || [];

	useDeepCompareEffect(() => {
		dispatch(getStatuses(routeParams));
		dispatch(getAccounts(routeParams));
		dispatch(getStepAssets(routeParams))
	}, [routeParams]);
	return (
		<>
			<FusePageCarded
				header={<div className="p-24 sm:p-16 w-full flex flex-col sm:flex-row space-y-8 sm:space-y-0 items-center">
					<IconButton
						onClick={(ev) => setLeftSidebarOpen(!leftSidebarOpen)}
						aria-label="toggle left sidebar"
						size="large"
					>
						<FuseSvgIcon>heroicons-outline:view-list</FuseSvgIcon>
					</IconButton>
					<div className="flex flex-col items-center sm:items-start space-y-8 sm:space-y-0 min-w-320">
						<Typography
							component={motion.span}
							initial={{ x: -20 }}
							animate={{ x: 0, transition: { delay: 0.2 } }}
							delay={300}
							className="text-24 md:text-32 font-extrabold tracking-tight"
						>
							Client Upload
						</Typography>
						<Typography
							component={motion.span}
							initial={{ y: -20, opacity: 0 }}
							animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
							delay={500}
							className="text-14 font-medium mx-2"
							color="text.secondary"
						>
							FTP Upload
						</Typography>
					</div>
				</div>}
				content={<motion.span
					className="flex items-end"
					initial={{ x: -20 }}
					animate={{ x: 0, transition: { delay: 0.2 } }}
					delay={300}
				>
					<ClientReviewList
						users={users}
						statuses={statuses}
					/>
				</motion.span>}
				leftSidebarContent={
					<div className="px-16 py-24">
						<ClientReviewSidebarContent
							episodeIds={episodeIds}
							stepIds={stepIds}
							utilSteps={utilSteps}
							statuses={statuses}
							stepAssetTypes={stepAssetTypes}
						/>
					</div>
				}
				leftSidebarOpen={leftSidebarOpen}
				leftSidebarWidth={288}
				leftSidebarOnClose={() => {
					setLeftSidebarOpen(false);
				}}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</>
	);
}

export default withReducer('clientReviewApp', reducer)(ClientReviewApp);
