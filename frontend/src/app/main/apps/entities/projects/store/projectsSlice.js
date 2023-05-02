import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';

const url = '/api/v1/entity/project/';

export const getProjects = createAsyncThunk('projectsApp/projects/getProjects', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().projectsApp.projects.routeParams;
	const response = await axios.get(url);
	const data = await response.data;

	return { data, routeParams };
});

export const getProject = createAsyncThunk(
	'projectsApp/projects/getProject',
	async (routeParams, { dispatch, getState }) => {
		routeParams = routeParams || getState().overviewApp.projects.routeParams;
		const id = routeParams.uid
		const response = await axios.get(url + id + '/');

		const data = await response.data;
		return { data, routeParams };
	}
);

export const addProject = createAsyncThunk(
	'projectsApp/projects/addProject',
	async (project, { dispatch, getState }) => {
		delete project.thumbnail
		const response = await axios.post(url, project);
		const data = await response.data;

		dispatch(showMessage({ message: `Project (${project.code}) has created !!!` }));
		return data;
	}
);

export const updateProject = createAsyncThunk(
	'projectsApp/projects/updateProject',
	async (project, { dispatch, getState }) => {
		const id = project.id
		delete project['id']
		const response = await axios.patch(url + id + '/', project);
		const data = await response.data;

		dispatch(showMessage({ message: `Project (${id}) has updated !!!` }));
		return data;
	}
);

export const removeProject = createAsyncThunk(
	'projectsApp/projects/removeProject',
	async (id, { dispatch, getState }) => {
		const response = await axios.delete(url + id + '/');
		const data = await response.data;

		return data;
	}
);

export const setEmptyProjects = createAsyncThunk(
	'projectsApp/projects/setEmptyProjects',
	async () => {
		return [];
	}
);

const projectsAdapter = createEntityAdapter({
	selectId: (project) => project.uid,
});

export const { selectAll: selectProjects, selectEntities: selectProject, selectById: selectProjectById } = projectsAdapter.getSelectors(
	state => state.projectsApp ? state.projectsApp.projects : state.overviewApp.projects
);

export const selectProjectsSearchText = ({ projectsApp }) => projectsApp.projects.searchText;

const projectsSlice = createSlice({
	name: 'projectsApp/projects',
	initialState: projectsAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		projectDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		setProjectsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: (event) => ({ payload: event.target.value || '' }),
		},
		openNewProjectDialog: (state, action) => {
			state.projectDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewProjectDialog: (state, action) => {
			state.projectDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditProjectDialog: (state, action) => {
			state.projectDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditProjectDialog: (state, action) => {
			state.projectDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
	},
	extraReducers: {
		[updateProject.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				projectsAdapter.upsertMany(state, action.payload)
			} else {
				projectsAdapter.upsertOne(state, action.payload)
			}
		},
		[addProject.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				projectsAdapter.upsertMany(state, action.payload)
			} else {
				projectsAdapter.upsertOne(state, action.payload)
			}
		},
		[getProject.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;

			projectsAdapter.setOne(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		},
		[getProjects.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			projectsAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		},
		[setEmptyProjects.fulfilled]: (state, action) => {
			projectsAdapter.setAll(state, action.payload);
			state.searchText = '';
		}
	}
});

export const {
	setProjectsSearchText,
	openNewProjectDialog,
	closeNewProjectDialog,
	openEditProjectDialog,
	closeEditProjectDialog,
} = projectsSlice.actions;

export default projectsSlice.reducer;
