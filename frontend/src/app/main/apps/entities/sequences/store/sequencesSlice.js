import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { showMessage } from 'app/store/fuse/messageSlice';

const url = '/api/v1/entity/sequence/';
export const getSequences = createAsyncThunk('sequencesApp/sequence/getSequences', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().sequencesApp.sequences.routeParams;
	let response = {}
	if (routeParams.sequence_type){
		response = await axios.get(url, {
			params: routeParams
		});
	}else{
		response = await axios.get('/api/v1/entity/'+routeParams.entity+'/'+routeParams.uid+'/sequences/');
	}
	const data = await response.data;
	return { data, routeParams };	
});

export const getSequence = createAsyncThunk(
	'sequencesApp/sequence/getSequence', 
	async (routeParams, { dispatch, getState }) => {
		routeParams = routeParams || getState().overviewApp.sequences.routeParams;
		const id = routeParams.uid
		const response = await axios.get(url + id + '/');
		// console.log(response.status)

		const data = await response.data;
		return { data, routeParams };
	}
);

export const addSequence = createAsyncThunk(
	'sequencesApp/sequence/addSequence',
	async (sequence, { dispatch, getState }) => {
		const response = await axios.post(url, sequence);
		const data = await response.data;

		return data;
	}
);

export const addSequences = createAsyncThunk(
	'sequencesApp/sequence/addSequence',
	async (sequences, { dispatch, getState }) => {
		const response = await axios.post(url, sequences);
		const data = await response.data;

		return data;
	}
);

export const updateSequence = createAsyncThunk(
	'sequencesApp/sequence/updateSequence',
	async (sequence, { dispatch, getState }) => {
		const id = sequence.id
		delete sequence['id']
		const response = await axios.patch(url + id + '/', sequence);
		const data = await response.data;

		return data;
	}
);

export const updateMultipleSequences = createAsyncThunk(
	'sequencesApp/sequence/updateMultipleSequences',
	async (dataList, { dispatch, getState }) => {
		const routeParams = getState().sequencesApp.sequences.routeParams;
		const project = routeParams.uid.split(':')[0].toLowerCase()
		const response = await axios.post('/api/v1/entity/project/' + project + '/sequence_bulk_update/', dataList);
		const data = await response.data;

		return data;
	}
);

export const removeSequence = createAsyncThunk(
	'sequencesApp/sequence/removeSequence',
	async (id, { dispatch, getState }) => {
		const response = await axios.delete(url + id + '/');
		const data = await response.data;

		if (data) return id;
		
	}
);

export const removeSequences = createAsyncThunk(
	'sequencesApp/sequence/removeSequences',
	async (entityIds, { dispatch, getState }) => {
		confirmAlert({
			title: 'Confirm to delete sequences !!!',
			message: 'Are you sure, you want to remove selected sequences ?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						entityIds.map(row => {
							dispatch(removeSequence(row))
						})
						dispatch(showMessage({ message: 'Sequences has been removed successfully !' }));

					}
				},
				{
					label: 'No',
					onClick: () => console.log("No action to remove sequences")
				}
			]
		});
		
		return entityIds;
	}
);

const sequencesAdapter = createEntityAdapter({
	selectId: (entity) => entity.uid,
	// sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

export const { selectAll: selectSequences, selectEntities: selectSequence, selectById: selectSequenceById } = sequencesAdapter.getSelectors(
	state => state.sequencesApp ? state.sequencesApp.sequences : state.overviewApp.sequences
);

const sequencesSlice = createSlice({
	name: 'sequencesApp/sequences',
	initialState: sequencesAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		sequenceDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		setSequencesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		resetSequencesSearchText: (state, action) => {
			state.searchText = '';
		},
		openNewSequenceDialog: (state, action) => {
			state.sequenceDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewSequenceDialog: (state, action) => {
			state.sequenceDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditSequenceDialog: (state, action) => {
			state.sequenceDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditSequenceDialog: (state, action) => {
			state.sequenceDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
		openMultipleSequenceDialog: (state, action) => {
			state.sequenceDialog = {
				type: 'multiple',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeMultipleSequenceDialog: (state, action) => {
			state.sequenceDialog = {
				type: 'multiple',
				props: {
					open: false
				},
				data: null
			};
		},
		openCsvCreateDialog: (state, action) => {
			state.sequenceDialog = {
				type: 'csvCreate',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeCsvCreateDialog: (state, action) => {
			state.sequenceDialog = {
				type: 'csvCreate',
				props: {
					open: false
				},
				data: null
			};
		},
		openCsvUpdateDialog: (state, action) => {
			state.sequenceDialog = {
				type: 'csvUpdate',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeCsvUpdateDialog: (state, action) => {
			state.sequenceDialog = {
				type: 'csvUpdate',
				props: {
					open: false
				},
				data: null
			};
		},
	},
	extraReducers: {
		[removeSequence.fulfilled]: (state, action) => {			
			sequencesAdapter.removeOne(state, action.payload)		
		},
		[updateSequence.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				sequencesAdapter.upsertMany(state, action.payload)
			} else {
				sequencesAdapter.upsertOne(state, action.payload)
			}
		},
		[addSequence.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				sequencesAdapter.upsertMany(state, action.payload)
			} else {
				sequencesAdapter.upsertOne(state, action.payload)
			}
		},
		[addSequences.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				sequencesAdapter.upsertMany(state, action.payload)
			} else {
				sequencesAdapter.upsertOne(state, action.payload)
			}
		},
		[getSequence.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;

			sequencesAdapter.upsertOne(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		},
		[getSequences.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			sequencesAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		},
		[updateMultipleSequences.fulfilled]: (state, action) => {
			sequencesAdapter.upsertMany(state, action.payload)
		},
	}
});

export const {
	setSequencesSearchText,
	resetSequencesSearchText,
	openNewSequenceDialog,
	closeNewSequenceDialog,
	openEditSequenceDialog,
	closeEditSequenceDialog,
	openMultipleSequenceDialog,
	closeMultipleSequenceDialog,
	openCsvCreateDialog,
	closeCsvCreateDialog,
	openCsvUpdateDialog,
	closeCsvUpdateDialog
} = sequencesSlice.actions;

export default sequencesSlice.reducer;
