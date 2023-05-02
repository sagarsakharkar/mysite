import React from 'react';
import FuseHighlight from '@fuse/core/FuseHighlight';
import Typography from '@mui/material/Typography';

function userTaskDoc() {
  return (
    <>
      <Typography variant="h4" className="mb-24">UserTask</Typography>
      <Typography className="mb-8" variant="h6">Create a UserTask</Typography>
      <Typography className="mb-16" component="p">
      Building the data and calling create()
      </Typography>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <Typography className="mb-8 font-500 text-16 text-red">Important:</Typography>
        <ol>
          <li>To create a UserTask, you need to provide the following values;</li>
          <li><code><b>bid_days:</b></code> It's the bid days of the usertask.</li>
          <li><code><b>project:</b></code> It's the id of the project it is a usertask of.</li>
          <li><code><b>task:</b></code> It's the id of the task it is a usertask of.</li>
          <li><code><b>step:</b></code> It's the id of the step it is a usertask of.</li>
          <li><code><b>assign_date:</b></code> It's the assigned date for the usertask.</li>
          <li><code><b>start_date:</b></code> It's the start date for the usertask.</li>
          <li><code><b>stop_date:</b></code> It's the stop date for the usertask.</li>
          <li><code><b>upload_date:</b></code> It's the upload date for the usertask.</li>
          <li><code><b>duration:</b></code> It's the duration for the usertask.</li>
          <li><code><b>status:</b></code> It's the status of the usertask.</li>
          <li><code><b>user:</b></code> It's the id of user the task is assigned to.</li>
        </ol>
      </div>
      <Typography className="mb-16" component="p">
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`data = {
  'bid_days': '0.1',
  'assign_date': '2022-01-12T16:54:33.002000Z',
  'start_date': '2022-01-12T16:54:33.002000Z',
  'stop_date': '2022-01-12T16:54:33.002000Z',
  'upload_date': '2022-01-12T16:54:33.002000Z',
  'duration': 0,
  'status': 1,
  'user': 488,
  'step': 'aaj:EP999:SQ010:SH010:Animation',
  'task': 'aaj:EP999:SQ010:SH010:Animation:Task_v1',
  'project': 'aaj'
}
result = session.create('UserTask', data)`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      This will create a new UserTask.
      </Typography>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <ol>
          <li><code><b>data</b></code> is a list of key/value pairs where the key is the column name to update and the value is the value to set.</li>
          <li><code><b>session</b></code> is  the ase API instance you created in  ase_session API instance.</li>
          <li><code><b>create()</b></code> is the API method in the Session class we are calling. We pass in the entity type we're searching for and the data we're setting.</li>
        </ol>
      </div>
      <Typography className="mb-16" component="p">
      Output:<br></br>
      The variable result now contains a dictionary hash with the UserTask information you created.
      </Typography>
      <FuseHighlight component="pre" className="language-json mb-24">
        {`{
  'id': 1014,
  'bid_days': '0.1',
  'assign_date': '2022-01-12T16:54:33.002000Z',
  'start_date': '2022-01-12T16:54:33.002000Z',
  'stop_date': '2022-01-12T16:54:33.002000Z',
  'upload_date': '2022-01-12T16:54:33.002000Z',
  'duration': 0,
  'status': 1,
  'user': 488,
   'step': 'aaj:EP999:SQ010:SH010:Animation',
 'task': 'aaj:EP999:SQ010:SH010:Animation:Task_v1',
  'project': 'aaj'
}`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
        In addition, ase_session has returned the id that it has assigned to the UserTask as well.
      </Typography>

      <hr></hr>

      <Typography className="mb-8" variant="h6">Find Multiple UserTasks</Typography>
      <Typography className="mb-16" component="p">
      Building the Query<br></br>
      Suppose we want to find out UserTask with project as "aaj".<br></br><br></br>
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`filters = [{'project': 'aaj' }]
result = session.find('UserTask', filters)`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      Pretty simple right? Well here's a little more insight into what's going on.
      </Typography>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <ol>
          <li><code><b>filters</b></code> is a list of filter conditions.</li>
          <li><code><b>session</b></code> is the ase API instance you created in ase_session API instance</li>
          <li><code><b>find()</b></code> is the API method n the Session class we are calling. We provide it with the entity type we're searching for and our filters.</li>
        </ol>
      </div>
      <Typography className="mb-16" component="p">
      Output:<br></br>
      So what does this return? The variable result now contains;
      </Typography>
      <FuseHighlight component="pre" className="language-json mb-24">
        {`[{
  'id': 1014,
  'bid_days': '0.1',
  'assign_date': '2022-01-12T16:54:33.002000Z',
  'start_date': '2022-01-12T16:54:33.002000Z',
  'stop_date': '2022-01-12T16:54:33.002000Z',
  'upload_date': '2022-01-12T16:54:33.002000Z',
  'duration': 0,
  'status': 1,
  'user': 488,
   'step': 'aaj:EP999:SQ010:SH010:Animation',
 'task': 'aaj:EP999:SQ010:SH010:Animation:Task_v1',
  'project': 'aaj'
}]`}
      </FuseHighlight>
      <hr></hr>

      <Typography className="mb-8" variant="h6">Find a UserTask</Typography>
      <Typography className="mb-16" component="p">
      Building the Query<br></br>
      We are going to assume we know the 'id' of the UserTask we're looking for in this example.<br></br><br></br>
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`id = 1014
result = session.find_one('UserTask',  id)`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      Pretty simple right? Well here's a little more insight into what's going on.
      </Typography>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <ol>
          <li><code><b>id</b></code> is the id for the object</li>
          <li><code><b>session</b></code> is the ase API instance you created in ase_session API instance</li>
          <li><code><b>find_one()</b></code> is the API method in the Session class we are calling. We provide it with the entity type we're searching for.</li>
        </ol>
      </div>
      <Typography className="mb-16" component="p">
      Output:<br></br>
      So what does this return? The variable result now contains;
      </Typography>
      <FuseHighlight component="pre" className="language-json mb-24">
        {`{
  'id': 1014,
  'bid_days': '0.1',
  'assign_date': '2022-01-12T16:54:33.002000Z',
  'start_date': '2022-01-12T16:54:33.002000Z',
  'stop_date': '2022-01-12T16:54:33.002000Z',
  'upload_date': '2022-01-12T16:54:33.002000Z',
  'duration': 0,
  'status': 1,
  'user': 488,
  'step': 'aaj:EP999:SQ010:SH010:Animation',
  'task': 'aaj:EP999:SQ010:SH010:Animation:Task_v1',
  'project': 'aaj'
}`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      By default, find_one() returns a single dictionary object.
      </Typography>
      <hr></hr>

      <Typography className="mb-8" variant="h6">Update a UserTask</Typography>
      <Typography className="mb-16" component="p">
      Building the data and calling update()<br></br>
      To update an UserTask, you need to provide the id of the UserTask and a list of fields you want to update.<br></br>
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`data = {'duration': 2}
result = session.update('UserTask', 1014 , data)`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      This will update the UserTask object.
      </Typography>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <ol>
          <li><code><b>data</b></code> is a list of key/value pairs where the key is the field name to update and the value to update it to.</li>
          <li><code><b>session</b></code> is the ase API instance you created in ase_session API instance</li>
          <li><code><b>update()</b></code> is the API method in the Session class we are calling. We provide it with the entity type we're updating, the id of the entity, and the data we're updating it with.</li>
        </ol>
      </div>
      <Typography className="mb-16" component="p">
      Output:<br></br>
      The variable result now contains the object that with the updated values.
      </Typography>
      <FuseHighlight component="pre" className="language-json mb-24">
        {`{
  'id': 1014,
  'bid_days': '0.1',
  'assign_date': '2022-01-12T16:54:33.002000Z',
  'start_date': '2022-01-12T16:54:33.002000Z',
  'stop_date': '2022-01-12T16:54:33.002000Z',
  'upload_date': '2022-01-12T16:54:33.002000Z',
  'duration': 2,
  'status': 1,
  'user': 488,
   'step': 'aaj:EP999:SQ010:SH010:Animation',
 'task': 'aaj:EP999:SQ010:SH010:Animation:Task_v1',
  'project': 'aaj'
}`}
      </FuseHighlight>
      <hr></hr>


      <Typography className="mb-8" variant="h6">Delete a UserTask</Typography>
      <Typography className="mb-16" component="p">
      Calling delete()<br></br>
      Deleting an entity in ase_session is pretty straight-forward. No extraneous uploadfiles required.
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`session.delete("UserTask", 1014)`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      If the UserTask was deleted successfully result will contain no body but only status code 204.
      </Typography>
    </>
  );
}

export default userTaskDoc;