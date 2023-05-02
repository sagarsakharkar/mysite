import { combineReducers } from '@reduxjs/toolkit';
import priorities from './prioritiesSlice';

const reducer = combineReducers({
	priorities,
});

export default reducer;
