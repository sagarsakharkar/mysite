import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import IconButton from '@mui/material/IconButton';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import history from '@history';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import EmailList from './EmailList';
import EmailsHeader from './EmailsHeader';
import reducer from './store';
import { getEmails, openNewEmailDialog, setEmailsSearchText, resetEmailsSearchText } from './store/emailsSlice';
import EmailsSidebarContent from './EmailsSidebarContent';
import { getAccounts } from 'src/app/main/apps/users/accounts/store/accountsSlice';
import { getTools } from 'src/app/main/apps/utilities/tools/store/toolsSlice';
import { getUtilSteps } from 'src/app/main/apps/utilities/steps/store/stepsSlice';


function EmailsApp() {
	const dispatch = useDispatch();
	const routeParams = useParams();
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
	// const { pathname } = history.location;

	const searchText = useSelector(({ emailsApp }) => emailsApp.emails.searchText);
	const openNewDialog = openNewEmailDialog()
	const setSearchText = setEmailsSearchText
	const resetSearchText = resetEmailsSearchText()

	useDeepCompareEffect(() => {
		dispatch(getTools(routeParams));
		dispatch(getUtilSteps(routeParams));
		dispatch(getAccounts(routeParams));
	}, [dispatch, routeParams]);

	return (
		<>
			<FusePageCarded
				header={<div className="flex items-center justify-center py-12 px-4 md:px-12 h-full w-full">
					<IconButton
						onClick={(ev) => setLeftSidebarOpen(!leftSidebarOpen)}
						aria-label="toggle left sidebar"
						size="large"
					>
						<FuseSvgIcon>heroicons-outline:view-list</FuseSvgIcon>
					</IconButton>
					<EmailsHeader />
				</div>}
				content={<motion.span
					className="flex items-end"
					initial={{ x: -20 }}
					animate={{ x: 0, transition: { delay: 0.2 } }}
					delay={300}
				>
					<EmailList />
				</motion.span>}
				leftSidebarContent={
					<div className="px-16 py-24">
						<EmailsSidebarContent/>
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

export default withReducer('emailsApp', reducer)(EmailsApp);
