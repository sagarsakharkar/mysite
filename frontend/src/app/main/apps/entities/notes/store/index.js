import { combineReducers } from '@reduxjs/toolkit';
import notes from './notesSlice';
import users from 'src/app/main/apps/users/accounts/store/accountsSlice';

const reducer = combineReducers({
	notes,
	users
});

export default reducer;
