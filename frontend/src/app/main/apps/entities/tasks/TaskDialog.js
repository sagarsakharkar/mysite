import axios from 'axios';
import { useForm } from '@fuse/hooks';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useCallback, useEffect, useState } from 'react';
import diff from 'object-diff';
import clsx from 'clsx';
import _ from '@lodash';
import { useDispatch, useSelector } from 'react-redux';
import {
	updateTask,
	addTasks,
	closeNewTaskDialog,
	closeEditTaskDialog,
	closeCsvCreateDialog,
	closeCsvUpdateDialog,
	updateMultipleTasks,
} from './store/tasksSlice';

import { getEpisodes } from 'src/app/main/apps/entities/episodes/store/episodesSlice';
import { getSequences } from 'src/app/main/apps/entities/sequences/store/sequencesSlice';
import { getShots } from 'src/app/main/apps/entities/shots/store/shotsSlice';
import { getSteps } from 'src/app/main/apps/entities/steps/store/stepsSlice';
import { getAssets } from 'src/app/main/apps/entities/assets/store/assetsSlice';

import { getTaskUsers } from './store/tasksSlice';
import { getUtilSteps } from 'src/app/main/apps/utilities/steps/store/stepsSlice';

import AtomUploadXls from 'app/shared-components/xls_table/AtomUploadXls';
import SampleCreateCsv from './sample/sample_create_task.csv';
import SampleUpdateCsv from './sample/sample_update_task.csv';

const defaultFormState = {
	name: '',
	bid_days: 0,
	status: null,
	priority: null,
	reviewer: null,
	// version_number: 0,
	// project: "",
	asset: "",
	episode: "",
	sequence: "",
	shot: "",
	step: "",
	task_users: [],
};


