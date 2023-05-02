import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

const url = '/api/v1/utility/utilstep/';

export const getUtilSteps = createAsyncThunk('stepsApp/steps/getUtilSteps', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().stepsApp.steps.routeParams;
	const response = await axios.get(url, {
		params: routeParams
	});
	const data = await response.data;

	return { data, routeParams };
});

export const getStep = createAsyncThunk(
	'stepsApp/steps/getStep', 
	async (routeParams, { dispatch, getState }) => {
		routeParams = routeParams || getState().stepsApp.steps.routeParams;
		const id = routeParams.uid
		const response = await axios.get(url + id + '/');

		const data = await response.data;
		return { data, routeParams };
	}
);

export const addStep = createAsyncThunk(
	'stepsApp/steps/addStep',
	async (step, { dispatch, getState }) => {
		const response = await axios.post(url, step);
		const data = await response.data;

		return data;
	}
);

export const updateStep = createAsyncThunk(
	'stepsApp/steps/updateStep',
	async (step, { dispatch, getState }) => {
		const id = step.id
		delete step['id']
		const response = await axios.patch(url + id + '/', step);
		const data = await response.data;

		return data;
	}
);

export const removeStep = createAsyncThunk(
	'stepsApp/steps/removeStep',
	async (id, { dispatch, getState }) => {
		const response = await axios.delete(url + id + '/');
		const data = await response.data;

		return id;
	}
);

export const removeSteps = createAsyncThunk(
	'stepsApp/steps/removeSteps',
	async (stepIds, { dispatch, getState }) => {
		const response = await axios.post('/api/app/removes', { stepIds });
		const data = await response.data;

		return data;
	}
);

const stepsAdapter = createEntityAdapter({});

export const { selectAll: selectSteps, selectById: selectStepsById } = stepsAdapter.getSelectors(
	state => state.stepsApp.steps
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
		[getStep.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;

			stepsAdapter.upsertOne(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		},
		[getUtilSteps.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			stepsAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		}
	}
});

export const {
	setStepsSearchText,
	resetStepsSearchText,
	openNewStepDialog,
	closeNewStepDialog,
	openEditStepDialog,
	closeEditStepDialog,
} = stepsSlice.actions;

export default stepsSlice.reducer;
