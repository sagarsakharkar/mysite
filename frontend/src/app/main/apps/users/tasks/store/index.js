import { combineReducers } from '@reduxjs/toolkit';
import board from './boardSlice';
import boards from './boardsSlice';
import card from './cardSlice';
import project from 'src/app/main/apps/entities/projects/store/projectsSlice';
import user from 'src/app/main/apps/users/accounts/store/accountsSlice';
import priority from 'src/app/main/apps/utilities/priorities/store/prioritiesSlice';
import status from 'src/app/main/apps/utilities/statuses/store/statusesSlice';
import review from 'src/app/main/apps/tools/review/store/reviewSlice';

const scrumboardAppReducers = combineReducers({
	boards,
	board,
	card,
	project,
	user,
	priority,
	status,
	review
});

export default scrumboardAppReducers;
