import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

const url = '/api/v1/user/permission/';

export const getPermissions = createAsyncThunk('permissionsApp/permissions/getPermissions', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().permissionsApp.permissions.routeParams;
	const response = await axios.get(url, {
		params: routeParams
	});
	const data = await response.data;

	return { data, routeParams };
});

export const getPermission = createAsyncThunk(
	'permissionsApp/permissions/getPermission', 
	async (routeParams, { dispatch, getState }) => {
		routeParams = routeParams || getState().permissionsApp.permissions.routeParams;
		const id = routeParams.uid
		const response = await axios.get(url + id + '/');

		const data = await response.data;
		return { data, routeParams };
	}
);

export const addPermission = createAsyncThunk(
	'permissionsApp/permissions/addPermission',
	async (permission, { dispatch, getState }) => {
		const response = await axios.post(url, permission);
		const data = await response.data;

		return data;
	}
);

export const updatePermission = createAsyncThunk(
	'permissionsApp/permissions/updatePermission',
	async (permission, { dispatch, getState }) => {
		const id = permission.id
		delete permission['id']
		const response = await axios.patch(url + id + '/', permission);
		const data = await response.data;

		return data;
	}
);

const permissionsAdapter = createEntityAdapter({});

export const { selectAll: selectPermissions, selectById: selectPermissionsById } = permissionsAdapter.getSelectors(
	state => state.permissionsApp.permissions
);

const permissionsSlice = createSlice({
	name: 'permissionsApp/permissions',
	initialState: permissionsAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		selectedIds: [],
		permissionDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		toggleInSelectedPerm: {
			reducer: (state, action) => {
				const permId = action.payload;
				if (state.selectedIds.find(id => id === permId) !== undefined) {
					state.selectedIds = state.selectedIds.filter(id => id !== permId);
				}
				else {
					state.selectedIds = [...state.selectedIds, permId];
				}
				console.log(state.selectedIds, permId)
			},
			// prepare: event => ({ payload: event.target.value || '' })
		},
		setRolePermissions: {
			reducer: (state, action) => {
				state.selectedIds = action.payload;
				// console.log(state.selectedIds)
			},
			// prepare: event => ({ payload: event.target.value || '' })
		},
	},
	extraReducers: {
		[updatePermission.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				permissionsAdapter.upsertMany(state, action.payload)
			} else {
				permissionsAdapter.upsertOne(state, action.payload)
			}
		},
		[addPermission.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				permissionsAdapter.upsertMany(state, action.payload)
			} else {
				permissionsAdapter.upsertOne(state, action.payload)
			}
		},
		[getPermission.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;

			permissionsAdapter.upsertOne(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		},
		[getPermissions.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			permissionsAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		}
	}
});

export const {
	toggleInSelectedPerm,
	setRolePermissions,
} = permissionsSlice.actions;

export default permissionsSlice.reducer;
