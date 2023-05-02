import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';

export const getUtilReviews = createAsyncThunk('reviewApp/review/getUtilReviews', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().reviewApp.review.routeParams;
	const response = await axios.get('/api/v1/tool/review/'+routeParams.review_type+'/', {
		params: {
			project: routeParams.project
		}
	});
	const data = await response.data;

	return {data, routeParams};
});


export const processReview = createAsyncThunk(
	'reviewApp/review/processReview',
	async (version, { dispatch, getState }) => {
		const versionId = version.id
		const action = version.action.toLowerCase()
		const routeParams = getState().reviewApp.review.routeParams;

		console.error(version)
		const formData = new FormData();
		formData.append(`message`, version.message)

		if (version.files && version.files.length > 0) {
			for (let i = 0; i < version.files.length; i++) {
				formData.append(`files`, version.files[i])
			}
		}
		const response = await axios.post('/api/v1/tool/review/'+ routeParams.review_type +'/'+ versionId +'/'+ action +'/', version);
		const data = await response.data;

		dispatch(
			showMessage({
				message: "Version ("+versionId+") has been reviewed",
				autoHideDuration: 2000,
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right'
				}
			})
		);

		return versionId;
	}
);

export const addReview = createAsyncThunk(
	'reviewApp/review/addReview',
	async (reviewData, { dispatch, getState }) => {
		console.error(reviewData)
		if (reviewData.files && reviewData.files.length > 0) {
			const formData = new FormData();
			for (let i = 0; i < reviewData.files.length; i++) {
				formData.append(`files`, reviewData.files[i])
			}

			const uploadResponse = await axios.post('/api/v1/upload/file/', formData);
			const uploadData = await uploadResponse.data;
			reviewData.media_files = uploadData.map(item => item.id)
			delete reviewData.files
		}
		const response = await axios.post('/api/v1/tool/review/internal/', reviewData);
		const data = await response.data;

		return data;
	}
);

const reviewAdapter = createEntityAdapter({
	selectId: (entity) => entity.uid,
	sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

export const { selectAll: selectReviews, selectById: selectReviewsById } = reviewAdapter.getSelectors(
	state => state.reviewApp.review
);

export const selectReviewsSearchText = ({ reviewApp }) => reviewApp.review.searchText;

const reviewSlice = createSlice({
	name: 'reviewApp/review',
	initialState: reviewAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		reviewDialog: {
			type: 'Approve',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		setReviewsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		resetReviewsSearchText: (state, action) => {
			state.searchText = '';
		},
		openApproveReviewDialog: (state, action) => {
			state.reviewDialog = {
				type: 'Approve',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeApproveReviewDialog: (state, action) => {
			state.reviewDialog = {
				type: 'Approve',
				props: {
					open: false
				},
				data: null
			};
		},
		openRejectReviewDialog: (state, action) => {
			state.reviewDialog = {
				type: 'Reject',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeRejectReviewDialog: (state, action) => {
			state.reviewDialog = {
				type: 'Reject',
				props: {
					open: false
				},
				data: null
			};
		},
		openSendReviewDialog: (state, action) => {
			state.reviewDialog = {
				type: 'Send',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeSendReviewDialog: (state, action) => {
			state.reviewDialog = {
				type: 'Send',
				props: {
					open: false
				},
				data: null
			};
		},
	},
	extraReducers: {
		[addReview.fulfilled]: reviewAdapter.addOne,
		[processReview.fulfilled]: (state, action) => {
			reviewAdapter.removeOne(state, action.payload)
		},
		[getUtilReviews.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload
			reviewAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		}
	}
});

export const {
	setReviewsSearchText,
	resetReviewsSearchText,
	openApproveReviewDialog,
	closeApproveReviewDialog,
	openRejectReviewDialog,
	closeRejectReviewDialog,
	openSendReviewDialog,
	closeSendReviewDialog,
} = reviewSlice.actions;

export default reviewSlice.reducer;
