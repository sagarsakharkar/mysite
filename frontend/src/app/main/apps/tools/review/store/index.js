import { combineReducers } from '@reduxjs/toolkit';
import review from './reviewSlice';
import status from 'src/app/main/apps/utilities/statuses/store/statusesSlice';
import users from 'src/app/main/apps/users/accounts/store/accountsSlice';

const reducer = combineReducers({
	review,
	status,
	users
});

export default reducer;
