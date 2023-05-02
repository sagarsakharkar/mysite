import React from 'react';
import FuseHighlight from '@fuse/core/FuseHighlight';
import Typography from '@mui/material/Typography';

function TaskDoc() {
  return (
    <>
      <Typography variant="h4" className="mb-24">Task</Typography>
      <Typography className="mb-8" variant="h6">Create a Task</Typography>
      <Typography className="mb-16" component="p">
      Building the data and calling create()
      </Typography>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <Typography className="mb-8 font-500 text-16 text-red">Important:</Typography>
        <ol>
          <li>To create a Task, you need to provide the following values;</li>
          <li><code><b>name:</b></code> It's the string for name of the task</li>
          <li><code><b>project:</b></code> It's the id of the project it is a task of.</li>
          <li><code><b>episode:</b></code> It's the id of the episode it is a task of.</li>
          <li><code><b>asset:</b></code> It's the id of the asset it is a task of.</li>
          <li><code><b>sequence:</b></code> It's the id of the sequence it is a task of.</li>
          <li><code><b>shot:</b></code> It's the id of the shot it is a task of.</li>
          <li><code><b>duration:</b></code> It's the duration of the task.</li>
          <li><code><b>is_latest:</b></code> It describes if the task is latest or not.</li>
          <li><code><b>reviewer:</b></code> It describes number of reviewers for the task.</li>
          <li><code><b>bid_days:</b></code> It's the number of bid days</li>
          <li><code><b>status:</b></code> It's the id of the status it is a task of.</li>
          <li><code><b>priority:</b></code> It's the id of the priority it is a task of.</li>
          <li><code><b>step:</b></code> It's the id of the step it is a task of.</li>
          <li><code><b>version_number:</b></code> It describes the version number of the task.</li>
        </ol>
      </div>
      <Typography className="mb-16" component="p">
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`data = {
  'name': 'Task_v1',
  'version_number': 1,
  'bid_days': 0.21,
  'start_date': '2022-01-28T09:38:10.300000Z',
  'end_date': '2022-01-28T09:38:10.300000Z',
  'duration': 1,
  'is_latest': True,
  'status': 2,
  'priority': 1,
  'reviewer': 493,
  'project': 'aaj',
  'asset': None,
  'episode': 'aaj:EP999',
  'sequence': 'aaj:EP999:SQ010',
  'shot': 'aaj:EP999:SQ010:SH010',
  'step': 'aaj:EP999:SQ010:SH010:Animation'
}
result = session.create('Task', data)`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      This will create a new Task named "Animation".
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
      The variable result now contains a dictionary hash with the Task information you created.
      </Typography>
      <FuseHighlight component="pre" className="language-json mb-24">
        {`{
  'uid': 'aaj:EP999:SQ010:SH010:Animation:Task_v1',
  'name': 'Task_v1',
  'created_at': '2022-01-28T09:38:10.300000Z',
  'updated_at': '2022-01-28T09:38:10.300000Z',
  'version_number': 1,
  'bid_days': 0.21,
  'start_date': '2022-01-28T09:38:10.300000Z',
  'end_date': '2022-01-28T09:38:10.300000Z',
  'duration': 1,
  'is_latest': True,
  'status': 2,
  'priority': 1,
  'reviewer': 493,
  'project': 'aaj',
  'asset': None,
  'episode': 'aaj:EP999',
  'sequence': 'aaj:EP999:SQ010',
  'shot': 'aaj:EP999:SQ010:SH010',
  'step': 'aaj:EP999:SQ010:SH010:Animation'
}`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
        In addition, ase_session has returned the id that it has assigned to the Task as well.
      </Typography>

      <hr></hr>

      <Typography className="mb-8" variant="h6">Find Multiple Tasks</Typography>
      <Typography className="mb-16" component="p">
      Building the Query<br></br>
      Suppose we want to find out Task with project as "aaj".<br></br><br></br>
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`filters = [{'project': 'aaj' }]
result = session.find('Task', filters)
`}
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
  'uid': 'aaj:EP999:SQ010:SH010:Animation:Task_v1',
  'name': 'Task_v1',
  'created_at': '2022-01-28T09:38:10.300000Z',
  'updated_at': '2022-01-28T09:38:10.300000Z',
  'version_number': 1,
  'bid_days': 0.21,
  'start_date': '2022-01-28T09:38:10.300000Z',
  'end_date': '2022-01-28T09:38:10.300000Z',
  'duration': 1,
  'is_latest': True,
  'status': 2,
  'priority': 1,
  'reviewer': 493,
  'project': 'aaj',
  'asset': None,
  'episode': 'aaj:EP999',
  'sequence': 'aaj:EP999:SQ010',
  'shot': 'aaj:EP999:SQ010:SH010',
  'step': 'aaj:EP999:SQ010:SH010:Animation'
}]`}
      </FuseHighlight>
      <hr></hr>

      <Typography className="mb-8" variant="h6">Find a Task</Typography>
      <Typography className="mb-16" component="p">
      Building the Query<br></br>
      We are going to assume we know the 'id' of the Task we're looking for in this example.<br></br><br></br>
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`id = 'aaj:EP999:SQ010:SH010:Animation:Task_v1'
result = session.find_one('Task',  id)`}
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
  'uid': 'aaj:EP999:SQ010:SH010:Animation:Task_v1',
  'name': 'Task_v1',
  'created_at': '2022-01-28T09:38:10.300000Z',
  'updated_at': '2022-01-28T09:38:10.300000Z',
  'version_number': 1,
  'bid_days': 0.21,
  'start_date': '2022-01-28T09:38:10.300000Z',
  'end_date': '2022-01-28T09:38:10.300000Z',
  'duration': 1,
  'is_latest': True,
  'status': 2,
  'priority': 1,
  'reviewer': 493,
  'project': 'aaj',
  'asset': None,
  'episode': 'aaj:EP999',
  'sequence': 'aaj:EP999:SQ010',
  'shot': 'aaj:EP999:SQ010:SH010',
  'step': 'aaj:EP999:SQ010:SH010:Animation'
}`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      By default, find_one() returns a single dictionary object.
      </Typography>
      <hr></hr>

      <Typography className="mb-8" variant="h6">Update a Task</Typography>
      <Typography className="mb-16" component="p">
      Building the data and calling update()<br></br>
      To update an Task, you need to provide the id of the Task and a list of fields you want to update.<br></br>
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`data = {'duration': 3}
result = session.update('Task', 'aaj:EP999:SQ010:SH010:Animation:Task_v1', data)`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      This will update the Task object.
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
  'uid': 'aaj:EP999:SQ010:SH010:Animation:Task_v1',
  'name': 'Task_v1',
  'created_at': '2022-01-28T09:38:10.300000Z',
  'updated_at': '2022-01-28T09:38:10.300000Z',
  'version_number': 1,
  'bid_days': 0.21,
  'start_date': '2022-01-28T09:38:10.300000Z',
  'end_date': '2022-01-28T09:38:10.300000Z',
  'duration': 3,
  'is_latest': True,
  'status': 2,
  'priority': 1,
  'reviewer': 493,
  'project': 'aaj',
  'asset': None,
  'episode': 'aaj:EP999',
  'sequence': 'aaj:EP999:SQ010',
  'shot': 'aaj:EP999:SQ010:SH010',
  'step': 'aaj:EP999:SQ010:SH010:Animation'
}`}
      </FuseHighlight>
      <hr></hr>


      <Typography className="mb-8" variant="h6">Delete a Task</Typography>
      <Typography className="mb-16" component="p">
      Calling delete()<br></br>
      Deleting an entity in ase_session is pretty straight-forward. No extraneous tasks required.
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`result = session.delete("Task", 'aaj:EP999:SQ010:SH010:Animation:Task_v1')`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      If the Task was deleted successfully result will contain no body but only status code 204.
      </Typography>
    </>
  );
}

export default TaskDoc;
