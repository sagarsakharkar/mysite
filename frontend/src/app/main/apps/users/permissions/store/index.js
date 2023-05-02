import { combineReducers } from '@reduxjs/toolkit';
import permissions from './permissionsSlice';
import groups from 'src/app/main/apps/users/groups/store/groupsSlice';
import roles from 'src/app/main/apps/utilities/roles/store/rolesSlice';

const reducer = combineReducers({
	permissions,
	roles,
	groups
});

export default reducer;
