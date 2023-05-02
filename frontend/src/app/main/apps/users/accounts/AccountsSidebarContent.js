import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


const useStyles = makeStyles(theme => ({
	listItem: {
		color: 'inherit!important',
		textDecoration: 'none!important',
		height: 40,
		width: 'calc(100% - 16px)',
		borderRadius: '0 20px 20px 0',
		paddingLeft: 24,
		paddingRight: 12,
		'&.active': {
			backgroundColor: theme.palette.secondary.main,
			color: `${theme.palette.secondary.contrastText}!important`,
			pointerEvents: 'none',
			'& .list-item-icon': {
				color: 'inherit'
			}
		},
		'& .list-item-icon': {
			marginRight: 16
		}
	}
}));

function AccountsSidebarContent(props) {
	const groups = useSelector(({ accountsApp }) => accountsApp.groups.entities);
	const role_entities = useSelector(({ accountsApp }) => accountsApp.roles.entities);
	const roles = role_entities && Object.values(role_entities).map((item) => item.name) || []
	const projects = useSelector(({ fuse }) => fuse.projects.entities);

	const dispatch = useDispatch();
	const routeParams = useParams();

	const classes = useStyles(props);

	return (
		<div className="p-0 lg:ltr:pr-4 lg:rtl:pl-4">

			<div className="p-4">
				<Paper className="rounded-0 shadow-none lg:rounded-8 lg:shadow">
					<div className="p-16 flex justify-center">
						<Typography color="secondary" >Roles</Typography>
					</div>

					<Divider />

					<List>
						<ListItem
							component={NavLinkAdapter}
							to={'/users/accounts/all'} key={'all'}
							activeClassName="active"
							className={classes.listItem}
						>
							<Icon className="list-item-icon" color="action">group</Icon>
							<ListItemText primary="All" disableTypography={true} />
						</ListItem>
						{groups && Object.values(groups).map((group) => (
							roles.includes(group.name) && <ListItem
								component={NavLinkAdapter}
								to={'/users/group/' + group.id} key={group.id}
								activeClassName="active"
								className={classes.listItem}
							>
								<Icon className="list-item-icon" color="action">group</Icon>
								<ListItemText primary={group.name} disableTypography={true} />
							</ListItem>
						))}
					</List>
				</Paper>
			</div>
			<div className="p-4">
				<Paper className="rounded-0 shadow-none lg:rounded-8 lg:shadow">
					<div className="p-16 flex justify-center">
						<Typography color="secondary">Groups</Typography>
					</div>

					<Divider />

					<List>
						{groups && Object.values(groups).map((group) => (
							!roles.includes(group.name) && <ListItem
								component={NavLinkAdapter}
								to={'/users/group/' + group.id} key={group.id}
								activeClassName="active"
								className={classes.listItem}
							>
								<Icon className="list-item-icon" color="action">group</Icon>
								<ListItemText primary={group.name} disableTypography={true} />
							</ListItem>
						))}
					</List>
				</Paper>
			</div>
			<div className="p-4">
				<Paper className="rounded-0 shadow-none lg:rounded-8 lg:shadow">
					<div className="p-16 flex justify-center">
						<Typography color="secondary">Projects</Typography>
					</div>

					<Divider />

					<List>
						{projects && Object.values(projects).map((project) => (
							<ListItem
								component={NavLinkAdapter}
								to={'/users/project/' + project.uid} key={project.uid}
								activeClassName="active"
								className={classes.listItem}
							>
								<Icon className="list-item-icon" color="action">movie</Icon>
								<ListItemText primary={project.code} disableTypography={true} />
							</ListItem>
						))}
					</List>
				</Paper>
			</div>
		</div>
	);
}

export default AccountsSidebarContent;
