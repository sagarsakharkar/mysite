import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getVersions = createAsyncThunk('versionsApp/versions/getVersions', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().versionsApp.versions.routeParams;
	const response = await axios.get('/api/v1/entity/'+routeParams.entity+'/'+routeParams.uid+'/versions/');
	const data = await response.data;
	return { data, routeParams };
});

export const addVersion = createAsyncThunk(
	'versionsApp/versions/addVersion',
	async (version, { dispatch, getState }) => {

		if (version.files && version.files.length > 0) {
			const formData = new FormData();
			for (let i = 0; i < version.files.length; i++) {
				formData.append(`files`, version.files[i])
			}

			const uploadResponse = await axios.post('/api/v1/upload/file/', formData);
			const uploadData = await uploadResponse.data;
			version.media_files = uploadData.map(item => item.id)
			delete version.files
		}
		const response = await axios.post('/api/v1/entity/version/', version);
		const data = await response.data;

		return data;
	}
);

export const updateVersion = createAsyncThunk(
	'versionsApp/versions/updateVersion',
	async (version, { dispatch, getState }) => {
		const id = version.id
		delete version['id']

		if (version.files && version.files.length > 0) {
			version.media_files = []
			const formData = new FormData();
			for (let i = 0; i < version.files.length; i++) {

				if (!version.files[i].id) {
					formData.append(`files`, version.files[i])
				} else {
					version.media_files = [...version.media_files, version.files[i].id]
				}
			}

			if (formData.get('files')) {
				const uploadResponse = await axios.post('/api/v1/upload/file/', formData);
				const uploadData = await uploadResponse.data;
				version.media_files = [...version.media_files, ...uploadData.map(item => item.id)]
			}
			delete version.files
		}
		const response = await axios.patch('/api/v1/entity/version/' + id + '/', version);
		const data = await response.data;

		return data;
	}
);

export const updateMultipleVersions = createAsyncThunk(
	'versionsApp/version/updateMultipleVersions',
	async (dataList, { dispatch, getState }) => {
		const routeParams = getState().versionsApp.versions.routeParams;
		const project = routeParams.uid.split(':')[0].toLowerCase()
		const response = await axios.post('/api/v1/entity/project/' + project + '/version_bulk_update/', dataList);
		const data = await response.data;

		return data;
	}
);

export const removeVersion = createAsyncThunk(
	'versionsApp/versions/removeVersion',
	async (id, { dispatch, getState }) => {
		const response = await axios.delete('/api/v1/entity/version/' + id + '/');
		const data = await response.data;

		return id;
	}
);

export const removeVersions = createAsyncThunk(
	'versionsApp/versions/removeVersions',
	async (versionIds, { dispatch, getState }) => {
		const response = await axios.post('/api/versions-app/remove-versions', { versionIds });
		const data = await response.data;

		return versionIds;
	}
);

const versionsAdapter = createEntityAdapter({
	selectId: (entity) => entity.uid,
	// sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

export const { selectAll: selectVersions, selectById: selectVersionById } = versionsAdapter.getSelectors(
	state => state.versionsApp.versions
);

const versionsSlice = createSlice({
	name: 'versionsApp/versions',
	initialState: versionsAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		versionDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		setVersionsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		resetVersionsSearchText: (state, action) => {
			state.searchText = '';
		},
		openNewVersionDialog: (state, action) => {
			state.versionDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewVersionDialog: (state, action) => {
			state.versionDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditVersionDialog: (state, action) => {
			state.versionDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditVersionDialog: (state, action) => {
			state.versionDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
		openMultipleVersionDialog: (state, action) => {
			state.versionDialog = {
				type: 'multiple',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeMultipleVersionDialog: (state, action) => {
			state.versionDialog = {
				type: 'multiple',
				props: {
					open: false
				},
				data: null
			};
		},
	},
	extraReducers: {
		[removeVersion.fulfilled]: (state, action) => {			
			versionsAdapter.removeOne(state, action.payload)		
		},
		[updateVersion.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				versionsAdapter.upsertMany(state, action.payload)
			} else {
				versionsAdapter.upsertOne(state, action.payload)
			}
		},
		[addVersion.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				versionsAdapter.upsertMany(state, action.payload)
			} else {
				versionsAdapter.addOne(state, action.payload)
			}
		},
		[getVersions.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			versionsAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		},
		[updateMultipleVersions.fulfilled]: (state, action) => {
			versionsAdapter.upsertMany(state, action.payload)
		},
	}
});

export const {
	setVersionsSearchText,
	resetVersionsSearchText,
	openNewVersionDialog,
	closeNewVersionDialog,
	openEditVersionDialog,
	closeEditVersionDialog,
	openMultipleVersionDialog,
	closeMultipleVersionDialog
} = versionsSlice.actions;

export default versionsSlice.reducer;
