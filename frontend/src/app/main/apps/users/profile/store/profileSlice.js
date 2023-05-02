import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { setUser, updateUserData } from 'app/store/userSlice';

export const getProfiles = createAsyncThunk('profileApp/profile/getProfiles', async (routeParams, { dispatch, getState }) => {
	routeParams = routeParams || getState().profileApp.profile.routeParams;
	const response = await axios.get('/auth/users/me/');
	const data = await response.data;

	// dispatch(setUser(data))

	return { data, routeParams };
});

export const getUserGroups = createAsyncThunk(
	'accountsApp/accounts/getUserGroups',
	async (userId, { dispatch, getState }) => {
		const response = await axios.get('/api/v1/user/account/' + userId + '/groups/');
		const data = await response.data;

		return data;
	}
);

export const updateProfile = createAsyncThunk(
	'profileApp/profile/updateProfile',
	async (profile, { dispatch, getState }) => {
		const id = profile.id
		delete profile['id']
		// const response = await axios.patch('/auth/users/me/', profile);
		const response = await axios.patch('/api/v1/user/account/' + id + '/', profile);
		const data = await response.data;

		const role_response = await axios.get('/api/v1/utility/role/');
		const roles = await role_response.data;

		const role = data.role ? _.find(roles, {id: data.role}) : null

		data.role = data.is_superuser ? 'admin' : role && role.name ? role.name.toLowerCase().replace(' ', '_') : 'artist'

		dispatch(updateUserData(data));

		return data;
	}
);

const profileAdapter = createEntityAdapter({});

export const { selectAll: selectProfiles, selectById: selectProfilesById } = profileAdapter.getSelectors(
	state => state.profileApp.profile
);

const profileSlice = createSlice({
	name: 'profileApp/profile',
	initialState: profileAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		groups: [],
		profileDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		openEditProfileDialog: (state, action) => {
			console.log(state.profileDialog)

			state.profileDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditProfileDialog: (state, action) => {
			state.profileDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
		openChangePasswordDialog: (state, action) => {
			state.profileDialog = {
				type: 'change',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeChangePasswordDialog: (state, action) => {
			state.profileDialog = {
				type: 'change',
				props: {
					open: false
				},
				data: null
			};
		}
	},
	extraReducers: {
		[updateProfile.fulfilled]: profileAdapter.upsertOne,
		[getProfiles.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			profileAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		},
		[getUserGroups.fulfilled]: (state, action) => {
			const data = action.payload;
			state.groups = data		
		}
	}
});

export const {
	openEditProfileDialog,
	closeEditProfileDialog,
	openChangePasswordDialog,
	closeChangePasswordDialog
} = profileSlice.actions;

export default profileSlice.reducer;
