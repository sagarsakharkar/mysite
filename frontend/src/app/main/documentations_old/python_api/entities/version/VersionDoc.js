import React from 'react';
import FuseHighlight from '@fuse/core/FuseHighlight';
import Typography from '@mui/material/Typography';

function VersionDoc() {
  return (
    <>
      <Typography variant="h4" className="mb-24">Version</Typography>
      <Typography className="mb-8" variant="h6">Create a Version</Typography>
      <Typography className="mb-16" component="p">
      Building the data and calling create()
      </Typography>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <Typography className="mb-8 font-500 text-16 text-red">Important:</Typography>
        <ol>
          <li>To create a Version, you need to provide the following values;</li>
          <li><code><b>name:</b></code> It's the string for name of the version.</li>
          <li><code><b>description:</b></code> It's the string to describe the version.</li>
          <li><code><b>project:</b></code> It's the id of the project it is a version of.</li>
          <li><code><b>episode:</b></code> It's the id of the episode it is a version of.</li>
          <li><code><b>asset:</b></code> It's the id of the asset it is a version of.</li>
          <li><code><b>sequence:</b></code> It's the id of the sequence it is a version of.</li>
          <li><code><b>shot:</b></code> It's the id of the shot it is a version of.</li>
          <li><code><b>is_latest:</b></code> It describes if the version is latest or not.</li>
          <li><code><b>status:</b></code> It's the id of the status it is a version of.</li>
          <li><code><b>priority:</b></code> It's the id of the priority it is a version of.</li>
          <li><code><b>step:</b></code> It's the id of the step it is a version of.</li>
          <li><code><b>version_number:</b></code> It describes the version number of the version.</li>
          <li><code><b>created_by:</b></code> Its the id of the user it is created by.</li>
          <li><code><b>updated_by:</b></code> Its the id of the user it is updated by.</li>
          <li><code><b>media_files:</b></code> It's the list of media files linked to the version.</li>
        </ol>
      </div>
      <Typography className="mb-16" component="p">
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`data = {
  'name': 'Review_v1',
  'version_number': 1,
  'description': 'Animation for review',
  'is_latest': True,
  'status': 3,
  'created_by': 1,
  'updated_by': None,
  'project': 'aaj',
  'asset': None,
  'episode': 'aaj:EP999',
  'sequence': 'aaj:EP999:SQ010',
  'shot': 'aaj:EP999:SQ010:SH010',
  'step': 'aaj:EP999:SQ010:SH010:Animation',
  'task': 'aaj:EP999:SQ010:SH010:Animation:Task_v1',
  'media_files': []
}
result = session.create('Version', data)`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      This will create a new Version named "Review_v1".
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
      The variable result now contains a dictionary hash with the Version information you created.
      </Typography>
      <FuseHighlight component="pre" className="language-json mb-24">
        {`{
  'uid': 'aaj:EP999:SQ010:SH010:Animation:Review_v1',
  'name': 'Review_v1',
  'created_at': '2022-01-29T08:03:24.828364Z',
  'updated_at': '2022-01-29T08:03:24.828364Z',
  'version_number': 1,
  'description': 'Animation for review',
  'is_latest': True,
  'status': 3,
  'created_by': 1,
  'updated_by': None,
  'project': 'aaj',
  'asset': None,
  'episode': 'aaj:EP999',
  'sequence': 'aaj:EP999:SQ010',
  'shot': 'aaj:EP999:SQ010:SH010',
  'step': 'aaj:EP999:SQ010:SH010:Animation',
  'task': 'aaj:EP999:SQ010:SH010:Animation:Task_v1',
  'media_files': []
}`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
        In addition, ase_session has returned the id that it has assigned to the Version as well.
      </Typography>

      <hr></hr>

      <Typography className="mb-8" variant="h6">Find Multiple Versions</Typography>
      <Typography className="mb-16" component="p">
      Building the Query<br></br>
      Suppose we want to find out Version with project as "aaj".<br></br><br></br>
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`filters = [{'project': 'aaj' }]
result = session.find('Version', filters)`}
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
  'uid': 'aaj:EP999:SQ010:SH010:Animation:Review_v1',
  'name': 'Review_v1',
  'created_at': '2022-01-29T08:03:24.828364Z',
  'updated_at': '2022-01-29T08:03:24.828364Z',
  'version_number': 1,
  'description': 'Animation for review',
  'is_latest': True,
  'status': 3,
  'created_by': 1,
  'updated_by': None,
  'project': 'aaj',
  'asset': None,
  'episode': 'aaj:EP999',
  'sequence': 'aaj:EP999:SQ010',
  'shot': 'aaj:EP999:SQ010:SH010',
  'step': 'aaj:EP999:SQ010:SH010:Animation',
  'task': 'aaj:EP999:SQ010:SH010:Animation:Task_v1',
  'media_files': []
}]`}
      </FuseHighlight>
      <hr></hr>

      <Typography className="mb-8" variant="h6">Find a Version</Typography>
      <Typography className="mb-16" component="p">
      Building the Query<br></br>
      We are going to assume we know the 'id' of the Version we're looking for in this example.<br></br><br></br>
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`id =  'aaj:EP999:SQ010:SH010:Animation:Review_v1'
result = session.find_one('Version',  id)`}
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
  'uid': 'aaj:EP999:SQ010:SH010:Animation:Review_v1',
  'name': 'Review_v1',
  'created_at': '2022-01-29T08:03:24.828364Z',
  'updated_at': '2022-01-29T08:03:24.828364Z',
  'version_number': 1,
  'description': 'Animation for review',
  'is_latest': True,
  'status': 3,
  'created_by': 1,
  'updated_by': None,
  'project': 'aaj',
  'asset': None,
  'episode': 'aaj:EP999',
  'sequence': 'aaj:EP999:SQ010',
  'shot': 'aaj:EP999:SQ010:SH010',
  'step': 'aaj:EP999:SQ010:SH010:Animation',
  'task': 'aaj:EP999:SQ010:SH010:Animation:Task_v1',
  'media_files': []
}`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      By default, find_one() returns a single dictionary object.
      </Typography>
      <hr></hr>

      <Typography className="mb-8" variant="h6">Update a Version</Typography>
      <Typography className="mb-16" component="p">
      Building the data and calling update()<br></br>
      To update an Version, you need to provide the id of the Version and a list of fields you want to update.<br></br>
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`data = {'version_number': 3}
result = session.update('Version', 'aaj:EP999:SQ010:SH010:Animation:Review_v1', data)`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      This will update the Version object.
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
  'uid': 'aaj:EP999:SQ010:SH010:Animation:Review_v1',
  'name': 'Review_v1',
  'created_at': '2022-01-29T08:03:24.828364Z',
  'updated_at': '2022-01-29T08:03:24.828364Z',
  'version_number': 3,
  'description': 'Animation for review',
  'is_latest': True,
  'status': 3,
  'created_by': 1,
  'updated_by': None,
  'project': 'aaj',
  'asset': None,
  'episode': 'aaj:EP999',
  'sequence': 'aaj:EP999:SQ010',
  'shot': 'aaj:EP999:SQ010:SH010',
  'step': 'aaj:EP999:SQ010:SH010:Animation',
  'task': 'aaj:EP999:SQ010:SH010:Animation:Task_v1',
  'media_files': []
}`}
      </FuseHighlight>
      <hr></hr>


      <Typography className="mb-8" variant="h6">Delete a Version</Typography>
      <Typography className="mb-16" component="p">
      Calling delete()<br></br>
      Deleting an entity in ase_session is pretty straight-forward. No extraneous versions required.
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`result = session.delete("Version", 'aaj:EP999:SQ010:SH010:Animation:Review_v1')`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      If the Version was deleted successfully result will contain no body but only status code 204.
      </Typography>
    </>
  );
}

export default VersionDoc;
