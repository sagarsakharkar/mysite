import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getClientReview = createAsyncThunk('clientReviewApp/clientReview/getClientReview', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().clientReviewApp.clientReview.routeParams;
	const response = await axios.get('/api/v1/upload/ftp/', { params: routeParams });
	const data = await response.data;
	return { data, routeParams };
});

export const uploadClientReview = createAsyncThunk(
	'clientReviewApp/clientReview/uploadClientReview',
	async (uploadData, { dispatch, getState }) => {
		
		console.info(uploadData)
		const response = await axios.post('/api/v1/upload/ftp/', uploadData);
		const data = await response.data;

		return data;
	}
);

const clientReviewAdapter = createEntityAdapter({
	selectId: (entity) => entity.uid,
	sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

export const { selectAll: selectClientReview, selectById: selectClientReviewById } = clientReviewAdapter.getSelectors(
	state => state.clientReviewApp.clientReview
);

const clientReviewSlice = createSlice({
	name: 'clientReviewApp/clientReview',
	initialState: clientReviewAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		uploadPath: '',
		component: null
	}),
	reducers: {
		setClientReviewSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		resetClientReviewSearchText: (state, action) => {
			state.searchText = '';
		},
		setUploadPath: (state, action) => {
			state.uploadPath = action.payload;
		},
		setReviewComponent: (state, action) => {
			state.component = action.payload;
		},
	},
	extraReducers: {
		[getClientReview.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			clientReviewAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		},
		[uploadClientReview.fulfilled]: (state, action) => {
			clientReviewAdapter.setAll(state, action.payload);
			state.searchText = '';
		}

	}
});

export const {
	setClientReviewSearchText,
	resetClientReviewSearchText,
	setUploadPath,
	setReviewComponent
} = clientReviewSlice.actions;

export default clientReviewSlice.reducer;
