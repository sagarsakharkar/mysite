import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Input from '@mui/material/Input';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Tooltip from '@mui/material/Tooltip';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { lighten } from '@mui/material/styles';
import Box from '@mui/material/Box';
import format from 'date-fns/format';
import SingleLineImageList from 'app/shared-components/image/SingleLineImageList';
import { openEditProfileDialog, openChangePasswordDialog } from './store/profileSlice';

function ProfileList(props) {

  const dispatch = useDispatch();
  const data = props.data;
  const notes = props.notes && Object.values(props.notes);

  const container = {
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="w-full">
      <div className="md:flex">
        <div className="flex flex-col flex-1 md:ltr:mr-16 md:rtl:ml-16">
        <Card
            component={motion.div}
            variants={item}
            className="w-full overflow-hidden w-full mb-32"
          >
            <Input
              className="p-24 w-full"
              classes={{ root: 'text-14' }}
              placeholder="Write something.."
              multiline
              rows="6"
              margin="none"
              disableUnderline
            />
            <Box
              className="card-footer flex items-center flex-row border-t-1 px-24 py-12"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
            >
              <div className="flex flex-1 items-center">
                <IconButton aria-label="Add photo">
                  <FuseSvgIcon size={20}>heroicons-solid:photograph</FuseSvgIcon>
                </IconButton>
                <IconButton aria-label="Mention somebody">
                  <FuseSvgIcon size={20}>heroicons-solid:user</FuseSvgIcon>
                </IconButton>
              </div>

              <div className="">
                <Button variant="contained" color="secondary" size="small" aria-label="post">
                  Post
                </Button>
              </div>
            </Box>
          </Card>
          {notes.length > 0 && notes?.map((note) => (
            <Card component={motion.div} variants={item} key={note.id} className="mb-32">
              <CardHeader
                className="px-32 pt-24"
                avatar={<Avatar aria-label="Recipe" src={note.created_by?.avatar} />}
                title={
                  <span className="flex items-center space-x-8">
                    <Typography className="font-normal" color="secondary.main" paragraph={false}>
                      {note.created_by?.username}
                    </Typography>
                    <span className="mx-4">
                      created a note on {note.step
                        ? "step " + note.step : note.asset
                          ? "asset " + note.asset : note.shot
                            ? "shot " + note.shot : note.sequence
                              ? "sequence " + note.sequence : note.episode
                                ? "episode " + note.episode : "project " + note.project
                      }
                    </span>
                  </span>
                }
                subheader={format(new Date(note.created_at), 'MMM dd, h:mm a')}
              />

              <CardContent className="px-32">
                {note.message && (
                  <Typography component="p" className="mb-16">
                    {note.message}
                  </Typography>
                )}

                <div className="p-16 pb-12">
                  <SingleLineImageList itemData={note.attachments} />
                </div>

              </CardContent>

              {note.replies && note.replies.length > 0 && (
                <Box
                  className="card-footer flex flex-col px-32 py-24 border-t-1"
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? lighten(theme.palette.background.default, 0.4)
                        : lighten(theme.palette.background.default, 0.02),
                  }}
                >
                  <div className="">
                    <div className="flex items-center">
                      <Typography>{note.replies.length} replies</Typography>
                      <FuseSvgIcon size={16} className="mx-4" color="action">
                        heroicons-outline:chevron-down
                      </FuseSvgIcon>
                    </div>

                    <List>
                      {note.replies.map((reply) => (
                        <div key={reply.id}>
                          <ListItem className="px-0 -mx-8">
                            <Avatar
                              alt={reply.created_by?.username}
                              src={reply.created_by?.avatar}
                              className="mx-8"
                            />
                            <ListItemText
                              className="px-4"
                              primary={
                                <div className="flex items-center space-x-8">
                                  <Typography
                                    className="font-normal"
                                    color="secondary"
                                    paragraph={false}
                                  >
                                    {reply.created_by?.username}
                                  </Typography>
                                  <Typography variant="caption">{format(new Date(reply.created_at), 'MMM dd, h:mm a')}</Typography>
                                </div>
                              }
                              secondary={reply.message}
                            />
                          </ListItem>

                        </div>
                      ))}
                    </List>
                  </div>
                </Box>
              )}
            </Card>
          ))}
        </div>

        <div className="flex flex-col w-full md:w-360 md:ltr:mr-16 md:rtl:ml-16">
          
          <Card component={motion.div} variants={item} className="flex flex-col w-full px-32 pt-24 mb-16">
            <CardHeader
              className="px-16 pt-16"
              action={<>
                <IconButton aria-label="more" size="large"
                  onClick={
                    (ev) => {
                      ev.preventDefault();
                      dispatch(openEditProfileDialog(data));
                    }
                  }
                >
                  <FuseSvgIcon>heroicons-outline:pencil</FuseSvgIcon>
                </IconButton>
                <IconButton aria-label="more" size="large"
                onClick={
                  (ev) => {
                    ev.preventDefault();
                    dispatch(openChangePasswordDialog(data));
                  }
                }
              >
                <FuseSvgIcon>heroicons-outline:key</FuseSvgIcon>
              </IconButton></>
              }
              title={
                <span className="flex items-center space-x-8">
                  <Typography className="text-2xl leading-tight" color="secondary.main" paragraph={false}>
                    Information
                  </Typography>
                </span>
              }
            />

            <CardContent>
              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">Id</Typography>
                <Typography>{data.id}</Typography>
              </div>
              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">First Name</Typography>
                <Typography>{data.first_name}</Typography>
              </div>
              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">Last Name</Typography>
                <Typography>{data.last_name}</Typography>
              </div>
              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">Email</Typography>
                <Typography>{data.email}</Typography>
              </div>
              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">Login Id</Typography>
                <Typography>{data.username}</Typography>
              </div>
              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">Role</Typography>
                <Typography>{data.role}</Typography>
              </div>
              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">Joining Date</Typography>
                <Typography>{data.date_joined && format(new Date(data.date_joined), 'dd-MM-y hh:mm:ss')}</Typography>
              </div>

            </CardContent>

          </Card>
        </div>
      </div>
    </motion.div>
  );
}

export default ProfileList;
