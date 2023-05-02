import { combineReducers } from '@reduxjs/toolkit';
import profile from './profileSlice';
import notes from 'src/app/main/apps/entities/notes/store/notesSlice';


const reducer = combineReducers({
	profile,
	notes
});

export default reducer;
