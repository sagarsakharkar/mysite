import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { showMessage } from 'app/store/fuse/messageSlice';

const url = '/api/v1/entity/note/';
export const getNotes = createAsyncThunk('notesApp/note/getNotes', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().notesApp.notes.routeParams;
	let response = {}
	if (routeParams.note_type) {
		response = await axios.get(url, {
			params: routeParams
		});
	} else if (routeParams.user) {
		response = await axios.get('/api/v1/user/account/' + routeParams.user + '/notes/');
	} else {
		response = await axios.get('/api/v1/entity/' + routeParams.entity + '/' + routeParams.uid + '/notes/');
	}
	const data = await response.data;
	return { data, routeParams };
});

export const getNote = createAsyncThunk(
	'notesApp/note/getNote',
	async (routeParams, { dispatch, getState }) => {
		routeParams = routeParams || getState().overviewApp.notes.routeParams;
		const id = routeParams.uid
		const response = await axios.get(url + id + '/');
		// console.log(response.status)

		const data = await response.data;
		return { data, routeParams };
	}
);

export const addNote = createAsyncThunk('notesApp/notes/addNote', async note => {

	if (note.files && note.files.length > 0) {
		const formData = new FormData();
		for (let i = 0; i < note.files.length; i++) {
			formData.append(`files`, note.files[i])
		}

		const uploadResponse = await axios.post('/api/v1/upload/file/', formData);
		const uploadData = await uploadResponse.data;
		note.attachments = uploadData.map(item => item.id)
		delete note.files
	}
	const response = await axios.post(url, note);
	const data = await response.data;

	// dispatch(showMessage({ message: 'Note has been Added successfully !' }));
	return data;
});

export const addNotes = createAsyncThunk(
	'notesApp/note/addNotes',
	async (notes, { dispatch, getState }) => {
		const response = await axios.post(url, notes);
		const data = await response.data;

		return data;
	}
);

export const updateNote = createAsyncThunk(
	'notesApp/note/updateNote',
	async (note, { dispatch, getState }) => {
		const id = note.id
		delete note['id']
		const response = await axios.patch(url + id + '/', note);
		const data = await response.data;

		return data;
	}
);

export const updateMultipleNotes = createAsyncThunk(
	'notesApp/note/updateMultipleNotes',
	async (dataList, { dispatch, getState }) => {
		const routeParams = getState().notesApp.notes.routeParams;
		const project = routeParams.uid.split(':')[0].toLowerCase()
		const response = await axios.post('/api/v1/entity/project/' + project + '/note_bulk_update/', dataList);
		const data = await response.data;

		return data;
	}
);

export const removeNote = createAsyncThunk(
	'notesApp/note/removeNote',
	async (id, { dispatch, getState }) => {
		const response = await axios.delete(url + id + '/');
		const data = await response.data;

		if (data) return id;

	}
);

export const removeNotes = createAsyncThunk(
	'notesApp/note/removeNotes',
	async (entityIds, { dispatch, getState }) => {
		confirmAlert({
			title: 'Confirm to delete notes !!!',
			message: 'Are you sure, you want to remove selected notes ?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						entityIds.map(row => {
							dispatch(removeNote(row))
						})
						dispatch(showMessage({ message: 'Notes has been removed successfully !' }));

					}
				},
				{
					label: 'No',
					onClick: () => console.log("No action to remove notes")
				}
			]
		});

		return entityIds;
	}
);

export const replyNote = createAsyncThunk('notesApp/notes/replyNote', async (reply, { dispatch, getState }) => {

	console.log(reply)
	const formData = new FormData();
	formData.append('message', reply.message)
	formData.append('note', reply.id)
	if (reply.files && reply.files.length > 0) {
		for (let i = 0; i < reply.files.length; i++) {
			formData.append(`attachments`, reply.files[i])
		}
	}
	const response = await axios.post('/api/v1/entity/reply/', formData);
	const data = await response.data;

	dispatch(getNote({ uid: reply.id }))
	return data;
});

export const updateReply = createAsyncThunk(
	'notesApp/notes/updateNote',
	async (reply, { dispatch, getState }) => {
		const id = reply.id
		delete reply['id']
		const response = await axios.patch('/api/v1/entity/reply/' + id + '/', reply);
		const data = await response.data;

		dispatch(getNote({ uid: reply.note_id }))
		return data;
	}
);

const notesAdapter = createEntityAdapter({
	sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

export const { selectAll: selectNotes, selectEntities: selectNote, selectById: selectNotesById } = notesAdapter.getSelectors(
	state => state.notesApp ? state.notesApp.notes : state.overviewApp.notes
);

const notesSlice = createSlice({
	name: 'notesApp/notes',
	initialState: notesAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		noteDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		setNotesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		resetNotesSearchText: (state, action) => {
			state.searchText = '';
		},
		openNewNoteDialog: (state, action) => {
			state.noteDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewNoteDialog: (state, action) => {
			state.noteDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditNoteDialog: (state, action) => {
			state.noteDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditNoteDialog: (state, action) => {
			state.noteDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditReplyDialog: (state, action) => {
			state.noteDialog = {
				type: 'editReply',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditReplyDialog: (state, action) => {
			state.noteDialog = {
				type: 'editReply',
				props: {
					open: false
				},
				data: null
			};
		},
		openMultipleNoteDialog: (state, action) => {
			state.noteDialog = {
				type: 'multiple',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeMultipleNoteDialog: (state, action) => {
			state.noteDialog = {
				type: 'multiple',
				props: {
					open: false
				},
				data: null
			};
		},
		openCsvCreateDialog: (state, action) => {
			state.noteDialog = {
				type: 'csvCreate',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeCsvCreateDialog: (state, action) => {
			state.noteDialog = {
				type: 'csvCreate',
				props: {
					open: false
				},
				data: null
			};
		},
		openCsvUpdateDialog: (state, action) => {
			state.noteDialog = {
				type: 'csvUpdate',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeCsvUpdateDialog: (state, action) => {
			state.noteDialog = {
				type: 'csvUpdate',
				props: {
					open: false
				},
				data: null
			};
		},
	},
	extraReducers: {
		[removeNote.fulfilled]: (state, action) => {
			notesAdapter.removeOne(state, action.payload)
		},
		[updateNote.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				notesAdapter.upsertMany(state, action.payload)
			} else {
				notesAdapter.upsertOne(state, action.payload)
			}
		},
		[addNote.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				notesAdapter.upsertMany(state, action.payload)
			} else {
				notesAdapter.upsertOne(state, action.payload)
			}
		},
		[addNotes.fulfilled]: (state, action) => {
			if (action.payload.length > 0) {
				notesAdapter.upsertMany(state, action.payload)
			} else {
				notesAdapter.upsertOne(state, action.payload)
			}
		},
		[getNote.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;

			notesAdapter.upsertOne(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		},
		[getNotes.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			notesAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		},
		[updateMultipleNotes.fulfilled]: (state, action) => {
			notesAdapter.upsertMany(state, action.payload)
		},
	}
});

export const {
	setNotesSearchText,
	resetNotesSearchText,
	openNewNoteDialog,
	closeNewNoteDialog,
	openEditNoteDialog,
	closeEditNoteDialog,
	openMultipleNoteDialog,
	closeMultipleNoteDialog,
	openCsvCreateDialog,
	closeCsvCreateDialog,
	openCsvUpdateDialog,
	closeCsvUpdateDialog,
	openEditReplyDialog,
	closeEditReplyDialog
} = notesSlice.actions;

export default notesSlice.reducer;
