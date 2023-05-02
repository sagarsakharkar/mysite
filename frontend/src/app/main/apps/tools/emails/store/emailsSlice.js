import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from '@lodash';
import { showMessage } from 'app/store/fuse/messageSlice';
import reorder, { reorderQuoteMap } from './reorder';
import { useSelector } from 'react-redux';

const url = '/api/v1/tool/email/';

export const getEmail = createAsyncThunk('emailsApp/emails/getEmail', async (id, { getState }) => {
	const response = await axios.get(url + id + '/');
	const data = await response.data;
	return data
});

export const addEmail = createAsyncThunk(
	'emailsApp/emails/addEmail',
	async (email, { dispatch, getState }) => {
		const id = email.id
		delete email['id']
		console.log(email)
		const response = await axios.post(url, email);
		const data = await response.data;

		dispatch(showMessage({ message: 'Email has been added successfully !' }));

		return data;
	}
);

export const updateEmail = createAsyncThunk(
	'emailsApp/emails/updateEmail',
	async (email, { dispatch, getState }) => {
		const id = email.id
		delete email['id']
		const response = await axios.patch(url + id + '/', email);
		const data = await response.data;

		dispatch(showMessage({ message: 'Email has been updated successfully !' }));

		return data;
	}
);

export const removeEmail = createAsyncThunk(
	'emailsApp/emails/removeEmail',
	async (id, { dispatch, getState }) => {
		const response = await axios.delete(url + id + '/');
		const data = await response.data;
		return data;
	}
);

export const removeEmails = createAsyncThunk(
	'emailsApp/emails/removeEmails',
	async (emailIds, { dispatch, getState }) => {
		const response = await axios.post('/api/emails-app/remove-emails', { emailIds });
		const data = await response.data;
		return data;
	}
);

export const updateEmailBoard = createAsyncThunk(
	'emailsApp/emails/updateEmailBoard',
	async ({ all = [], to = [], cc = [] }) => {
		const listToCc = to.concat(cc)
		const allEmails = all.filter(x => !listToCc.includes(x)) || [];
		const toEmails = to.filter((el) => !cc.includes(el)) || []
		const ccEmails = cc.filter((el) => !to.includes(el)) || []

		return { allEmails, toEmails, ccEmails };
	}
);


export const reorderCard = createAsyncThunk(
	'emailsApp/emails/reorderCard',
	async ({ source, destination }, { dispatch, getState }) => {
		const { emails } = getState().emailsApp;
		const { board } = emails;

		const ordered = reorderQuoteMap(_.merge([], board), source, destination);

		const data = ordered;

		dispatch(
			showMessage({
				message: 'Click update to save changes',
				autoHideDuration: 2000,
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right'
				}
			})
		);

		return data;
	}
);

const emailsAdapter = createEntityAdapter({
	selectId: (entity) => entity.uid
});

export const { selectAll: selectEmails, selectById: selectEmailById } = emailsAdapter.getSelectors(
	state => state.emailsApp.emails
);

export const selectEmailsSearchText = ({ emailsApp }) => emailsApp.emails.searchText;

const emailsSlice = createSlice({
	name: 'emailsApp/emails',
	initialState: emailsAdapter.getInitialState({
		searchText: '',
		emailDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		},
		board: {
			all: [],
			to: [],
			cc: []
		}
	}),
	reducers: {
		setEmailsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		resetEmailsSearchText: (state, action) => {
			state.searchText = '';
		},
		openNewEmailDialog: (state, action) => {
			state.emailDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewEmailDialog: (state, action) => {
			state.emailDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditEmailDialog: (state, action) => {
			state.emailDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditEmailDialog: (state, action) => {
			state.emailDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
	},
	extraReducers: {
		[updateEmail.fulfilled]: (state, action) => {			
			emailsAdapter.upsertOne(state, action.payload)		
		},
		[addEmail.fulfilled]: (state, action) => {			
			emailsAdapter.upsertOne(state, action.payload)		
		},
		[getEmail.fulfilled]: (state, action) => {
			// console.info(action.payload)
			emailsAdapter.upsertOne(state, action.payload);
			state.searchText = '';
		},
		[getEmail.rejected]: (state, action) => {
			emailsAdapter.setOne(state, {});
		},
		[reorderCard.fulfilled]: (state, action) => {
			state.board = action.payload;
		},
		[updateEmailBoard.fulfilled]: (state, action) => {
			const { allEmails, toEmails, ccEmails } = action.payload;
			state.board = {
				all: allEmails,
				to: toEmails,
				cc: ccEmails
			}
		}
	}
});

export const {
	setEmailsSearchText,
	resetEmailsSearchText,
	openNewEmailDialog,
	closeNewEmailDialog,
	openEditEmailDialog,
	closeEditEmailDialog,
} = emailsSlice.actions;

export default emailsSlice.reducer;
