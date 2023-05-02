import { combineReducers } from '@reduxjs/toolkit';
import statuses from './statusesSlice';

const reducer = combineReducers({
	statuses,
});

export default reducer;
