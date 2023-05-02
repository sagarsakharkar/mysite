import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { showMessage } from 'app/store/fuse/messageSlice';

const url = '/api/v1/entity/task/';
export const getTasks = createAsyncThunk('tasksApp/task/getTasks', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().tasksApp.tasks.routeParams;
	let response = {}
	if (routeParams.task_type){
		response = await axios.get(url, {
			params: routeParams
		});
	}else{
		response = await axios.get('/api/v1/entity/'+routeParams.entity+'/'+routeParams.uid+'/tasks/');
	}
	const data = await response.data;
	return { data, routeParams };	
});

export const getTask = createAsyncThunk(
	'tasksApp/task/getTask', 
	async (routeParams, { dispatch, getState }) => {
		routeParams = routeParams || getState().overviewApp.tasks.routeParams;
		const id = routeParams.uid
		const response = await axios.get(url + id + '/');
		// console.log(response.status)

		const data = await response.data;
		return { data, routeParams };
	}
);

export const getTaskUsers = createAsyncThunk(
	'tasksApp/tasks/getTaskUser',
	async (taskId, { dispatch, getState }) => {

		const response = await axios.get('/api/v1/entity/usertask/', { params: { task: taskId } });
		const data = await response.data;

		return data;
	}
);

export const getAssignTasks = createAsyncThunk(
	'tasksApp/tasks/getAssignTasks',
	async (stepIds, { dispatch, getState }) => {

		const response = await axios.get(url, {
			params: {steps: stepIds + ''}});
		const data = await response.data;

		return data;
	}
);

export const addTask = createAsyncThunk(
	'tasksApp/task/addTask',
	async (task, { dispatch, getState }) => {
		const response = await axios.post(url, task);
		const data = await response.data;

		return data;
	}
);

export const addTasks = createAsyncThunk(
	'tasksApp/task/addTask',
	async (tasks, { dispatch, getState }) => {
		const response = await axios.post(url, tasks);
		const data = await response.data;

		return data;
	}
);

export const updateTask = createAsyncThunk(
	'tasksApp/task/updateTask',
	async (task, { dispatch, getState }) => {
		const id = task.id
		delete task['id']
		const response = await axios.patch(url + id + '/', task);
		const data = await response.data;

		return data;
	}
);

export const updateMultipleTasks = createAsyncThunk(
	'tasksApp/task/updateMultipleTasks',
	async (dataList, { dispatch, getState }) => {
		const routeParams = getState().tasksApp.tasks.routeParams;
		const project = routeParams.uid.split(':')[0].toLowerCase()
		const response = await axios.post('/api/v1/entity/project/' + project + '/task_bulk_update/', dataList);
		const data = await response.data;

		return data;
	}
);

export const updateTaskUser = createAsyncThunk(
	'tasksApp/tasks/updateTaskUser',
	async (task, { dispatch, getState }) => {
		const id = task.id
		delete task['id']
		const response = await axios.patch('/api/v1/entity/usertask/'+id+'/', task);
		const data = await response.data;

		return data;
	}
);

export const removeTask = createAsyncThunk(
	'tasksApp/task/removeTask',
	async (id, { dispatch, getState }) => {
		const response = await axios.delete(url + id + '/');
		const data = await response.data;

		if (data) return id;
		
	}
);

export const removeTasks = createAsyncThunk(
	'tasksApp/task/removeTasks',
	async (entityIds, { dispatch, getState }) => {
		confirmAlert({
			title: 'Confirm to delete tasks !!!',
			message: 'Are you sure, you want to remove selected tasks ?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						entityIds.map(row => {
							dispatch(removeTask(row))
						})
						dispatch(showMessage({ message: 'Tasks has been removed successfully !' }));

					}
				},
				{
					label: 'No',
					onClick: () => console.log("No action to remove tasks")
				}
			]
		});
		
		return entityIds;
	}
);

const tasksAdapter = createEntityAdapter({
	selectId: (entity) => entity.uid,
	// sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

export const { selectAll: selectTasks, selectEntities: selectTask, selectById: selectTaskById } = tasksAdapter.getSelectors(
	state => state.tasksApp ? state.tasksApp.tasks : state.overviewApp.tasks
);

const tasksSlice = createSlice({
	name: 'tasksApp/tasks',
	initialState: tasksAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		taskDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		setTasksSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		resetTasksSearchText: (state, action) => {
			state.searchText = '';
		},
		openNewTaskDialog: (state, action) => {
			state.taskDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewTaskDialog: (state, action) => {
			state.taskDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditTaskDialog: (state, action) => {
			state.taskDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditTaskDialog: (state, action) => {
			state.taskDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
		openMultipleTaskDialog: (state, action) => {
			state.taskDialog = {
				type: 'multiple',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeMultipleTaskDialog: (state, action) => {
			state.taskDialog = {
				type: 'multiple',
				props: {
					open: false
				},
				data: null
			};
		},
		openCsvCreateDialog: (state, action) => {
			state.taskDialog = {
				type: 'csvCreate',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeCsvCreateDialog: (state, action) => {
			state.taskDialog = {
				type: 'csvCreate',
				props: {
					open: false
				},
				data: null
			};
		},
		openCsvUpdateDialog: (state, action) => {
			state.taskDialog = {
				type: 'csvUpdate',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeCsvUpdateDialog: (state, action) => {
			state.taskDialog = {
				type: 'csvUpdate',
				props: {
					open: false
				},
				data: null
			};
		},
	},
	extraReducers: {
		[removeTask.fulfilled]: (state, action) => {			
			tasksAdapter.removeOne(state, action.payload)		
		},
		[updateTask.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				tasksAdapter.upsertMany(state, action.payload)
			} else {
				tasksAdapter.upsertOne(state, action.payload)
			}
		},
		[addTask.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				tasksAdapter.upsertMany(state, action.payload)
			} else {
				tasksAdapter.upsertOne(state, action.payload)
			}
		},
		[addTasks.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				tasksAdapter.upsertMany(state, action.payload)
			} else {
				tasksAdapter.upsertOne(state, action.payload)
			}
		},
		[getTask.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;

			tasksAdapter.upsertOne(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		},
		[getTasks.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			tasksAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		},
		[getTaskUsers.fulfilled]: (state, action) => {
			state.userTasks = action.payload;
		},
		[getAssignTasks.fulfilled]: (state, action) => {
			// state.assignTasks = action.payload;
			const data = action.payload;
			tasksAdapter.setAll(state, data ? data : []);
			state.searchText = '';
		},
		[updateMultipleTasks.fulfilled]: (state, action) => {
			tasksAdapter.upsertMany(state, action.payload)
		},
	}
});

export const {
	setTasksSearchText,
	resetTasksSearchText,
	openNewTaskDialog,
	closeNewTaskDialog,
	openEditTaskDialog,
	closeEditTaskDialog,
	openMultipleTaskDialog,
	closeMultipleTaskDialog,
	openCsvCreateDialog,
	closeCsvCreateDialog,
	openCsvUpdateDialog,
	closeCsvUpdateDialog
} = tasksSlice.actions;

export default tasksSlice.reducer;
