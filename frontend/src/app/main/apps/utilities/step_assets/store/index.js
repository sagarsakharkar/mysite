import { combineReducers } from '@reduxjs/toolkit';
import stepAsset from './stepAssetSlice';

const reducer = combineReducers({
	stepAsset,
});

export default reducer;
