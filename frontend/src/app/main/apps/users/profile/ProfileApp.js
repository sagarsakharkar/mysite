import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import reducer from './store';
import withReducer from 'app/store/withReducer';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { selectUser } from 'app/store/userSlice';
import ProfileDialog from './ProfileDialog';
import ProfileList from './ProfileList';
import { updateProfile } from './store/profileSlice';
import { getNotes } from 'src/app/main/apps/entities/notes/store/notesSlice';
const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
  },
}));


function ProfileApp() {
  const dispatch = useDispatch()
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const user = useSelector(selectUser);

  const notes = useSelector(({ profileApp }) => profileApp.notes.entities)

  useEffect(() =>{
    dispatch(getNotes({user: user.id}))
  }, [user])

  function handleUploadChange(e) {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('avatar', file);
		formData.id = user.id;
		dispatch(updateProfile(formData));
	}

  return (<>
    <Root
      header={
        <div className="flex flex-col shadow">
          <img
            className="h-160 lg:h-240 object-cover w-full"
            src="static/images/pages/profile/cover.png"
            alt="Profile Cover"
          />

          <div className="flex flex-col flex-0 lg:flex-row items-center max-w-5xl w-full mx-auto px-32 lg:h-72">
            <div className="-mt-96 lg:-mt-88 rounded-full">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.1 } }}>
              <label>
                <Avatar
                    sx={{ borderColor: 'background.paper' }}
                    className="w-128 h-128 border-4"
                    src={user.avatar}
                    alt="User avatar"
                  />
									<input accept="image/*" className="hidden" type="file" onChange={handleUploadChange} />
								</label>
                
              </motion.div>
            </div>

            <div className="flex flex-col items-center lg:items-start mt-16 lg:mt-0 lg:ml-32">
              <Typography className="text-lg font-bold leading-none">{user.first_name} {user.last_name}</Typography>
              <Typography color="text.secondary">{user.email}</Typography>
              <Typography color="text.secondary">{user.role}</Typography>
            </div>

            <div className="hidden lg:flex h-32 mx-32 border-l-2" />

          </div>
        </div>
      }
      content={
        <div className="flex flex-auto justify-center w-full max-w-7xl mx-auto p-24 sm:p-32">
          <ProfileList data={user} notes={notes}/>
        </div>
      }
      scroll={isMobile ? 'normal' : 'page'}
    />
    <ProfileDialog />
  </>
  );
}

export default withReducer('profileApp', reducer)(ProfileApp);
