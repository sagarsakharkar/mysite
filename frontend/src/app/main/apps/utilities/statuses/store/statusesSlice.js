import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

const url = '/api/v1/utility/status/';

export const getStatuses = createAsyncThunk('statusesApp/statuses/getStatuses', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().statusesApp.statuses.routeParams;
	const response = await axios.get(url, {
		params: routeParams
	});
	const data = await response.data;

	return { data, routeParams };
});

export const getStatus = createAsyncThunk(
	'statusesApp/statuses/getStatus', 
	async (routeParams, { dispatch, getState }) => {
		routeParams = routeParams || getState().statusesApp.statuses.routeParams;
		const id = routeParams.uid
		const response = await axios.get(url + id + '/');

		const data = await response.data;
		return { data, routeParams };
	}
);

export const addStatus = createAsyncThunk(
	'statusesApp/statuses/addStatus',
	async (status, { dispatch, getState }) => {
		const response = await axios.post(url, status);
		const data = await response.data;

		return data;
	}
);

export const updateStatus = createAsyncThunk(
	'statusesApp/statuses/updateStatus',
	async (status, { dispatch, getState }) => {
		const id = status.id
		delete status['id']
		const response = await axios.patch(url + id + '/', status);
		const data = await response.data;

		return data;
	}
);

export const removeStatus = createAsyncThunk(
	'statusesApp/statuses/removeStatus',
	async (id, { dispatch, getState }) => {
		const response = await axios.delete(url + id + '/');
		const data = await response.data;

		return id;
	}
);

export const removeStatuses = createAsyncThunk(
	'statusesApp/statuses/removeStatuses',
	async (statusIds, { dispatch, getState }) => {
		const response = await axios.post('/api/app/removes', { statusIds });
		const data = await response.data;

		return data;
	}
);

const statusesAdapter = createEntityAdapter({});

export const { selectAll: selectStatuses, selectById: selectStatusesById } = statusesAdapter.getSelectors(
	state => state.statusesApp.statuses
);

const statusesSlice = createSlice({
	name: 'statusesApp/statuses',
	initialState: statusesAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		statusDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		setStatusesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		resetStatusesSearchText: (state, action) => {
			state.searchText = '';
		},
		openNewStatusDialog: (state, action) => {
			state.statusDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewStatusDialog: (state, action) => {
			state.statusDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditStatusDialog: (state, action) => {
			state.statusDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditStatusDialog: (state, action) => {
			state.statusDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
	},
	extraReducers: {
		[removeStatus.fulfilled]: (state, action) => {			
			statusesAdapter.removeOne(state, action.payload)		
		},
		[updateStatus.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				statusesAdapter.upsertMany(state, action.payload)
			} else {
				statusesAdapter.upsertOne(state, action.payload)
			}
		},
		[addStatus.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				statusesAdapter.upsertMany(state, action.payload)
			} else {
				statusesAdapter.upsertOne(state, action.payload)
			}
		},
		[getStatus.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;

			statusesAdapter.upsertOne(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		},
		[getStatuses.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			statusesAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		}
	}
});

export const {
	setStatusesSearchText,
	resetStatusesSearchText,
	openNewStatusDialog,
	closeNewStatusDialog,
	openEditStatusDialog,
	closeEditStatusDialog,
} = statusesSlice.actions;

export default statusesSlice.reducer;
