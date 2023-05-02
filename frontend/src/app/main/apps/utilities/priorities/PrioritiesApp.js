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
import PriorityDialog from './PriorityDialog';
import history from '@history';
import PrioritiesList from './PrioritiesList';
import { getPriorities } from './store/prioritiesSlice';

function PrioritiesApp() {
	const dispatch = useDispatch();
	const routeParams = useParams();
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const { pathname } = history.location;

	useEffect(() => {
		dispatch(getPriorities(routeParams));
	}, [routeParams]);

	return (
		<>
			<FusePageCarded
				header={
					<div className="p-24 sm:p-24 w-full flex flex-col sm:flex-row space-y-8 sm:space-y-0 items-center justify-between">
						<div className="flex flex-col items-center sm:items-start space-y-8 sm:space-y-0">
							<motion.span
								className="flex items-end"
								initial={{ x: -20 }}
								animate={{ x: 0, transition: { delay: 0.2 } }}
								delay={300}
							>
								<Typography
									component={Link}
									to={pathname}
									className="text-20 md:text-32 font-extrabold tracking-tight leading-none"
									role="button"
								>
									Priority
								</Typography>
							</motion.span>
						</div>
					</div>
				}
				content={<PrioritiesList />}
				scroll={isMobile ? 'normal' : 'content'}
			/>
			<PriorityDialog />
		</>
	);
}

export default withReducer('prioritiesApp', reducer)(PrioritiesApp);

