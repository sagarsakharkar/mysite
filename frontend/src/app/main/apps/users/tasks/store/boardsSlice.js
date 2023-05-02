import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import history from '@history';

const boardsAdapter = createEntityAdapter({});

export const { selectAll: selectBoards, selectById: selectBoardById } = boardsAdapter.getSelectors(
	state => state.taskboardApp.boards
);

const boardsSlice = createSlice({
	name: 'taskboardApp/boards',
	initialState: boardsAdapter.getInitialState({
		searchText: '',
	}),
	reducers: {
		resetBoards: (state, action) => {},
		setBoardsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		resetBoardsSearchText: (state, action) => {
			state.searchText = '';
		},
	}
});
export const selectBoardsSearchText = ({ taskBoardApp }) => taskBoardApp.boards.searchText;

export const { resetBoards, resetBoardsSearchText, setBoardsSearchText } = boardsSlice.actions;

export default boardsSlice.reducer;
