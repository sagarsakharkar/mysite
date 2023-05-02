import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { showMessage } from 'app/store/fuse/messageSlice';

const url = '/api/v1/entity/step/';
export const getSteps = createAsyncThunk('stepsApp/steps/getSteps', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().stepsApp.steps.routeParams;
	const response = (routeParams.entity && routeParams.uid) 
					? await axios.get('/api/v1/entity/'+routeParams.entity+'/'+routeParams.uid+'/steps/')
					: await axios.get('/api/v1/entity/step/', { params: routeParams });
	const data = await response.data;
	return { data, routeParams };
});

export const getStep = createAsyncThunk(
	'stepsApp/step/getStep', 
	async (routeParams, { dispatch, getState }) => {
		routeParams = routeParams || getState().overviewApp.steps.routeParams;
		const id = routeParams.uid
		const response = await axios.get(url + id + '/');
		// console.log(response.status)

		const data = await response.data;
		return { data, routeParams };
	}
);

export const addStep = createAsyncThunk(
	'stepsApp/step/addStep',
	async (step, { dispatch, getState }) => {
		const response = await axios.post(url, step);
		const data = await response.data;

		return data;
	}
);

export const addSteps = createAsyncThunk(
	'stepsApp/step/addSteps',
	async (steps, { dispatch, getState }) => {
		const response = await axios.post(url, steps);
		const data = await response.data;

		return data;
	}
);

export const updateStep = createAsyncThunk(
	'stepsApp/step/updateStep',
	async (step, { dispatch, getState }) => {
		const id = step.id
		delete step['id']
		const response = await axios.patch(url + id + '/', step);
		const data = await response.data;

		return data;
	}
);

export const updateMultipleSteps = createAsyncThunk(
	'stepsApp/step/updateMultipleSteps',
	async (dataList, { dispatch, getState }) => {
		const routeParams = getState().stepsApp.steps.routeParams;
		const project = routeParams.uid.split(':')[0].toLowerCase()
		const response = await axios.post('/api/v1/entity/project/' + project + '/step_bulk_update/', dataList);
		const data = await response.data;

		return data;
	}
);

export const removeStep = createAsyncThunk(
	'stepsApp/step/removeStep',
	async (id, { dispatch, getState }) => {
		const response = await axios.delete(url + id + '/');
		const data = await response.data;

		if (data) return id;
		
	}
);

export const removeSteps = createAsyncThunk(
	'stepsApp/step/removeSteps',
	async (entityIds, { dispatch, getState }) => {
		confirmAlert({
			title: 'Confirm to delete steps !!!',
			message: 'Are you sure, you want to remove selected steps ?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						entityIds.map(row => {
							dispatch(removeStep(row))
						})
						dispatch(showMessage({ message: 'Steps has been removed successfully !' }));

					}
				},
				{
					label: 'No',
					onClick: () => console.log("No action to remove steps")
				}
			]
		});
		
		return entityIds;
	}
);

const stepsAdapter = createEntityAdapter({
	selectId: (entity) => entity.uid,
	// sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

export const { selectAll: selectSteps, selectEntities: selectStep, selectById: selectStepById } = stepsAdapter.getSelectors(
	state => state.stepsApp ? state.stepsApp.steps : state.overviewApp.steps
);

const stepsSlice = createSlice({
	name: 'stepsApp/steps',
	initialState: stepsAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		stepDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		setStepsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		resetStepsSearchText: (state, action) => {
			state.searchText = '';
		},
		openNewStepDialog: (state, action) => {
			state.stepDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewStepDialog: (state, action) => {
			state.stepDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditStepDialog: (state, action) => {
			state.stepDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditStepDialog: (state, action) => {
			state.stepDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
		openMultipleStepDialog: (state, action) => {
			state.stepDialog = {
				type: 'multiple',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeMultipleStepDialog: (state, action) => {
			state.stepDialog = {
				type: 'multiple',
				props: {
					open: false
				},
				data: null
			};
		},
		openCsvCreateDialog: (state, action) => {
			state.stepDialog = {
				type: 'csvCreate',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeCsvCreateDialog: (state, action) => {
			state.stepDialog = {
				type: 'csvCreate',
				props: {
					open: false
				},
				data: null
			};
		},
		openCsvUpdateDialog: (state, action) => {
			state.stepDialog = {
				type: 'csvUpdate',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeCsvUpdateDialog: (state, action) => {
			state.stepDialog = {
				type: 'csvUpdate',
				props: {
					open: false
				},
				data: null
			};
		},
	},
	extraReducers: {
		[removeStep.fulfilled]: (state, action) => {			
			stepsAdapter.removeOne(state, action.payload)		
		},
		[updateStep.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				stepsAdapter.upsertMany(state, action.payload)
			} else {
				stepsAdapter.upsertOne(state, action.payload)
			}
		},
		[addStep.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				stepsAdapter.upsertMany(state, action.payload)
			} else {
				stepsAdapter.upsertOne(state, action.payload)
			}
		},
		[addSteps.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				stepsAdapter.upsertMany(state, action.payload)
			} else {
				stepsAdapter.upsertOne(state, action.payload)
			}
		},
		[getStep.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;

			stepsAdapter.upsertOne(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		},
		[getSteps.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			stepsAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		},
		[updateMultipleSteps.fulfilled]: (state, action) => {
			stepsAdapter.upsertMany(state, action.payload)
		},
	}
});

export const {
	setStepsSearchText,
	resetStepsSearchText,
	openNewStepDialog,
	closeNewStepDialog,
	openEditStepDialog,
	closeEditStepDialog,
	openMultipleStepDialog,
	closeMultipleStepDialog,
	openCsvCreateDialog,
	closeCsvCreateDialog,
	openCsvUpdateDialog,
	closeCsvUpdateDialog
} = stepsSlice.actions;

export default stepsSlice.reducer;
