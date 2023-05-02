import React from 'react';
import FuseHighlight from '@fuse/core/FuseHighlight';
import Typography from '@mui/material/Typography';

function NotesDoc() {
  return (
    <>
      <Typography variant="h4" className="mb-24">Note</Typography>
      <Typography className="mb-8" variant="h6">Create a Note</Typography>
      <Typography className="mb-16" component="p">
      Building the data and calling create()
      </Typography>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <Typography className="mb-8 font-500 text-16 text-red">Important:</Typography>
        <ol>
          <li>To create a Note, you need to provide the following values;</li>
          <li><code><b>message:</b></code> It's the string for message of the note.</li>
          <li><code><b>project:</b></code> It's the id of the project it is a note of.</li>
          <li><code><b>episode:</b></code> It's the id of the episode it is a note of.</li>
          <li><code><b>asset:</b></code> It's the id of the asset it is a note of.</li>
          <li><code><b>sequence:</b></code> It's the id of the sequence it is a note of.</li>
          <li><code><b>shot:</b></code> It's the id of the shot it is a note of.</li>
          <li><code><b>task:</b></code> It's the id of the task it is a note of.</li>
          <li><code><b>step:</b></code> It's the id of the step it is a note of.</li>
          <li><code><b>version:</b></code> It describes the version  of the note.</li>
          <li><code><b>created_by:</b></code> Its the id of the user it is created by.</li>
          <li><code><b>updated_by:</b></code> Its the id of the user it is updated by.</li>
          <li><code><b>attachments:</b></code> It's the list of files linked to the note.</li>
        </ol>
      </div>
      <Typography className="mb-16" component="p">
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`data = {
  'message': 'This is test note on Review_v1',
  'created_by': 2,
  'updated_by': None,
  'project': 'aaj',
  'asset': None,
  'episode': 'aaj:EP999',
  'sequence': 'aaj:EP999:SQ010',
  'shot': 'aaj:EP999:SQ010:SH010',
  'step': 'aaj:EP999:SQ010:SH010:Animation',
  'task': 'aaj:EP999:SQ010:SH010:Animation:Task_v1',
  'version': 'aaj:EP999:SQ010:SH010:Animation:Review_v1',
  'attachments': []
}
result = session.create('Note', data)`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      This will create a new Note.
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
      The variable result now contains a dictionary hash with the Note information you created.
      </Typography>
      <FuseHighlight component="pre" className="language-json mb-24">
        {`{
  'id': 8,
  'message': 'This is test note on Review_v1',
  'created_at': '2022-01-29T08:09:19.705965Z',
  'updated_at': '2022-01-29T08:09:19.705965Z',
  'created_by': 2,
  'updated_by': None,
  'project': 'aaj',
  'asset': None,
  'episode': 'aaj:EP999',
  'sequence': 'aaj:EP999:SQ010',
  'shot': 'aaj:EP999:SQ010:SH010',
  'step': 'aaj:EP999:SQ010:SH010:Animation',
  'task': 'aaj:EP999:SQ010:SH010:Animation:Task_v1',
  'version': 'aaj:EP999:SQ010:SH010:Animation:Review_v1',
  'attachments': []
}`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
        In addition, ase_session has returned the id that it has assigned to the Note as well.
      </Typography>

      <hr></hr>

      <Typography className="mb-8" variant="h6">Find Multiple Notes</Typography>
      <Typography className="mb-16" component="p">
      Building the Query<br></br>
      Suppose we want to find out Note with project as "aaj".<br></br><br></br>
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`filters = [{'project': 'aaj' }]
result = session.find('Note', filters)`}
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
  'id': 8,
  'message': 'This is test note on Review_v1',
  'created_at': '2022-01-29T08:09:19.705965Z',
  'updated_at': '2022-01-29T08:09:19.705965Z',
  'created_by': 2,
  'updated_by': None,
  'project': 'aaj',
  'asset': None,
  'episode': 'aaj:EP999',
  'sequence': 'aaj:EP999:SQ010',
  'shot': 'aaj:EP999:SQ010:SH010',
  'step': 'aaj:EP999:SQ010:SH010:Animation',
  'task': 'aaj:EP999:SQ010:SH010:Animation:Task_v1',
  'version': 'aaj:EP999:SQ010:SH010:Animation:Review_v1',
  'attachments': []
}]`}
      </FuseHighlight>
      <hr></hr>

      <Typography className="mb-8" variant="h6">Find a Note</Typography>
      <Typography className="mb-16" component="p">
      Building the Query<br></br>
      We are going to assume we know the 'id' of the Note we're looking for in this example.<br></br><br></br>
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`id = 8
result = session.find_one('Note',  id)`}
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
  'id': 8,
  'message': 'This is test note on Review_v1',
  'created_at': '2022-01-29T08:09:19.705965Z',
  'updated_at': '2022-01-29T08:09:19.705965Z',
  'created_by': 2,
  'updated_by': None,
  'project': 'aaj',
  'asset': None,
  'episode': 'aaj:EP999',
  'sequence': 'aaj:EP999:SQ010',
  'shot': 'aaj:EP999:SQ010:SH010',
  'step': 'aaj:EP999:SQ010:SH010:Animation',
  'task': 'aaj:EP999:SQ010:SH010:Animation:Task_v1',
  'version': 'aaj:EP999:SQ010:SH010:Animation:Review_v1',
  'attachments': []
}`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      By default, find_one() returns a single dictionary object.
      </Typography>
      <hr></hr>

      <Typography className="mb-8" variant="h6">Update a Note</Typography>
      <Typography className="mb-16" component="p">
      Building the data and calling update()<br></br>
      To update an Note, you need to provide the id of the Note and a list of fields you want to update.<br></br>
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`data = {'message': 'This is test note on Review_v1 updated'}
result = session.update('Note', 8 , data)`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      This will update the Note object.
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
  'id': 8,
  'message': 'This is test note on Review_v1 updated',
  'created_at': '2022-01-29T08:09:19.705965Z',
  'updated_at': '2022-01-29T08:09:19.705965Z',
  'created_by': 2,
  'updated_by': None,
  'project': 'aaj',
  'asset': None,
  'episode': 'aaj:EP999',
  'sequence': 'aaj:EP999:SQ010',
  'shot': 'aaj:EP999:SQ010:SH010',
  'step': 'aaj:EP999:SQ010:SH010:Animation',
  'task': 'aaj:EP999:SQ010:SH010:Animation:Task_v1',
  'version': 'aaj:EP999:SQ010:SH010:Animation:Review_v1',
  'attachments': []
}`}
      </FuseHighlight>
      <hr></hr>


      <Typography className="mb-8" variant="h6">Delete a Note</Typography>
      <Typography className="mb-16" component="p">
      Calling delete()<br></br>
      Deleting an entity in ase_session is pretty straight-forward. No extraneous note required.
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`result = session.delete("Note", 8)`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      If the Note was deleted successfully result will contain no body but only status code 204.
      </Typography>
    </>
  );
}

export default NotesDoc;
