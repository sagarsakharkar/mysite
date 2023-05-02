import { combineReducers } from '@reduxjs/toolkit';
import clientReview from './clientReviewSlice';
import episodes from 'src/app/main/apps/entities/episodes/store/episodesSlice';
import steps from 'src/app/main/apps/entities/steps/store/stepsSlice';
import status from 'src/app/main/apps/utilities/statuses/store/statusesSlice';
import users from 'src/app/main/apps/users/accounts/store/accountsSlice';
import utilSteps from 'src/app/main/apps/utilities/steps/store/stepsSlice';
import stepAsset from 'src/app/main/apps/utilities/step_assets/store/stepAssetSlice';

const reducer = combineReducers({
	clientReview,
	episodes,
	status,
	steps,
	users,
	utilSteps,
	stepAsset
});

export default reducer;
