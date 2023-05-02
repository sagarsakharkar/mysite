import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

const url = '/api/v1/utility/role/';

export const getRoles = createAsyncThunk('rolesApp/roles/getRoles', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().rolesApp.roles.routeParams;
	const response = await axios.get(url, {
		params: routeParams
	});
	const data = await response.data;

	return { data, routeParams };
});

export const getRole = createAsyncThunk(
	'rolesApp/roles/getRole', 
	async (routeParams, { dispatch, getState }) => {
		routeParams = routeParams || getState().rolesApp.roles.routeParams;
		const id = routeParams.uid
		const response = await axios.get(url + id + '/');

		const data = await response.data;
		return { data, routeParams };
	}
);

export const addRole = createAsyncThunk(
	'rolesApp/roles/addRole',
	async (role, { dispatch, getState }) => {
		const response = await axios.post(url, role);
		const data = await response.data;

		return data;
	}
);

export const updateRole = createAsyncThunk(
	'rolesApp/roles/updateRole',
	async (role, { dispatch, getState }) => {
		const id = role.id
		delete role['id']
		const response = await axios.patch(url + id + '/', role);
		const data = await response.data;

		return data;
	}
);

export const removeRole = createAsyncThunk(
	'rolesApp/roles/removeRole',
	async (id, { dispatch, getState }) => {
		const response = await axios.delete(url + id + '/');
		const data = await response.data;

		return id;
	}
);

export const removeRoles = createAsyncThunk(
	'rolesApp/roles/removeRoles',
	async (roleIds, { dispatch, getState }) => {
		const response = await axios.post('/api/app/removes', { roleIds });
		const data = await response.data;

		return data;
	}
);

const rolesAdapter = createEntityAdapter({});

export const { selectAll: selectRoles, selectById: selectRolesById } = rolesAdapter.getSelectors(
	state => state.rolesApp.roles
);

const rolesSlice = createSlice({
	name: 'rolesApp/roles',
	initialState: rolesAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		roleDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		setRolesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		resetRolesSearchText: (state, action) => {
			state.searchText = '';
		},
		openNewRoleDialog: (state, action) => {
			state.roleDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewRoleDialog: (state, action) => {
			state.roleDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditRoleDialog: (state, action) => {
			state.roleDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditRoleDialog: (state, action) => {
			state.roleDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
	},
	extraReducers: {
		[removeRole.fulfilled]: (state, action) => {			
			rolesAdapter.removeOne(state, action.payload)		
		},
		[updateRole.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				rolesAdapter.upsertMany(state, action.payload)
			} else {
				rolesAdapter.upsertOne(state, action.payload)
			}
		},
		[addRole.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				rolesAdapter.upsertMany(state, action.payload)
			} else {
				rolesAdapter.upsertOne(state, action.payload)
			}
		},
		[getRole.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;

			rolesAdapter.upsertOne(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		},
		[getRoles.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			rolesAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		}
	}
});

export const {
	setRolesSearchText,
	resetRolesSearchText,
	openNewRoleDialog,
	closeNewRoleDialog,
	openEditRoleDialog,
	closeEditRoleDialog,
} = rolesSlice.actions;

export default rolesSlice.reducer;
