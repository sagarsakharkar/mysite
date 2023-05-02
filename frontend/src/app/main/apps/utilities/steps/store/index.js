import { combineReducers } from '@reduxjs/toolkit';
import steps from './stepsSlice';
import stepAsset from 'src/app/main/apps/utilities/step_assets/store/stepAssetSlice';

const reducer = combineReducers({
	steps,
	stepAsset
});

export default reducer;
