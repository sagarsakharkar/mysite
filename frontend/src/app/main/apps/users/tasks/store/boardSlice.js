import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import history from '@history';
import _ from '@lodash';
import { showMessage } from 'app/store/fuse/messageSlice';
import reorder, { reorderQuoteMap } from './reorder';

export const getBoard = createAsyncThunk('taskBoardApp/board/getTaskBoard', async (routeParams, { dispatch, getState }) => {
	try {
		
		const project = routeParams.project;
		const params = {
			user_name: routeParams.userId,
			latest: 'True'
		}
		const response = await axios.get(project ? '/api/v1/entity/project/'+project.toLowerCase()+'/user_tasks/' : '/api/v1/entity/usertask/');
		const tasks = await response.data;

		const { status } = getState().taskBoardApp;
		const statuses = status.entities;
		const board = {
			id: project || routeParams.userId,
			name: project && project.toUpperCase(),
			searchText: '',
			settings: {
				color: 'fuse-dark',
				subscribed: false,
				cardCoverImages: true
			},
			lists: [
				{
					id: 'readyToStart',
					name: 'To Do',
					idCards: _.map(tasks && tasks.filter(item => statuses[item.step_status] && statuses[item.step_status].name === 'Ready To Start'))
				},
				{
					id: 'inProgress',
					name: 'In Progress',
					idCards: _.map(tasks && tasks.filter(item => statuses[item.step_status] && statuses[item.step_status].name === 'In Progress'))
				},
				{
					id: 'retakes',
					name: 'Retakes',
					idCards: _.map(tasks && tasks.filter(item => statuses[item.step_status] && statuses[item.step_status].name.endsWith('Reject')))
				},
				{
					id: 'review',
					name: 'Pending Review',
					idCards: _.map(tasks && tasks.filter(item => statuses[item.step_status] && statuses[item.step_status].name.endsWith('Review')))
				}
			]
		}
		console.info(board)

		return board;
	} catch (error) {
		console.log(error)
		dispatch(
			showMessage({
				message: error.response.data,
				autoHideDuration: 2000,
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right'
				}
			})
		);
		// history.push({
		// 	pathname: '/taskBoard/boards'
		// });
		return null;
	}
});

export const reorderList = createAsyncThunk(
	'taskBoardApp/board/reorderList',
	async (result, { dispatch, getState }) => {
		const { board } = getState().taskBoardApp;
		const { lists } = board;

		const ordered = reorder(_.merge([], lists), result.source.index, result.destination.index);

		_.assign(board, { ordered });

		const data = ordered;

		dispatch(
			showMessage({
				message: 'List Order Saved',
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

export const reorderCard = createAsyncThunk(
	'taskBoardApp/board/reorderCard',
	async ({ source, destination }, { dispatch, getState }) => {
		const { board } = getState().taskBoardApp;
		const { lists } = board;

		const ordered = reorderQuoteMap(_.merge([], lists), source, destination);

		_.assign(board, { ordered });

		const data = ordered;

		dispatch(
			showMessage({
				message: 'Card Order Saved',
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


const boardsSlice = createSlice({
	name: 'taskBoardApp/boards',
	initialState: null,
	reducers: {
		resetBoard: (state, action) => null,
		addLabel: (state, action) => {
			state.labels = [...state.labels, action.payload];
		},
		setBoardSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		resetBoardSearchText: (state, action) => {
			state.searchText = '';
		},
	},
	extraReducers: {
		[getBoard.fulfilled]: (state, action) => action.payload,
		[reorderList.fulfilled]: (state, action) => {
			state.lists = action.payload;
		},
		[reorderCard.fulfilled]: (state, action) => {
			state.lists = action.payload;
		},
	}
});

export const { resetBoard, addLabel, resetBoardSearchText, setBoardSearchText } = boardsSlice.actions;

export default boardsSlice.reducer;
