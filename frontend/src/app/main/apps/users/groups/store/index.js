import { combineReducers } from '@reduxjs/toolkit';
import groups from './groupsSlice';
import roles from 'src/app/main/apps/utilities/roles/store/rolesSlice';

const reducer = combineReducers({
	groups,
	roles,
});

export default reducer;
