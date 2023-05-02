import FusePageCarded from '@fuse/core/FusePageCarded';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from './store';
import EntityHeader from 'app/shared-components/header/EntityHeader';
import NoteDialog from './NoteDialog';
import NotesList from './NotesList';
import { getNotes, selectNotes } from './store/notesSlice';
import { getAccounts } from 'src/app/main/apps/users/accounts/store/accountsSlice';

function NotesApp() {
	const dispatch = useDispatch();
	const routeParams = useParams();
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const data = useSelector(selectNotes);

	const noteDialog = useSelector(({ notesApp }) => notesApp.notes.noteDialog);
	const noteIds = useSelector(({ notesApp }) => notesApp.notes.ids);

	const users = useSelector(({ notesApp }) => notesApp.users.entities);

	useEffect(() => {
		dispatch(getNotes(routeParams));
		dispatch(getAccounts(routeParams));
	}, [routeParams]);

	return (
		<>
			<FusePageCarded
				header={<EntityHeader entity='Notes' data={data} />}
				content={<NotesList users={users}/>}
				scroll={isMobile ? 'normal' : 'content'}
			/>
			<NoteDialog
				noteDialog={noteDialog}
				noteIds={noteIds}
			/>
		</>
	);
}

export default withReducer('notesApp', reducer)(NotesApp);

