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
import Timeline from '@mui/lab/Timeline';
import format from 'date-fns/format';
import ProjectInfo from './informations/ProjectInfo';
import AssetInfo from './informations/AssetInfo';
import EpisodeInfo from './informations/EpisodeInfo';
import SequenceInfo from './informations/SequenceInfo';
import ShotInfo from './informations/ShotInfo';
import StepInfo from './informations/StepInfo';
import TaskInfo from './informations/TaskInfo';
import VersionInfo from './informations/VersionInfo';
import NoteInfo from './informations/NoteInfo';

import ActivityTimelineItem from './ActivityTimelineItem';

import NewNote from './note/NewNote';
import SingleLineImageList from 'app/shared-components/image/SingleLineImageList';
import { openEditReplyDialog, openEditNoteDialog, removeNote } from 'src/app/main/apps/entities/notes/store/notesSlice';

function OverviewList(props) {

  const dispatch = useDispatch();
  const entity = props.entity;
  const data = props.data;
  const activities = props.activities;
  const notes = props.notes;
  const users = props.users;
  const statuses = props.statuses;
  const priorities = props.priorities;
  const [InfoComponent, setInfoComponent] = useState(null);
  // if (!entity){
  // 	return null
  // }

  // useEffect(() => {
  //   const myComponent = entity.charAt(0).toUpperCase() + entity.slice(1) + 'Info';
  //   React.createElement(myComponent);
  //   setInfoComponent(myComponent)
  // }, [entity])

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
          <NewNote />

          {notes?.map((note) => (
            <Card component={motion.div} variants={item} key={note.id} className="mb-32">
              <CardHeader
                className="px-32 pt-24"
                avatar={<Avatar aria-label="Recipe" src={note.created_by?.avatar} />}
                action={
                  <IconButton aria-label="more" size="large"
                    onClick={
                      (ev) => {
                        ev.preventDefault();
                        dispatch(openEditNoteDialog(note));
                      }
                    }
                  >
                    <FuseSvgIcon>heroicons-outline:pencil</FuseSvgIcon>
                  </IconButton>
                }
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

              <div className="flex items-center mx-52 mb-8">
                <NewNote
                  type={'Reply'}
                  replies={note.replies}
                  noteId={note.id}
                />
              </div>

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
                            <IconButton aria-label="more" size="large"
                              onClick={
                                (ev) => {
                                  ev.preventDefault();
                                  dispatch(openEditReplyDialog(reply));
                                }
                              }
                            >
                              <FuseSvgIcon>heroicons-outline:pencil</FuseSvgIcon>
                            </IconButton>
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

        <div className="flex flex-col w-full md:w-480 md:ltr:mr-16 md:rtl:ml-16">
          <Card component={motion.div} variants={item} className="flex flex-col w-full px-32 pt-24 mb-16">
            <div className="flex justify-between items-center pb-16">
              <Typography className="text-2xl leading-tight">
                Latest Activity
              </Typography>
            </div>

            <CardContent className="p-0">
              <Timeline
                className="py-24"
                position="right"
                sx={{
                  '& .MuiTimelineItem-root:before': {
                    display: 'none',
                  },
                }}
              >
                <FuseScrollbars className="grow overflow-auto max-h-480">
                  {activities?.map((item, index) => (
                    <ActivityTimelineItem
                      last={activities.length === index + 1}
                      item={item}
                      key={item.id}
                    />
                  ))}
                </FuseScrollbars>
              </Timeline>
            </CardContent>
          </Card>

          <Card component={motion.div} variants={item} className="flex flex-col w-full px-32 pt-24 mb-16">
            <div className="flex justify-between items-center pb-16">

              <Typography className="text-2xl leading-tight">
                {entity.charAt(0).toUpperCase() + entity.slice(1)} Information
              </Typography>
            </div>

            {entity === 'project' && (<ProjectInfo data={data} users={users} />)}
            {entity === 'asset' && (<AssetInfo data={data} users={users} />)}
            {entity === 'episode' && (<EpisodeInfo data={data} users={users} />)}
            {entity === 'sequence' && (<SequenceInfo data={data} users={users} />)}
            {entity === 'shot' && (<ShotInfo data={data} users={users} />)}
            {entity === 'step' && (<StepInfo data={data} users={users} statuses={statuses} priorities={priorities} />)}
            {entity === 'task' && (<TaskInfo data={data} users={users} statuses={statuses} priorities={priorities} />)}
            {entity === 'version' && (<VersionInfo data={data} users={users} />)}
            {entity === 'note' && (<NoteInfo data={data} users={users} />)}

          </Card>
        </div>
      </div>
    </motion.div>
  );
}

export default OverviewList;
