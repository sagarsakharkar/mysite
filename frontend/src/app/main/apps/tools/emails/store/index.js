import { combineReducers } from '@reduxjs/toolkit';
import emails from './emailsSlice';
import accounts from 'src/app/main/apps/users/accounts/store/accountsSlice';
import projects from 'src/app/main/apps/entities/projects/store/projectsSlice';
import tools from 'src/app/main/apps/utilities/tools/store/toolsSlice';
import steps from 'src/app/main/apps/utilities/steps/store/stepsSlice';

const reducer = combineReducers({
	emails,
	accounts,
	tools,
	steps,
	projects
});

export default reducer;
