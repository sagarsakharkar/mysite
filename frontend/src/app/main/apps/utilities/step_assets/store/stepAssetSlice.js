import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

const url = '/api/v1/utility/stepasset/';

export const getStepAssets = createAsyncThunk('stepAssetApp/stepAsset/getStepAsset', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().stepAssetApp.stepAsset.routeParams;
	const response = await axios.get(url, {
		params: routeParams
	});
	const data = await response.data;

	return { data, routeParams };
});

export const getStepAsset = createAsyncThunk(
	'stepAssetApp/stepAsset/getStepAsset', 
	async (routeParams, { dispatch, getState }) => {
		routeParams = routeParams || getState().stepAssetApp.stepAsset.routeParams;
		const id = routeParams.uid
		const response = await axios.get(url + id + '/');

		const data = await response.data;
		return { data, routeParams };
	}
);

export const addStepAsset = createAsyncThunk(
	'stepAssetApp/stepAsset/addStepAsset',
	async (stepAsset, { dispatch, getState }) => {
		const response = await axios.post(url, stepAsset);
		const data = await response.data;

		return data;
	}
);

export const updateStepAsset = createAsyncThunk(
	'stepAssetApp/stepAsset/updateStepAsset',
	async (stepAsset, { dispatch, getState }) => {
		const id = stepAsset.id
		delete stepAsset['id']
		const response = await axios.patch(url + id + '/', stepAsset);
		const data = await response.data;

		return data;
	}
);

export const removeStepAsset = createAsyncThunk(
	'stepAssetApp/stepAsset/removeStepAsset',
	async (id, { dispatch, getState }) => {
		const response = await axios.delete(url + id + '/');
		const data = await response.data;

		return id;
	}
);

export const removeStepAssets = createAsyncThunk(
	'stepAssetApp/stepAsset/removeStepAsset',
	async (stepAssetIds, { dispatch, getState }) => {
		const response = await axios.post('/api/app/removes', { stepAssetIds });
		const data = await response.data;

		return data;
	}
);

const stepAssetAdapter = createEntityAdapter({});

export const { selectAll: selectStepAsset, selectById: selectStepAssetById } = stepAssetAdapter.getSelectors(
	state => state.stepAssetApp.stepAsset
);

const stepAssetSlice = createSlice({
	name: 'stepAssetApp/stepAsset',
	initialState: stepAssetAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		stepAssetDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		setStepAssetSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		resetStepAssetSearchText: (state, action) => {
			state.searchText = '';
		},
		openNewStepAssetDialog: (state, action) => {
			state.stepAssetDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewStepAssetDialog: (state, action) => {
			state.stepAssetDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditStepAssetDialog: (state, action) => {
			state.stepAssetDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditStepAssetDialog: (state, action) => {
			state.stepAssetDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
	},
	extraReducers: {
		[removeStepAsset.fulfilled]: (state, action) => {			
			stepAssetAdapter.removeOne(state, action.payload)		
		},
		[updateStepAsset.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				stepAssetAdapter.upsertMany(state, action.payload)
			} else {
				stepAssetAdapter.upsertOne(state, action.payload)
			}
		},
		[addStepAsset.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				stepAssetAdapter.upsertMany(state, action.payload)
			} else {
				stepAssetAdapter.upsertOne(state, action.payload)
			}
		},
		[getStepAsset.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;

			stepAssetAdapter.upsertOne(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		},
		[getStepAsset.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			stepAssetAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		}
	}
});

export const {
	setStepAssetSearchText,
	resetStepAssetSearchText,
	openNewStepAssetDialog,
	closeNewStepAssetDialog,
	openEditStepAssetDialog,
	closeEditStepAssetDialog,
} = stepAssetSlice.actions;

export default stepAssetSlice.reducer;
