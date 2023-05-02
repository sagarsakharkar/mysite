import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { showMessage } from 'app/store/fuse/messageSlice';

const url = '/api/v1/entity/shot/';
export const getShots = createAsyncThunk('shotsApp/shot/getShots', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().shotsApp.shots.routeParams;
	let response = {}
	if (routeParams.shot_type){
		response = await axios.get(url, {
			params: routeParams
		});
	}else{
		response = await axios.get('/api/v1/entity/'+routeParams.entity+'/'+routeParams.uid+'/shots/');
	}
	const data = await response.data;
	return { data, routeParams };	
});

export const getShot = createAsyncThunk(
	'shotsApp/shot/getShot', 
	async (routeParams, { dispatch, getState }) => {
		routeParams = routeParams || getState().overviewApp.shots.routeParams;
		const id = routeParams.uid
		const response = await axios.get(url + id + '/');
		// console.log(response.status)

		const data = await response.data;
		return { data, routeParams };
	}
);

export const addShot = createAsyncThunk(
	'shotsApp/shot/addShot',
	async (shot, { dispatch, getState }) => {
		const response = await axios.post(url, shot);
		const data = await response.data;

		return data;
	}
);

export const addShots = createAsyncThunk(
	'shotsApp/shot/addShots',
	async (shots, { dispatch, getState }) => {
		const response = await axios.post(url, shots);
		const data = await response.data;

		return data;
	}
);

export const updateShot = createAsyncThunk(
	'shotsApp/shot/updateShot',
	async (shot, { dispatch, getState }) => {
		const id = shot.id
		delete shot['id']
		const response = await axios.patch(url + id + '/', shot);
		const data = await response.data;

		return data;
	}
);

export const updateMultipleShots = createAsyncThunk(
	'shotsApp/shot/updateMultipleShots',
	async (dataList, { dispatch, getState }) => {
		const routeParams = getState().shotsApp.shots.routeParams;
		const project = routeParams.uid.split(':')[0].toLowerCase()
		const response = await axios.post('/api/v1/entity/project/' + project + '/shot_bulk_update/', dataList);
		const data = await response.data;

		return data;
	}
);

export const removeShot = createAsyncThunk(
	'shotsApp/shot/removeShot',
	async (id, { dispatch, getState }) => {
		const response = await axios.delete(url + id + '/');
		const data = await response.data;

		if (data) return id;
		
	}
);

export const removeShots = createAsyncThunk(
	'shotsApp/shot/removeShots',
	async (entityIds, { dispatch, getState }) => {
		confirmAlert({
			title: 'Confirm to delete shots !!!',
			message: 'Are you sure, you want to remove selected shots ?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						entityIds.map(row => {
							dispatch(removeShot(row))
						})
						dispatch(showMessage({ message: 'Shots has been removed successfully !' }));

					}
				},
				{
					label: 'No',
					onClick: () => console.log("No action to remove shots")
				}
			]
		});
		
		return entityIds;
	}
);

const shotsAdapter = createEntityAdapter({
	selectId: (entity) => entity.uid,
	// sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

export const { selectAll: selectShots, selectEntities: selectShot, selectById: selectShotById } = shotsAdapter.getSelectors(
	state => state.shotsApp ? state.shotsApp.shots : state.overviewApp.shots
);

const shotsSlice = createSlice({
	name: 'shotsApp/shots',
	initialState: shotsAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		shotDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		setShotsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		resetShotsSearchText: (state, action) => {
			state.searchText = '';
		},
		openNewShotDialog: (state, action) => {
			state.shotDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewShotDialog: (state, action) => {
			state.shotDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditShotDialog: (state, action) => {
			state.shotDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditShotDialog: (state, action) => {
			state.shotDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
		openMultipleShotDialog: (state, action) => {
			state.shotDialog = {
				type: 'multiple',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeMultipleShotDialog: (state, action) => {
			state.shotDialog = {
				type: 'multiple',
				props: {
					open: false
				},
				data: null
			};
		},
		openCsvCreateDialog: (state, action) => {
			state.shotDialog = {
				type: 'csvCreate',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeCsvCreateDialog: (state, action) => {
			state.shotDialog = {
				type: 'csvCreate',
				props: {
					open: false
				},
				data: null
			};
		},
		openCsvUpdateDialog: (state, action) => {
			state.shotDialog = {
				type: 'csvUpdate',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeCsvUpdateDialog: (state, action) => {
			state.shotDialog = {
				type: 'csvUpdate',
				props: {
					open: false
				},
				data: null
			};
		},
	},
	extraReducers: {
		[removeShot.fulfilled]: (state, action) => {			
			shotsAdapter.removeOne(state, action.payload)		
		},
		[updateShot.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				shotsAdapter.upsertMany(state, action.payload)
			} else {
				shotsAdapter.upsertOne(state, action.payload)
			}
		},
		[addShot.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				shotsAdapter.upsertMany(state, action.payload)
			} else {
				shotsAdapter.upsertOne(state, action.payload)
			}
		},
		[addShots.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				shotsAdapter.upsertMany(state, action.payload)
			} else {
				shotsAdapter.upsertOne(state, action.payload)
			}
		},
		[getShot.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;

			shotsAdapter.upsertOne(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		},
		[getShots.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			shotsAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		},
		[updateMultipleShots.fulfilled]: (state, action) => {
			shotsAdapter.upsertMany(state, action.payload)
		},
	}
});

export const {
	setShotsSearchText,
	resetShotsSearchText,
	openNewShotDialog,
	closeNewShotDialog,
	openEditShotDialog,
	closeEditShotDialog,
	openMultipleShotDialog,
	closeMultipleShotDialog,
	openCsvCreateDialog,
	closeCsvCreateDialog,
	openCsvUpdateDialog,
	closeCsvUpdateDialog
} = shotsSlice.actions;

export default shotsSlice.reducer;
