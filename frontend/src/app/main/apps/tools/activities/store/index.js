import { combineReducers } from '@reduxjs/toolkit';
import activity from './activitiesSlice';

const reducer = combineReducers({
	activity
});

export default reducer;
