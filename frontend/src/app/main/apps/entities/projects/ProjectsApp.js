import FusePageCarded from '@fuse/core/FusePageCarded';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import reducer from './store';
import history from '@history';
import ProjectDialog from './ProjectDialog';
import ProjectList from './ProjectList';
import ProjectsHeader from './ProjectsHeader';
import { getProjects, openNewProjectDialog } from './store/projectsSlice';
import { getAccounts } from 'src/app/main/apps/users/accounts/store/accountsSlice';

function ProjectsApp() {
	const dispatch = useDispatch();
	const routeParams = useParams();
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const { pathname } = history.location;

	const projectDialog = useSelector(({ projectsApp }) => projectsApp.projects.projectDialog);
	const users = useSelector(({ projectsApp }) => projectsApp.accounts.entities);

	useEffect(() => {
		dispatch(getAccounts(routeParams));
		dispatch(getProjects(routeParams));
	}, [routeParams]);

	return (
		<>
			<FusePageCarded
				header={<ProjectsHeader />}
				content={<motion.span
					className="flex items-end"
					initial={{ x: -20 }}
					animate={{ x: 0, transition: { delay: 0.2 } }}
					delay={300}
				>
					<ProjectList />
				</motion.span>}
				scroll={isMobile ? 'normal' : 'content'}
			/>
			<ProjectDialog 
				projectDialog={projectDialog}
				users={users}
			/>
		</>
	);
}

export default withReducer('projectsApp', reducer)(ProjectsApp);


