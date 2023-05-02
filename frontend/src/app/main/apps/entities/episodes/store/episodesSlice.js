import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { showMessage } from 'app/store/fuse/messageSlice';

const url = '/api/v1/entity/episode/';
export const getEpisodes = createAsyncThunk('episodesApp/episode/getEpisodes', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().episodesApp.episodes.routeParams;
	let response = {}
	if (routeParams.episode_type){
		response = await axios.get(url, {
			params: routeParams
		});
	}else{
		response = await axios.get('/api/v1/entity/'+routeParams.entity+'/'+routeParams.uid+'/episodes/');
	}
	const data = await response.data;
	return { data, routeParams };	
});

export const getEpisode = createAsyncThunk(
	'episodesApp/episode/getEpisode', 
	async (routeParams, { dispatch, getState }) => {
		routeParams = routeParams || getState().overviewApp.episodes.routeParams;
		const id = routeParams.uid
		const response = await axios.get(url + id + '/');
		// console.log(response.status)

		const data = await response.data;
		return { data, routeParams };
	}
);

export const addEpisode = createAsyncThunk(
	'episodesApp/episode/addEpisode',
	async (episode, { dispatch, getState }) => {
		const response = await axios.post(url, episode);
		const data = await response.data;

		return data;
	}
);

export const addEpisodes = createAsyncThunk(
	'episodesApp/episode/addEpisodes',
	async (episodes, { dispatch, getState }) => {
		const response = await axios.post(url, episodes);
		const data = await response.data;

		return data;
	}
);

export const updateEpisode = createAsyncThunk(
	'episodesApp/episode/updateEpisode',
	async (episode, { dispatch, getState }) => {
		const id = episode.id
		delete episode['id']
		const response = await axios.patch(url + id + '/', episode);
		const data = await response.data;

		return data;
	}
);

export const updateMultipleEpisodes = createAsyncThunk(
	'episodesApp/episode/updateMultipleEpisodes',
	async (dataList, { dispatch, getState }) => {
		const routeParams = getState().episodesApp.episodes.routeParams;
		const project = routeParams.uid.split(':')[0].toLowerCase()
		const response = await axios.post('/api/v1/entity/project/' + project + '/episode_bulk_update/', dataList);
		const data = await response.data;

		return data;
	}
);

export const removeEpisode = createAsyncThunk(
	'episodesApp/episode/removeEpisode',
	async (id, { dispatch, getState }) => {
		const response = await axios.delete(url + id + '/');
		const data = await response.data;

		if (data) return id;
		
	}
);

export const removeEpisodes = createAsyncThunk(
	'episodesApp/episode/removeEpisodes',
	async (entityIds, { dispatch, getState }) => {
		confirmAlert({
			title: 'Confirm to delete episodes !!!',
			message: 'Are you sure, you want to remove selected episodes ?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						entityIds.map(row => {
							dispatch(removeEpisode(row))
						})
						dispatch(showMessage({ message: 'Episodes has been removed successfully !' }));

					}
				},
				{
					label: 'No',
					onClick: () => console.log("No action to remove episodes")
				}
			]
		});
		
		return entityIds;
	}
);

const episodesAdapter = createEntityAdapter({
	selectId: (entity) => entity.uid,
});

export const { selectAll: selectEpisodes, selectEntities: selectEpisode, selectById: selectEpisodeById } = episodesAdapter.getSelectors(
	state => state.episodesApp ? state.episodesApp.episodes : state.overviewApp.episodes
);

const episodesSlice = createSlice({
	name: 'episodesApp/episodes',
	initialState: episodesAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		episodeDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		setEpisodesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		resetEpisodesSearchText: (state, action) => {
			state.searchText = '';
		},
		openNewEpisodeDialog: (state, action) => {
			state.episodeDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewEpisodeDialog: (state, action) => {
			state.episodeDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditEpisodeDialog: (state, action) => {
			state.episodeDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditEpisodeDialog: (state, action) => {
			state.episodeDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
		openMultipleEpisodeDialog: (state, action) => {
			state.episodeDialog = {
				type: 'multiple',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeMultipleEpisodeDialog: (state, action) => {
			state.episodeDialog = {
				type: 'multiple',
				props: {
					open: false
				},
				data: null
			};
		},
		openCsvCreateDialog: (state, action) => {
			state.episodeDialog = {
				type: 'csvCreate',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeCsvCreateDialog: (state, action) => {
			state.episodeDialog = {
				type: 'csvCreate',
				props: {
					open: false
				},
				data: null
			};
		},
		openCsvUpdateDialog: (state, action) => {
			state.episodeDialog = {
				type: 'csvUpdate',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeCsvUpdateDialog: (state, action) => {
			state.episodeDialog = {
				type: 'csvUpdate',
				props: {
					open: false
				},
				data: null
			};
		},
	},
	extraReducers: {
		[removeEpisode.fulfilled]: (state, action) => {			
			episodesAdapter.removeOne(state, action.payload)		
		},
		[updateEpisode.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				episodesAdapter.upsertMany(state, action.payload)
			} else {
				episodesAdapter.upsertOne(state, action.payload)
			}
		},
		[addEpisode.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				episodesAdapter.upsertMany(state, action.payload)
			} else {
				episodesAdapter.upsertOne(state, action.payload)
			}
		},
		[addEpisodes.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				episodesAdapter.upsertMany(state, action.payload)
			} else {
				episodesAdapter.upsertOne(state, action.payload)
			}
		},
		[getEpisode.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;

			episodesAdapter.upsertOne(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		},
		[getEpisodes.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			episodesAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		},
		[updateMultipleEpisodes.fulfilled]: (state, action) => {
			episodesAdapter.upsertMany(state, action.payload)
		},
	}
});

export const {
	setEpisodesSearchText,
	resetEpisodesSearchText,
	openNewEpisodeDialog,
	closeNewEpisodeDialog,
	openEditEpisodeDialog,
	closeEditEpisodeDialog,
	openMultipleEpisodeDialog,
	closeMultipleEpisodeDialog,
	openCsvCreateDialog,
	closeCsvCreateDialog,
	openCsvUpdateDialog,
	closeCsvUpdateDialog
} = episodesSlice.actions;

export default episodesSlice.reducer;
