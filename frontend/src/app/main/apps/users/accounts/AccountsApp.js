import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from './store';
import AccountDialog from './AccountDialog';
import history from '@history';
import AccountsList from './AccountsList';
import AccountsSidebarContent from './AccountsSidebarContent';
import { getAccounts } from './store/accountsSlice';
import { getRoles } from 'src/app/main/apps/utilities/roles/store/rolesSlice';
import { getGroups } from 'src/app/main/apps/users/groups/store/groupsSlice';

function AccountsApp() {
	const dispatch = useDispatch();
	const routeParams = useParams();
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
	const { pathname } = history.location;

	useEffect(() => {
		dispatch(getAccounts(routeParams));
		dispatch(getRoles(routeParams));
		dispatch(getGroups(routeParams));
	}, [routeParams]);

	return (
		<>
			<FusePageCarded
				header={
					<div className="flex items-center justify-center py-12 px-4 md:px-12 h-full w-full">
						<IconButton
							onClick={(ev) => setLeftSidebarOpen(!leftSidebarOpen)}
							aria-label="toggle left sidebar"
							size="large"
						>
							<FuseSvgIcon>heroicons-outline:view-list</FuseSvgIcon>
						</IconButton>
						<div className="p-24 sm:p-16 w-full flex flex-col sm:flex-row space-y-8 sm:space-y-0 items-center justify-between">

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
										Account
									</Typography>
								</motion.span>
							</div>
						</div>
					</div>
				}
				content={<AccountsList />}
				leftSidebarContent={
					<div className="px-16 py-24">
						<AccountsSidebarContent />
					</div>
				}
				leftSidebarOpen={leftSidebarOpen}
				leftSidebarWidth={288}
				leftSidebarOnClose={() => {
					setLeftSidebarOpen(false);
				}}
				scroll={isMobile ? 'normal' : 'content'}
			/>
			<AccountDialog />
		</>
	);
}

export default withReducer('accountsApp', reducer)(AccountsApp);

