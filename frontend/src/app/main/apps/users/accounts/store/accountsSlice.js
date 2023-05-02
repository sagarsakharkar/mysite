import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

const url = '/api/v1/user/account/';

export const getAccounts = createAsyncThunk('accountsApp/accounts/getAccounts', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().accountsApp.accounts.routeParams;
	const id = routeParams.id
	const entity = routeParams.entity

	if (entity === 'group' && id) {
		const response = await axios.get('/api/v1/user/group/' + id + '/users/');
		const data = await response.data;
		return { data, routeParams };
	} else if (entity === 'project' && id) {
		const response = await axios.get('/api/v1/entity/project/' + id + '/users/');
		const data = await response.data;
		return { data, routeParams };
	} else {
		const response = await axios.get(url);
		const data = await response.data;
		return { data, routeParams };
	}
});

export const addAccount = createAsyncThunk(
	'accountsApp/accounts/addAccount',
	async (account, { dispatch, getState }) => {
		// account['re_password'] = account['password'];
		console.log(account)
		const response = await axios.post(url, account);
		const data = await response.data;

		return data;
	}
);

export const addAccountToProjects = createAsyncThunk(
	'accountsApp/accounts/addAccountToProject',
	async (data, { dispatch, getState }) => {
		data.projects.forEach((project, index) => {
			const response = axios.post('/api/v1/entity/project/' + project + '/add_users/', data.users);
			const r_data = response.data;
		})
	}
);

export const removeAccountFromProjects = createAsyncThunk(
	'accountsApp/accounts/removeAccountFromProjects',
	async (data, { dispatch, getState }) => {
		data.projects.forEach((project, index) => {
			const response = axios.post('/api/v1/entity/project/' + project + '/remove_users/', data.users);
			const r_data = response.data;
		})
	}
);

export const addAccountToGroups = createAsyncThunk(
	'accountsApp/accounts/addAccountToGroups',
	async (data, { dispatch, getState }) => {
		data.users.forEach((userId, index) => {
			const response = axios.post(url + userId + '/add_groups/', data.groups);
			const r_data = response.data;
		})
	}
);

export const removeAccountFromGroups = createAsyncThunk(
	'accountsApp/accounts/removeAccountFromGroups',
	async (data, { dispatch, getState }) => {
		data.users.forEach((userId, index) => {
			const response = axios.post(url + userId + '/remove_groups/', data.groups);
			const r_data = response.data;
		})
	}
);

export const updateAccount = createAsyncThunk(
	'accountsApp/accounts/updateAccount',
	async (account, { dispatch, getState }) => {
		console.log(account)
		const id = account.id
		delete account['id']
		const response = await axios.patch(url + id + '/', account);
		const data = await response.data;

		return data;
	}
);

export const removeAccount = createAsyncThunk(
	'accountsApp/accounts/removeAccount',
	async (id, { dispatch, getState }) => {
		const response = await axios.delete(url + id + '/');
		const data = await response.data;

		return data;
	}
);

export const removeAccounts = createAsyncThunk(
	'accountsApp/accounts/removeAccounts',
	async (userIds, { dispatch, getState }) => {
		userIds.forEach((id, index) => {
			const data = {
				id: id,
				is_active: false
			}
			dispatch(updateAccount(data))
		})

	}
);

const accountsAdapter = createEntityAdapter({
	sortComparer: (a, b) => b.date_joined.localeCompare(a.date_joined),
});

export const { selectAll: selectAccounts, selectById: selectAccountsById } = accountsAdapter.getSelectors(
	state => state.accountsApp.accounts
);

const accountsSlice = createSlice({
	name: 'accountsApp/accounts',
	initialState: accountsAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		accountDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		setAccountsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		resetAccountsSearchText: (state, action) => {
			state.searchText = '';
		},
		openNewAccountDialog: (state, action) => {
			state.accountDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewAccountDialog: (state, action) => {
			state.accountDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditAccountDialog: (state, action) => {
			state.accountDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditAccountDialog: (state, action) => {
			state.accountDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
		openChangePasswordDialog: (state, action) => {
			state.accountDialog = {
				type: 'change',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeChangePasswordDialog: (state, action) => {
			state.accountDialog = {
				type: 'change',
				props: {
					open: false
				},
				data: null
			};
		}
	},
	extraReducers: {
		[removeAccount.fulfilled]: accountsAdapter.removeOne,
		[updateAccount.fulfilled]: accountsAdapter.upsertOne,
		[addAccount.fulfilled]: accountsAdapter.addOne,
		[getAccounts.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			accountsAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		}
	}
});

export const {
	setAccountsSearchText,
	resetAccountsSearchText,
	openNewAccountDialog,
	closeNewAccountDialog,
	openEditAccountDialog,
	closeEditAccountDialog,
	openChangePasswordDialog,
	closeChangePasswordDialog
} = accountsSlice.actions;

export default accountsSlice.reducer;
