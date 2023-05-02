import { combineReducers } from '@reduxjs/toolkit';
import accounts from './accountsSlice';
import roles from 'src/app/main/apps/utilities/roles/store/rolesSlice';
import groups from 'src/app/main/apps/users/groups/store/groupsSlice';

const reducer = combineReducers({
	accounts,
	roles,
	groups
});

export default reducer;
