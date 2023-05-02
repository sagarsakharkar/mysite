import { combineReducers } from '@reduxjs/toolkit';
import tools from './toolsSlice';

const reducer = combineReducers({
	tools,
});

export default reducer;
