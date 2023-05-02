import FuseHighlight from '@fuse/core/FuseHighlight';
import Typography from '@mui/material/Typography';

function Task_AssignmentDoc() {
  return (
    <>
      <Typography variant="h4" className="mb-24">
        Task Assignment
      </Typography>
      <Typography variant="h5" className="mb-24">
        Overview
      </Typography>
      <Typography className="mb-16" component="p">
        User can update the task list by assigning task to different users with task status, bid, complexity, start date and description.
      </Typography>
      <Typography className="mb-16" component="p">
        User can also link assets with shot, sequence and set.
      </Typography>
      <Typography className="mb-16" component="p">
        For shot start frame and end frame can also update.
      </Typography>
      <br></br>
      <Typography className="mb-16" component="p">
        From the <code>Top Menu</code> menu click on <code>Projects</code> and select <code>Project code</code> {'>'} <code>Task Assignment</code>.
      </Typography>

      <img
        src="static/assets/images/documentation/task_assignment.png"
        alt="task_assignment"
      />
      <Typography className="mb-16" component="p">
        Here you can see on leftside table for selection.
      </Typography>
      <Typography className="mb-8" component="p">
        Objects
      </Typography>
      <Typography className="mb-8" component="p">
        It Display all the objects. As shown below.
      </Typography>
      <Typography component="p">
        Asset Build
      </Typography>
      <Typography component="p">
        Sequence
      </Typography>
      <Typography component="p">
        Shot
      </Typography>
      <Typography component="p">
        select according to your requirement
      </Typography>

      <Typography className="mb-8" component="p">
        Episode
      </Typography>
      <Typography component="p">
        Episode is a check box select the check box it display's you all the episode depending on the project.
      </Typography>
      <br></br>
      <Typography variant="h5" className="mb-24">
        Overview
      </Typography>
      <Typography className="mb-8" component="p">
        Asset Build
      </Typography>
      <Typography component="p">
        Select Project   {'>>>'}   Select Object   {'>>>'}   Select Asset Type   {'>>>'}   Select Asset Name   {'>>>'}   Select Department.
      </Typography>
      <Typography component="p">
        In Asset Build we can select all the asset by selecting All check box.
      </Typography>
      <Typography component="p">
        After selecting the project, object, type, Asset build and department it pop ups the data below.
      </Typography>
      <Typography className="mb-8" component="p">
        Sequence
      </Typography>
      <Typography component="p">
        Select Project   {'>>>'}   Select Object   {'>>>'}   Select Sequence Name   {'>>>'}   Select Department
      </Typography>
      <Typography component="p">
        Select Project   {'>>>'}   Select Object   {'>>>'}   Select Episode   {'>>>'}   Select Sequence Name   {'>>>'}   Select Department
      </Typography>
      <Typography component="p">
        After selecting the project, object, sequence and department it pop ups the data below.
      </Typography>
      <Typography className="mb-8" component="p">
        Shots
      </Typography>
      <Typography component="p">
        Select Project   {'>>>'}   Select Object   {'>>>'}   Select Episode   {'>>>'}   Select Shot   {'>>>'}   Select Department
      </Typography>
      <Typography component="p">
        In shots we should select episode.
      </Typography>
      <Typography component="p">
        In Asset Build we can select all the asset by selecting All check box.
      </Typography>
      <Typography component="p">
        After selecting the project, object, sequence, shot and department it pop ups the data below.
      </Typography>
      <Typography className="mb-8" component="p">
        Assigned User
      </Typography>
      <Typography component="p">
        By double click on the assigned user we can update or add the user for the particular task.
      </Typography>
      <Typography className="mb-8" component="p">
        Status
      </Typography>
      <Typography component="p">
        We can update status initially it will “ ready to start “ you can update.
      </Typography>
      <Typography className="mb-8" component="p">
        Bid
      </Typography>
      <Typography component="p">
        We can update the bid here (1 bid =10 hours) According to complexity of task we can increase the bids.
      </Typography>
      <Typography className="mb-8" component="p">
        Complexity
      </Typography>
      <Typography component="p">
        Complexity is based on the task level A indicates high complexity and D indicates low complexity and we can update according to complexity of task.
      </Typography>
      <Typography className="mb-8" component="p">
        Start Date
      </Typography>
      <Typography component="p">
        Start date initially will be current date we can also update the data.
      </Typography>
      <Typography className="mb-8" component="p">
        Description
      </Typography>
      <Typography component="p">
        We can add any description to the task .
      </Typography>
      <Typography className="mb-8" component="p">
        Start Frame
      </Typography>
      <Typography component="p">
        We can select the start frame initially it will be 101 we can update it.
      </Typography>
      <Typography className="mb-8" component="p">
        End Frame
      </Typography>
      <Typography component="p">
        We can select the end frame initially it will be 101 we can update it.
      </Typography>
      <Typography className="mb-8" component="p">
        Links
      </Typography>
      <Typography component="p">
        This are asset builds which are used to referred in the particular sequence or shot.
      </Typography>
    </>
  );
}

export default Task_AssignmentDoc;
