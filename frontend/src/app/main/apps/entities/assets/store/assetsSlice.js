import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { showMessage } from 'app/store/fuse/messageSlice';

const url = '/api/v1/entity/asset/';
export const getAssets = createAsyncThunk('assetsApp/asset/getAssets', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().assetsApp.assets.routeParams;
	let response = {}
	if (routeParams.asset_type){
		response = await axios.get(url, {
			params: routeParams
		});
	}else{
		response = await axios.get('/api/v1/entity/'+routeParams.entity+'/'+routeParams.uid+'/assets/');
	}
	const data = await response.data;
	return { data, routeParams };	
});

export const getAsset = createAsyncThunk(
	'assetsApp/asset/getAsset', 
	async (routeParams, { dispatch, getState }) => {
		routeParams = routeParams || getState().overviewApp.assets.routeParams;
		const id = routeParams.uid
		const response = await axios.get(url + id + '/');
		// console.log(response.status)

		const data = await response.data;
		return { data, routeParams };
	}
);

export const addAsset = createAsyncThunk(
	'assetsApp/asset/addAsset',
	async (asset, { dispatch, getState }) => {
		const response = await axios.post(url, asset);
		const data = await response.data;

		return data;
	}
);

export const updateAsset = createAsyncThunk(
	'assetsApp/asset/updateAsset',
	async (asset, { dispatch, getState }) => {
		const id = asset.id
		delete asset['id']
		const response = await axios.patch(url + id + '/', asset);
		const data = await response.data;

		return data;
	}
);

export const updateMultipleAssets = createAsyncThunk(
	'assetsApp/asset/updateMultipleAssets',
	async (dataList, { dispatch, getState }) => {
		const routeParams = getState().assetsApp.assets.routeParams;
		const project = routeParams.uid.split(':')[0].toLowerCase()
		const response = await axios.post('/api/v1/entity/project/' + project + '/asset_bulk_update/', dataList);
		const data = await response.data;

		return data;
	}
);

export const removeAsset = createAsyncThunk(
	'assetsApp/asset/removeAsset',
	async (id, { dispatch, getState }) => {
		const response = await axios.delete(url + id + '/');
		const data = await response.data;

		if (data) return id;
		
	}
);

export const removeAssets = createAsyncThunk(
	'assetsApp/asset/removeAssets',
	async (entityIds, { dispatch, getState }) => {
		confirmAlert({
			title: 'Confirm to delete assets !!!',
			message: 'Are you sure, you want to remove selected assets ?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						entityIds.map(row => {
							dispatch(removeAsset(row))
						})
						dispatch(showMessage({ message: 'Assets has been removed successfully !' }));

					}
				},
				{
					label: 'No',
					onClick: () => console.log("No action to remove assets")
				}
			]
		});
		
		return entityIds;
	}
);

const assetsAdapter = createEntityAdapter({
	selectId: (entity) => entity.uid,
	// sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

export const { selectAll: selectAssets, selectById: selectAssetById } = assetsAdapter.getSelectors(
	state => state.assetsApp ? state.assetsApp.assets : state.overviewApp.assets
);

const assetsSlice = createSlice({
	name: 'assetsApp/assets',
	initialState: assetsAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		assetDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		setAssetsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		resetAssetsSearchText: (state, action) => {
			state.searchText = '';
		},
		openNewAssetDialog: (state, action) => {
			state.assetDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewAssetDialog: (state, action) => {
			state.assetDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditAssetDialog: (state, action) => {
			state.assetDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditAssetDialog: (state, action) => {
			state.assetDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
		openMultipleAssetDialog: (state, action) => {
			state.assetDialog = {
				type: 'multiple',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeMultipleAssetDialog: (state, action) => {
			state.assetDialog = {
				type: 'multiple',
				props: {
					open: false
				},
				data: null
			};
		},
		openCsvCreateDialog: (state, action) => {
			state.assetDialog = {
				type: 'csvCreate',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeCsvCreateDialog: (state, action) => {
			state.assetDialog = {
				type: 'csvCreate',
				props: {
					open: false
				},
				data: null
			};
		},
		openCsvUpdateDialog: (state, action) => {
			state.assetDialog = {
				type: 'csvUpdate',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeCsvUpdateDialog: (state, action) => {
			state.assetDialog = {
				type: 'csvUpdate',
				props: {
					open: false
				},
				data: null
			};
		},
	},
	extraReducers: {
		[removeAsset.fulfilled]: (state, action) => {			
			assetsAdapter.removeOne(state, action.payload)		
		},
		[updateAsset.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				assetsAdapter.upsertMany(state, action.payload)
			} else {
				assetsAdapter.upsertOne(state, action.payload)
			}
		},
		[addAsset.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				assetsAdapter.upsertMany(state, action.payload)
			} else {
				assetsAdapter.upsertOne(state, action.payload)
			}
		},
		[getAsset.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;

			assetsAdapter.upsertOne(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		},
		[getAssets.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			assetsAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		},
		[updateMultipleAssets.fulfilled]: (state, action) => {
			assetsAdapter.upsertMany(state, action.payload)
		},
	}
});

export const {
	setAssetsSearchText,
	resetAssetsSearchText,
	openNewAssetDialog,
	closeNewAssetDialog,
	openEditAssetDialog,
	closeEditAssetDialog,
	openMultipleAssetDialog,
	closeMultipleAssetDialog,
	openCsvCreateDialog,
	closeCsvCreateDialog,
	openCsvUpdateDialog,
	closeCsvUpdateDialog
} = assetsSlice.actions;

export default assetsSlice.reducer;
