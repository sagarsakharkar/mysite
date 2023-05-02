import Autocomplete from '@mui/material/Autocomplete';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import history from '@history';

function ReviewHeader(props) {
  const dispatch = useDispatch();
  const project = props.project;
  const reviewType = props.reviewType;

  const [projectOpen, setProjectOpen] = useState(false);
  const projects = useSelector(({ fuse }) => fuse.projects.ids);

  function handleOpenForm(ev) {
    ev.stopPropagation();
    setProjectOpen(true);
  }

  function handleCloseForm() {
    setProjectOpen(false);
  }

  return (
    <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-24 px-24 md:px-24">
      <Typography
        component={motion.span}
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300}
        className="text-24 md:text-32 font-extrabold tracking-tight"
      >
        {reviewType.charAt(0).toUpperCase() + reviewType.slice(1) + ' Review'}

      </Typography>

      <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
          <Paper
            component={motion.div}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            className="flex items-center w-full sm:max-w-320 space-x-8 px-16 rounded-full border-1 shadow-0"
          >
            {projectOpen ? (
              <ClickAwayListener onClickAway={handleCloseForm}>
                <Autocomplete
                  value={project}
                  style={{ width: "100%" }}
                  onChange={(event, newValue) => {
                    event.preventDefault();
                    history.push("/tools/review/" + reviewType + "/" + newValue.toLowerCase());
                  }}
                  disableClearable
                  // getOptionLabel={option => option.uid}
                  id="projects"
                  options={projects}
                  renderInput={(params) => <TextField {...params} label="Project" variant="outlined" />}
                />
              </ClickAwayListener>
            ) : project ? (
              <Typography variant="h6" className="mx-12 sm:flex cursor-pointer" onClick={handleOpenForm}>
                {project.toUpperCase()}
              </Typography>
            ) : (
              <Typography variant="h6" className="mx-8 sm:flex cursor-pointer" onClick={handleOpenForm}>
                Click Here To Select Project
              </Typography>)}
          </Paper>
        </motion.div>
      </div>
    </div>
  );
}

export default ReviewHeader;

