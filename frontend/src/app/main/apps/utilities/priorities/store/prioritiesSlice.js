import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

const url = '/api/v1/utility/priority/';

export const getPriorities = createAsyncThunk('prioritiesApp/priorities/getPriorities', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().prioritiesApp.priorities.routeParams;
	const response = await axios.get(url, {
		params: routeParams
	});
	const data = await response.data;

	return { data, routeParams };
});

export const getPriority = createAsyncThunk(
	'prioritiesApp/priorities/getPriority', 
	async (routeParams, { dispatch, getState }) => {
		routeParams = routeParams || getState().prioritiesApp.priorities.routeParams;
		const id = routeParams.uid
		const response = await axios.get(url + id + '/');

		const data = await response.data;
		return { data, routeParams };
	}
);

export const addPriority = createAsyncThunk(
	'prioritiesApp/priorities/addPriority',
	async (priority, { dispatch, getState }) => {
		const response = await axios.post(url, priority);
		const data = await response.data;

		return data;
	}
);

export const updatePriority = createAsyncThunk(
	'prioritiesApp/priorities/updatePriority',
	async (priority, { dispatch, getState }) => {
		const id = priority.id
		delete priority['id']
		const response = await axios.patch(url + id + '/', priority);
		const data = await response.data;

		return data;
	}
);

export const removePriority = createAsyncThunk(
	'prioritiesApp/priorities/removePriority',
	async (id, { dispatch, getState }) => {
		const response = await axios.delete(url + id + '/');
		const data = await response.data;

		return id;
	}
);

export const removePriorities = createAsyncThunk(
	'prioritiesApp/priorities/removePriorities',
	async (priorityIds, { dispatch, getState }) => {
		const response = await axios.post('/api/app/removes', { priorityIds });
		const data = await response.data;

		return data;
	}
);

const prioritiesAdapter = createEntityAdapter({});

export const { selectAll: selectPriorities, selectById: selectPrioritiesById } = prioritiesAdapter.getSelectors(
	state => state.prioritiesApp.priorities
);

const prioritiesSlice = createSlice({
	name: 'prioritiesApp/priorities',
	initialState: prioritiesAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		priorityDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		setPrioritiesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		resetPrioritiesSearchText: (state, action) => {
			state.searchText = '';
		},
		openNewPriorityDialog: (state, action) => {
			state.priorityDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewPriorityDialog: (state, action) => {
			state.priorityDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditPriorityDialog: (state, action) => {
			state.priorityDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditPriorityDialog: (state, action) => {
			state.priorityDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
	},
	extraReducers: {
		[removePriority.fulfilled]: (state, action) => {			
			prioritiesAdapter.removeOne(state, action.payload)		
		},
		[updatePriority.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				prioritiesAdapter.upsertMany(state, action.payload)
			} else {
				prioritiesAdapter.upsertOne(state, action.payload)
			}
		},
		[addPriority.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				prioritiesAdapter.upsertMany(state, action.payload)
			} else {
				prioritiesAdapter.upsertOne(state, action.payload)
			}
		},
		[getPriority.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;

			prioritiesAdapter.upsertOne(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		},
		[getPriorities.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			prioritiesAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		}
	}
});

export const {
	setPrioritiesSearchText,
	resetPrioritiesSearchText,
	openNewPriorityDialog,
	closeNewPriorityDialog,
	openEditPriorityDialog,
	closeEditPriorityDialog,
} = prioritiesSlice.actions;

export default prioritiesSlice.reducer;
