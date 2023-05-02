import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getActivities = createAsyncThunk('activitiesApp/activities/getActivities', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().activitiesApp.activities.routeParams;
	const response = await axios.get('/api/v1/entity/'+routeParams.entity+'/'+routeParams.uid+'/activities/');
	const data = await response.data;
	return { data, routeParams };
});

const activitiesAdapter = createEntityAdapter({
	sortComparer: (a, b) => b.timestamp.localeCompare(a.timestamp),
});

export const { selectAll: selectActivities, selectById: selectActivitiesById } = activitiesAdapter.getSelectors(
	state => state.activitiesApp ? state.activitiesApp.activities : state.overviewApp.activities 
);

const activitiesSlice = createSlice({
	name: 'activitiesApp/activities',
	initialState: activitiesAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		versionDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		setActivitiesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		resetActivitiesSearchText: (state, action) => {
			state.searchText = '';
		},
	},
	extraReducers: {
		[getActivities.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			activitiesAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		}
	}
});

export const {
	setActivitiesSearchText,
	resetActivitiesSearchText,
} = activitiesSlice.actions;

export default activitiesSlice.reducer;
