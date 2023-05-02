import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

const url = '/api/v1/utility/tool/';

export const getTools = createAsyncThunk('toolsApp/tools/getTools', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().toolsApp.tools.routeParams;
	const response = await axios.get(url, {
		params: routeParams
	});
	const data = await response.data;

	return { data, routeParams };
});

export const getTool = createAsyncThunk(
	'toolsApp/tools/getTool', 
	async (routeParams, { dispatch, getState }) => {
		routeParams = routeParams || getState().toolsApp.tools.routeParams;
		const id = routeParams.uid
		const response = await axios.get(url + id + '/');

		const data = await response.data;
		return { data, routeParams };
	}
);

export const addTool = createAsyncThunk(
	'toolsApp/tools/addTool',
	async (tool, { dispatch, getState }) => {
		const response = await axios.post(url, tool);
		const data = await response.data;

		return data;
	}
);

export const updateTool = createAsyncThunk(
	'toolsApp/tools/updateTool',
	async (tool, { dispatch, getState }) => {
		const id = tool.id
		delete tool['id']
		const response = await axios.patch(url + id + '/', tool);
		const data = await response.data;

		return data;
	}
);

export const removeTool = createAsyncThunk(
	'toolsApp/tools/removeTool',
	async (id, { dispatch, getState }) => {
		const response = await axios.delete(url + id + '/');
		const data = await response.data;

		return id;
	}
);

export const removeTools = createAsyncThunk(
	'toolsApp/tools/removeTools',
	async (toolIds, { dispatch, getState }) => {
		const response = await axios.post('/api/app/removes', { toolIds });
		const data = await response.data;

		return data;
	}
);

const toolsAdapter = createEntityAdapter({});

export const { selectAll: selectTools, selectById: selectToolsById } = toolsAdapter.getSelectors(
	state => state.toolsApp.tools
);

const toolsSlice = createSlice({
	name: 'toolsApp/tools',
	initialState: toolsAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		toolDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		setToolsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		resetToolsSearchText: (state, action) => {
			state.searchText = '';
		},
		openNewToolDialog: (state, action) => {
			state.toolDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewToolDialog: (state, action) => {
			state.toolDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditToolDialog: (state, action) => {
			state.toolDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditToolDialog: (state, action) => {
			state.toolDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
	},
	extraReducers: {
		[removeTool.fulfilled]: (state, action) => {			
			toolsAdapter.removeOne(state, action.payload)		
		},
		[updateTool.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				toolsAdapter.upsertMany(state, action.payload)
			} else {
				toolsAdapter.upsertOne(state, action.payload)
			}
		},
		[addTool.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				toolsAdapter.upsertMany(state, action.payload)
			} else {
				toolsAdapter.upsertOne(state, action.payload)
			}
		},
		[getTool.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;

			toolsAdapter.upsertOne(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		},
		[getTools.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			toolsAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		}
	}
});

export const {
	setToolsSearchText,
	resetToolsSearchText,
	openNewToolDialog,
	closeNewToolDialog,
	openEditToolDialog,
	closeEditToolDialog,
} = toolsSlice.actions;

export default toolsSlice.reducer;
