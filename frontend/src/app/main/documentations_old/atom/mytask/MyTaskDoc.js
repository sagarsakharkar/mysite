import FuseHighlight from '@fuse/core/FuseHighlight';
import Typography from '@mui/material/Typography';

function MyTaskDoc() {
  return (
    <>
      <Typography variant="h4" className="mb-24">
        My Task
      </Typography>
      <Typography className="mb-32" component="p">
        From the <code>Top Menu</code> menu click on <code>My Task</code>.
      </Typography>
      <img
        src="static/assets/images/documentation/my_task_home.png"
        alt="my_task_home"
      />
      <Typography className="mb-32" component="p">
        Here you will see project that assign to you.
      </Typography>
      <Typography className="mb-32" component="p">
        click on project to see tasks.
      </Typography>
      <img
        src="static/assets/images/documentation/my_task_project.png"
        alt="my_task_project"
      />
      <Typography variant="h4" className="mb-24">
        Start & Stop
      </Typography>
      <Typography className="mb-32" component="p">
        Click on start button
      </Typography>
      <Typography className="mb-32" component="p">
        When the artist click on start button the task time will be start.
      </Typography>
      <Typography className="mb-32" component="p">
        After completion of the task artist need to click on stop button, the task time will be stopped.
      </Typography>
      <Typography className="mb-32" component="p">
        Artist can also pause the task by clicking pause button and the time will be stop and restart after clicking start.
      </Typography>
      <Typography className="mb-32" component="p">
        When the task has completed, artist needs to send it to internal review by clicking review button.
      </Typography>

      <Typography variant="h4" className="mb-24">
        Task
      </Typography>
      <Typography className="mb-32" component="p">
      Artist can get Assigned tasks in task box.
      </Typography>
      <Typography className="mb-32" component="p">
      click on the  button on task. Then task will pop up in the working section.
      </Typography>

      <Typography variant="h4" className="mb-24">
      Retakes
      </Typography>
      <Typography className="mb-32" component="p">
      If task is done by artist and rejected by supervisor task displays in retakes.
      </Typography>
      <Typography className="mb-32" component="p">
      click on the  button on task. Then task will pop up in the working section.
      </Typography>

      <Typography variant="h4" className="mb-24">
      Rejected by Artist
      </Typography>
      <Typography className="mb-32" component="p">
      If the task is approved by the Supervisor of the same department and faces issues in the next department artist and then he can reject the task then the task displays in the Rejected by Artist.
      </Typography>
      <Typography className="mb-32" component="p">
      click on the  button on task. Then task will pop up in the working section.
      </Typography>

      <Typography variant="h4" className="mb-24">
      Working On
      </Typography>
      <Typography className="mb-32" component="p">
      After starting the task displays in working here we will see spend time and left time.
      </Typography>
      <Typography className="mb-32" component="p">
      We can click  button to pause the task.
      </Typography>
      <Typography className="mb-32" component="p">
      Click  button button to stop the task.
      </Typography>
      <Typography className="mb-32" component="p">
      If the task is done click  button.
      </Typography><br></br>

      <Typography className="mb-32" component="p">
      If we  button then it shows window with task and Version, message, we can also upload pic and hit on Reject task, it will appear on Rejected by artist.
      </Typography>


    </>
  );
}

export default MyTaskDoc;
