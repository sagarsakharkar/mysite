import { combineReducers } from '@reduxjs/toolkit';
import projects from './projectsSlice';
import accounts from 'src/app/main/apps/users/accounts/store/accountsSlice';

const reducer = combineReducers({
	projects,
	accounts
});

export default reducer;