function TaskDialog(props) {
	const dispatch = useDispatch();
	const routeParams = useParams();

	const taskDialog = props.taskDialog;
	const taskEntities = props.taskEntities;
	const userTasks = props.userTasks;

	const users = props.users;
	const statuses = props.statuses;
	const priorities = props.priorities;

	const episodeIds = props.episodeIds;
	const sequenceIds = props.sequenceIds;
	const shotIds = props.shotIds;
	const assetIds = props.assetIds;
	const taskIds = props.taskIds;

	const [parent, setParent] = useState(null)
	const [entities, setEntities] = useState([])

	const exclude_status = ['Ready To Start', 'In Progress']

	const steps = props.utilSteps && Object.values(props.utilSteps).map(item => item.name) || []

	const bids = _.range(1, 20, 0.25).map(item => item.toString())
	const [entityType, setEntityType] = useState(null)
	const entityTypes = ["Asset", "Shot", "Sequence"]
	const project = routeParams.uid.split(':')[0].toLowerCase()

	const [assetType, setAssetType] = useState(null)
	const assetTypes = ["Set", "Prop", "Character", "Vehicle", "Fx"]
	const { form, handleChange, setForm, setInForm, resetForm } = useForm(defaultFormState);

	const [selectedBid, setSelectedBid] = useState('')
	const [selectedUserId, setSelectedUserId] = useState(null)
	const [csvData, setCsvData] = useState([])

	function validateCsvCreate(csvData) {

		const validList = []
		const valiData = csvData.map(item => {
			const requestData = { ...item }
			item.reason = "Valid"
			item.valid = true
			const reviewer = item.reviewer && users ? _.find(users, { username: item.reviewer }) : null
			if (item.reviewer && !reviewer) {
				item.reason = "Invalid Reviewer"
				item.valid = false
			} else if (item.reviewer) {
				requestData.reviewer = reviewer.id
			}

			const priority = item.priority && priorities ? _.find(priorities, { name: item.priority }) : null
			if (item.priority && !priority) {
				item.reason = "Invalid Priority"
				item.valid = false
			} else if (item.priority) {
				requestData.priority = priority.id
			}

			if (item.assignees) {
				const assignees = item.assignees.split(",")
				requestData.task_users = assignees.map(row => {
					const data = row.split("|")
					const user = users ? _.find(users, { username: data[0] }).id : null
					const value = { "user": user, "bid_days": data[1] || 0 }
					return value
				})
			}
			if (item.valid) {
				validList.push(requestData)
			}
			return item
		})

		const data = validList.map(item => {
			const changedValues = diff(defaultFormState, item) // remove blank entries
			return changedValues
		})

		setCsvData(data)
		return valiData

	}

	function validateCsvUpdate(csvData) {

		const validList = []
		const valiData = csvData.map(item => {
			const requestData = { ...item }
			item.reason = "Valid"
			item.valid = true
			if (taskIds && !taskIds.includes(item.uid)) {
				item.reason = "Task Not Exists"
				item.valid = false
			}
			const reviewer = item.reviewer && users ? _.find(users, { username: item.reviewer }) : null
			if (item.reviewer && !reviewer) {
				item.reason = "Invalid Reviewer"
				item.valid = false
			} else if (item.reviewer) {
				requestData.reviewer = reviewer.id
			}

			const status = item.status && statuses ? _.find(statuses, { name: item.status }) : null
			if (item.status && !status) {
				item.reason = "Invalid Status"
				item.valid = false
			} else if (item.status) {
				requestData.status = status.id
			}

			const priority = item.priority && priorities ? _.find(priorities, { name: item.priority }) : null
			if (item.priority && !priority) {
				item.reason = "Invalid Priority"
				item.valid = false
			} else if (item.priority) {
				requestData.priority = priority.id
			}

			if (item.assignees) {
				const assignees = item.assignees.split(",")
				requestData.task_users = assignees.map(row => {
					const data = row.split("|")
					const user = users ? _.find(users, { username: data[0] }).id : null
					const value = { "user": user, "bid_days": data[1] || 0, "task": item.uid }
					return value
				})
			}
			if (item.valid) {
				validList.push(requestData)
			}
			return item
		})

		const data = validList.map(item => {
			const changedValues = diff(defaultFormState, item) // remove blank entries
			return changedValues
		})

		setCsvData(data)
		return valiData

	}

	function checkTaskExists(taskId) {
		const url = '/api/v1/entity/task/' + taskId + '/'
		return axios.get(url)
			.then(response => {
				if (response.status === 200) {
					return true;
				} else {
					return false;
				}
			})
			.catch(error => {
				console.error(error);
				return false;
			});
	}

	const initDialog = useCallback(() => {
		resetForm()
		if (taskDialog.type === 'edit' && taskDialog.data) {
			setForm({ ...taskDialog.data });

			(typeof taskDialog.data['task_users'] == 'undefined') && dispatch(getTaskUsers(taskDialog.data.uid))
		}

		if (taskDialog.type === 'new') {
			resetForm()
			setForm({
				...defaultFormState,
				...taskDialog.data,
			});
			setInForm('project', project)

		}
	}, [taskDialog.data, taskDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (taskDialog.props.open) {
			initDialog();
		}
	}, [taskDialog.props.open, initDialog]);

	const handleUserAdd = () => {
		const newUser = {
			user: selectedUserId,
			bid_days: parseFloat(selectedBid),
			task: form.uid,
		}
		let task_users = form.task_users.filter((item) => item.user !== selectedUserId)

		task_users = [...task_users, { ...newUser }]

		const bid_days = task_users.reduce((prev, cur) => prev + parseFloat(cur.bid_days), 0)

		setInForm(`task_users`, task_users);
		setInForm(`bid_days`, parseFloat(bid_days));
		setSelectedUserId(null);
		setSelectedBid(null);
	}

	const handleUserRemove = (value) => {
		const task_users = form.task_users.filter(data => value.user !== data.user)
		setInForm(`task_users`, task_users);
		setInForm(`bid_days`, parseFloat(form.bid_days) - parseFloat(value.bid_days));
		const remove_users = form.remove_users ? form.remove_users : []
		value.id && setInForm(`remove_users`, [...remove_users, value.id]);
	}

	useEffect(() => {
		setInForm('task_users', userTasks)
	}, [userTasks])

	useEffect(() => {
		entityType === 'Asset' && assetIds && setEntities(assetIds)
		entityType === 'Shot' && shotIds && setEntities(shotIds)
		entityType === 'Sequence' && shotIds && setEntities(sequenceIds)

		if (['Sequence', 'Shot'].includes(entityType)) {
			const projectParams = {
				uid: project,
				entity: 'project'
			}
			project && dispatch(getEpisodes(projectParams));
		}
	}, [shotIds, assetIds, sequenceIds, entityType])

	useEffect(() => {
		{/* Get Util Steps from entity Type like 'Asset' or 'shot' */ }
		const params = {
			entity: entityType
		}
		entityType && dispatch(getUtilSteps(params));
	}, [entityType])

	useEffect(() => {
		if (assetType) {
			const params = {
				asset_type: assetType,
				project: project
			}
			dispatch(getAssets(params));
		}
	}, [assetType]);

	useEffect(() => {
		const seqRouteParams = {
			uid: form.episode,
			entity: 'episode'
		}
		form.episode && dispatch(getSequences(seqRouteParams));
	}, [form.episode]);

	useEffect(() => {
		const shotRouteParams = {
			uid: form.sequence,
			entity: 'sequence'
		}
		form.sequence && dispatch(getShots(shotRouteParams));
	}, [form.sequence]);


	async function setFormName(step) {
		const stepId = parent + ':' + step
		setInForm('step', stepId)

		let sorted = []
		try {
			const response = await axios.get('/api/v1/entity/step/' + stepId + '/tasks/');
			const data = await response.data;

			sorted = data.sort((a, b) => (b.version_number - a.version_number))
		} catch {
			console.log("Step Not found ...")
		}
		let latestTask = 'Task_v1'
		if (sorted.length > 0) {
			const version = sorted[0].version_number
			if (exclude_status.includes(statuses[sorted[0].status])) {
				setInForm('name', '')
				return false
			}
			const versionNumber = (parseInt(version) + 1)
			latestTask = 'Task_v' + versionNumber
			setInForm('version_number', versionNumber)
		}
		setInForm('name', latestTask)
	}
	function resetFormData() {
		setInForm("name", null)
		setAssetType(null)
		setParent(null)
		setSelectedUserId(null);
		setSelectedBid(null);
	}
	function closeComposeDialog() {
		taskDialog.type === 'edit'
			? dispatch(closeEditTaskDialog())
			: taskDialog.type === 'new'
				? dispatch(closeNewTaskDialog())
				: taskDialog.type === 'csvCreate'
					? dispatch(closeCsvCreateDialog())
					: dispatch(closeCsvUpdateDialog())

		resetFormData()
		setEntityType(null)
	}

	function canBeSubmitted() {
		return (
			taskDialog.type.startsWith('csv')
				? csvData.length > 0
				: taskDialog.type === 'multiple'
					? form.status || form.task_users?.length || form.reviewer || form.priority
					: taskDialog.type === 'new'
						? form.name
						: form.uid
		);
	}

	function handleSubmit(event) {
		event.preventDefault();

		if (taskDialog.type === 'csvCreate' && csvData.length > 0) {
			dispatch(addTasks(csvData));
		} else if (taskDialog.type === 'csvUpdate' && csvData.length > 0) {
			dispatch(updateMultipleTasks(csvData));
		} else if (taskDialog.type === 'multiple' && taskDialog.data && taskDialog.data.length > 0) {
			// const [create, setCreate] = useState([])
			// const [update, setUpdate] = useState([])
			taskDialog.data.map(item => {
				const changedValues = diff(defaultFormState, form) // remove blank entries
				changedValues.id = item
				if (changedValues.task_users && changedValues.task_users.length > 0) {
					changedValues.task_users = changedValues.task_users.map(row => ({ ...row, ...{ task: changedValues.id } }))
				} else {
					delete changedValues.task_users
				}
				checkTaskExists(changedValues.id).then(exists => {
					if (exists) {
						console.info("URL exists", changedValues.id);
						dispatch(updateTask(changedValues));
					} else {
						console.info("URL does not exist", changedValues.id);
						changedValues.step = taskEntities[changedValues.id].step
						delete changedValues.uid
						dispatch(addTasks(changedValues));
					}
				})
					.catch(error => {
						console.error(error);
					});
			})
			// console.info(create, update)
			// create.length > 0 && dispatch(addTasks(create));
			// update.length > 0 && dispatch(updateMultipleTasks(update));
		} else if (taskDialog.type === 'new') {
			dispatch(addTasks(form));
		} else {
			const changedValues = diff(taskDialog.data, form)
			changedValues.id = form.uid
			checkTaskExists(changedValues.id).then(exists => {
				if (exists) {
					console.info("URL exists");
					dispatch(updateTask(changedValues));
				} else {
					console.info("URL does not exist");
					delete form.uid
					dispatch(addTasks(form));
				}
			})
				.catch(error => {
					console.error(error);
				});
		}
		closeComposeDialog();
	}

	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-8'
			}}
			{...taskDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth={taskDialog.type.startsWith('csv') ? "md" : "xs"}
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full justify-between">
					<Typography variant="subtitle1" color="inherit">
						{taskDialog.type === 'new' ? 'New Task' : 'Edit Task'}
					</Typography>
					<Typography variant="subtitle1" color="inherit" >
						{project && project.toUpperCase()}
					</Typography>
				</Toolbar>
			</AppBar>
			<form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
				<DialogContent classes={{ root: 'p-24' }}>
					<>
						{taskDialog.type === 'csvCreate' && (
							<>
								<a variant="contained" color="secondary" href={SampleCreateCsv} download="SampleCreateTask.csv">
									Download Sample CSV
								</a>
								<AtomUploadXls validate={validateCsvCreate} />
							</>
						)}
						{taskDialog.type === 'csvUpdate' && (
							<>
								<a variant="contained" color="secondary" href={SampleUpdateCsv} download="SampleUpdateTask.csv">
									Download Sample CSV
								</a>
								<AtomUploadXls validate={validateCsvUpdate} />
							</>
						)}
						{taskDialog.type === 'new' && (
							<>
								<div className="flex flex-row mb-8">
									<div className="flex-1 mr-5">
										<Autocomplete
											value={entityType}
											onChange={(event, newValue) => {
												setEntityType(newValue)
												resetFormData()
											}}
											disableClearable
											id="entityType"
											options={entityTypes}
											renderInput={(params) => <TextField {...params} label="Entity" required variant="outlined" />}
										/>
									</div>
									{entityType && entityType === 'Asset' && (<div className="flex-1">
										<Autocomplete
											value={assetType}
											onChange={(event, newValue) => {
												setAssetType(newValue)
											}}
											disableClearable
											id="assetType"
											options={assetTypes}
											renderInput={(params) => <TextField {...params} label="Asset Type" required variant="outlined" />}
										/>
									</div>
									)}
									{entityType && ['Shot', 'Sequence'].includes(entityType) && (<div className="flex-1">
										<Autocomplete
											value={form.episode}
											onChange={(event, newValue) => {
												setInForm('episode', newValue)
											}}
											disableClearable
											getOptionLabel={option => option.split(':').slice(-1).join('_')}
											id="episode"
											options={episodeIds}
											renderInput={(params) => <TextField {...params} label="Episode" required variant="outlined" />}
										/>
									</div>
									)}
								</div>
								{entityType && entityType === 'Shot' && (
									<>
										<div className="flex flex-1 mb-8">
											<div className="flex-1 mr-5">
												<Autocomplete
													value={form.sequence}
													onChange={(event, newValue) => {
														setInForm('sequence', newValue)
													}}
													disableClearable
													getOptionLabel={option => option.split(':').slice(-1).join('_')}
													id="sequence"
													options={sequenceIds}
													renderInput={(params) => <TextField {...params} label="Sequence" required variant="outlined" />}
												/>
											</div>
										</div>

									</>
								)}
								{['new', 'edit', 'multiple'].includes(taskDialog.type) && (<>
									<div className="flex flex-row mb-8">
										<div className="mr-5 flex-1">
											<Autocomplete
												value={parent}
												onChange={(event, newValue) => {
													(entityType === 'Asset')
														? setInForm('asset', newValue) : (entityType === 'Sequence')
															? setInForm('sequence', newValue) : setInForm('shot', newValue)

													setParent(newValue)
												}}
												disableClearable
												// getOptionLabel={option => option.uid}
												getOptionLabel={option => option.split(':').slice(-1).join()}
												id={entityType}
												options={entities}
												renderInput={(params) => <TextField {...params} label={entityType} required variant="outlined" />}
											/>
										</div>
										<div className="flex-1">
											<Autocomplete
												value={form.step}
												onChange={(event, newValue) => {
													setFormName(newValue)
												}}
												disableClearable
												// getOptionLabel={option => option.name}
												id="step"
												options={steps}
												renderInput={(params) => <TextField {...params} label="Step" required variant="outlined" />}
											// disabled={taskDialog.type === 'edit'}

											/>
										</div>
									</div>
									<div className="flex">
										<TextField
											className="mb-8"
											label="Name"
											autoFocus
											id="name"
											name="name"
											value={form.name}
											onChange={handleChange}
											variant="outlined"
											required
											fullWidth
											disabled
										/>
									</div>
								</>)}
							</>

						)}

						{taskDialog.type === 'edit' && (
							<>
								<div className="flex">
									<TextField
										className="mb-8"
										label="Task"
										autoFocus
										id="task_id"
										name="task_id"
										value={form.uid}
										onChange={handleChange}
										variant="outlined"
										required
										fullWidth
										disabled
									/>
								</div>
							</>
						)}

						{['new', 'edit', 'multiple'].includes(taskDialog.type) && (
							<>
								<div className="p-4 flex flex-1 mb-8">
									<div className="flex-1 mr-5">
										<Autocomplete
											value={selectedUserId && users[selectedUserId]}
											onChange={(event, newValue) => {
												setSelectedUserId(newValue.id);
											}}
											disableClearable
											// size="small"
											// disabled={!(form.parent && form.parent.uid && form.name)} 
											id="users"
											options={Object.values(users)}
											getOptionLabel={option => option.username}
											// style={{ width: 200 }}
											renderInput={(params) => <TextField {...params} label="Assignee" required variant="outlined" />}
										/>
									</div>
									<div className="flex mr-5">
										<Autocomplete
											value={selectedBid}
											onChange={(event, newValue) => {
												setSelectedBid(newValue)
											}}
											disableClearable
											// size="small"
											id="bids"
											options={bids}
											// getOptionLabel={option => option.label}
											// getOptionSelected={option => option.label}
											// style={{ width: 200 }}
											renderInput={(params) => <TextField {...params} label="Bid" required variant="outlined" />}
										/>
									</div>
									<div className="flex flex-col" >
										<span title={"Click To Add New "} >
											<IconButton onClick={handleUserAdd} disabled={!selectedBid || !selectedUserId}>
												<Icon>add_circle_outline</Icon>
											</IconButton>
										</span>
									</div>
								</div>
								<div className="mb-8">
									{form.task_users && form.task_users.length > 0 && form.task_users.map(item => (
										<div key={item.user}>
											<ListItem key={item.user}>
												<ListItemAvatar>
													<Avatar src={users[item.user] && users[item.user].avatar}>
													</Avatar>
												</ListItemAvatar>
												<ListItemText primary={users[item.user] && users[item.user].username} secondary={item.bid_days} />
												<Button size="small" variant="outlined" color="secondary">
													{item.status ? statuses[item.status].name : 'Ready To Start'}
												</Button>
												<Tooltip title={"Click To Remove"}>
													<IconButton onClick={ev => {
														ev.stopPropagation()
														handleUserRemove(item)
													}}>
														<Icon>remove_circle_outline</Icon>
													</IconButton>
												</Tooltip>
											</ListItem>
											<Divider variant="inset" />
										</div>
									))}
								</div>
								<div className="flex mb-8">
									<div className="mr-5 flex-1">

										<TextField
											className="mb-8"
											label="Bid (in days)"
											autoFocus
											id="bid_days"
											name="bid_days"
											value={form.bid_days}
											// onChange={handleChange}
											variant="outlined"
											required
											fullWidth
											disabled
										/>

									</div>
									<div className="flex-1">

										<Autocomplete
											value={form.reviewer && users[form.reviewer?.id || form.reviewer]}
											onChange={(event, newValue) => {
												setInForm('reviewer', newValue.id)
											}}
											disableClearable
											getOptionLabel={option => option.username}
											id="reviewer"
											options={Object.values(users)}
											renderInput={(params) => <TextField {...params} label="Reviewer" required variant="outlined" />}

										/>

									</div>
								</div>
								<div className="flex mb-8">
									{taskDialog.type != 'new' && (<div className="mr-5 flex-1">
										<Autocomplete
											value={form.status && statuses[form.status?.id || form.status]}
											onChange={(event, newValue) => {
												setInForm('status', newValue.id)
											}}
											disableClearable
											getOptionLabel={option => option.name}
											id="status"
											options={Object.values(statuses)}
											renderInput={(params) => <TextField {...params} label="Status" required variant="outlined" />}

										/>
									</div>)}
									<div className="flex-1">
										<Autocomplete
											value={form.priority && priorities[form.priority?.id || form.priority]}
											onChange={(event, newValue) => {
												setInForm('priority', newValue.id)
											}}
											disableClearable
											getOptionLabel={option => option.name}
											id="priority"
											options={Object.values(priorities)}
											renderInput={(params) => <TextField {...params} label="Priority" required variant="outlined" />}

										/>
									</div>
								</div>
							</>
						)}
					</>


				</DialogContent>

				<DialogActions className="justify-between pl-16">

					<Button
						variant="contained"
						color="primary"
						onClick={handleSubmit}
						type="submit"
						disabled={!canBeSubmitted()}
					>
						{taskDialog.type === 'new' ? 'Add' : taskDialog.type === 'multiple' ? 'Save Selected' : 'Save'}
					</Button>

					<IconButton
						onClick={closeComposeDialog}
					>
						<Icon>close</Icon>
					</IconButton>
				</DialogActions>
			</form>
		</Dialog>
	);
}

export default TaskDialog;
