import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import React, { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getEmail, updateEmail, addEmail, updateEmailBoard, selectEmailById } from './store/emailsSlice';

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

function EmailsSidebarContent(props) {
	const dispatch = useDispatch();
	const projects = useSelector(({ fuse }) => fuse.projects.ids);

	const tools = useSelector(({ emailsApp }) => emailsApp.tools.entities);
	const steps = useSelector(({ emailsApp }) => emailsApp.steps.entities);
	const emailBoard = useSelector(({ emailsApp }) => emailsApp.emails.board);
	const entities = useSelector(({ emailsApp }) => emailsApp.emails.entities);

	const [emailId, setEmailId] = useState(null)
	const [project, setProject] = useState(null);
	const [tool, setTool] = useState(null);
	const [step, setStep] = useState(null);

	const [data, setData] = useState(null)

	const emailData =  useSelector((state) => selectEmailById(state, emailId))

	const allUsers = useSelector(({ emailsApp }) => emailsApp.accounts.entities)

	useEffect(() => {
		const to = (emailData?.to) ? emailData.to : []
		const cc = (emailData?.cc) ? emailData.cc : []
		if (allUsers) {
            const all = Object.values(allUsers).map(row => row.email)
            all.length > 0 && dispatch(updateEmailBoard({ all, to, cc }))
        }
	}, [dispatch, allUsers, emailData])

	function canBeSubmitted() {
		return (project && tool && step)
	}

	useEffect(() => {
		if (project && tool && step) {
			const id = (project + ':' + tool.name + ':' + step.name).replaceAll(' ', '_').toLocaleLowerCase()
			setEmailId(id)
			dispatch(getEmail(id))
		}
	}, [project, tool, step]);

	useEffect(() => {
		if (project && tool && step) {
			setData(
				{
					id: emailId,
					project: project,
					tool: tool && tool.id,
					step: step && step.id,
					to: emailBoard.to,
					cc: emailBoard.cc
				}
			)
		}

	}, [emailBoard])

	return (
		<div className="p-0 lg:p-16 lg:ltr:pr-4 lg:rtl:pl-4">

			<Button
				variant="contained"
				color="secondary"
				className="w-full"
				onClick={ev => (emailData?.uid) ? dispatch(updateEmail(data)) : dispatch(addEmail(data))}
				disabled={!canBeSubmitted()}
			>
				{(emailData?.uid) ? 'Update' : 'Create'}
			</Button>

			<Paper className="rounded-0 shadow-none lg:rounded-8 lg:shadow">

				<List>
					<div className="p-16 flex flex-col justify-center">
						<Autocomplete
							value={project}
							onChange={(event, newValue) => {
								setProject(newValue);
							}}
							disableClearable
							id="project"
							options={projects}
							renderInput={(params) => <TextField {...params} label="Project" required variant="outlined" />}
						/>
					</div>
					<div className="p-16 flex flex-col justify-center">
						<Autocomplete
							value={tool}
							onChange={(event, newValue) => {
								setTool(newValue);
							}}
							disableClearable
							getOptionLabel={option => option.name}
							id="tool"
							options={Object.values(tools)}
							renderInput={(params) => <TextField {...params} label="Tool" required variant="outlined" />}
						/>
					</div>
					<div className="p-16 flex flex-col justify-center">
						<Autocomplete
							value={step}
							onChange={(event, newValue) => {
								setStep(newValue);
							}}
							getOptionLabel={option => `${option.name} (${option.entity})`}
							disableClearable
							id="step"
							options={Object.values(steps)}
							renderInput={(params) => <TextField {...params} label="Department" required variant="outlined" />}
						/>
					</div>
				</List>
			</Paper>
		</div>
	);
}

export default EmailsSidebarContent;
