import React from 'react';
import FuseHighlight from '@fuse/core/FuseHighlight';
import Typography from '@mui/material/Typography';

function ShotDoc() {
  return (
    <>
      <Typography variant="h4" className="mb-24">Shot</Typography>
      <Typography className="mb-8" variant="h6">Create a Shot</Typography>
      <Typography className="mb-16" component="p">
      Building the data and calling create()
      </Typography>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <Typography className="mb-8 font-500 text-16 text-red">Important:</Typography>
        <ol>
          <li>To create a Shot, you need to provide the following values;</li>
          <li><code><b>name:</b></code> It's the string for name of the shot</li>
          <li><code><b>description:</b></code> It's the description about the shot</li>
          <li><code><b>project:</b></code> It's the id of the project it is an shot of.</li>
          <li><code><b>episode:</b></code> It's the id of the episode it is a shot of.</li>
          <li><code><b>start_frame:</b></code> It's the start of frame for the shot</li>
          <li><code><b>end_frame:</b></code> It's the end of frame for the shot</li>
        </ol>
      </div>
      <Typography className="mb-16" component="p">
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`data = {
  'name': 'SH010',
  'description': '',
  'start_frame': 101,
  'end_frame': 152,
  'project': 'aaj',
  'episode': 'aaj:EP999',
  'sequence': 'aaj:EP999:SQ010'
}
result = session.create('Shot', data)`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      This will create a new Shot named "SH010".
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
      The variable result now contains a dictionary hash with the Shot information you created.
      </Typography>
      <FuseHighlight component="pre" className="language-json mb-24">
        {`{
  'uid': 'aaj:EP999:SQ010:SH010',
  'name': 'SH010',
  'created_at': '2022-01-18T16:51:47.454000Z',
  'updated_at': '2022-01-18T16:51:47.454000Z',
  'description': '',
  'start_frame': 101,
  'end_frame': 152,
  'project': 'aaj',
  'episode': 'aaj:EP999',
  'sequence': 'aaj:EP999:SQ010'
}`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
        In addition, ase_session has returned the id that it has assigned to the Shot as well.
      </Typography>

      <hr></hr>

      <Typography className="mb-8" variant="h6">Find Multiple Shots</Typography>
      <Typography className="mb-16" component="p">
      Building the Query<br></br>
      Suppose we want to find out Shot with project as "aaj".<br></br><br></br>
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`filters = [{'project': 'aaj' }]
result = session.find('Shot', filters)
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
  'uid': 'aaj:EP999:SQ010:SH010',
  'name': 'SH010',
  'created_at': '2022-01-18T16:51:47.454000Z',
  'updated_at': '2022-01-18T16:51:47.454000Z',
  'description': '',
  'start_frame': 101,
  'end_frame': 152,
  'project': 'aaj',
  'episode': 'aaj:EP999',
  'sequence': 'aaj:EP999:SQ010'
}]`}
      </FuseHighlight>
      <hr></hr>

      <Typography className="mb-8" variant="h6">Find a Shot</Typography>
      <Typography className="mb-16" component="p">
      Building the Query<br></br>
      We are going to assume we know the 'id' of the Shot we're looking for in this example.<br></br><br></br>
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`id =  'aaj:EP999:SQ010:SH010'
result = session.find_one('Shot',  id)`}
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
  'uid': 'aaj:EP999:SQ010:SH010',
  'name': 'SH010',
  'created_at': '2022-01-18T16:51:47.454000Z',
  'updated_at': '2022-01-18T16:51:47.454000Z',
  'description': '',
  'start_frame': 101,
  'end_frame': 152,
  'project': 'aaj',
  'episode': 'aaj:EP999',
  'sequence': 'aaj:EP999:SQ010'
}`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      By default, find_one() returns a single dictionary object.
      </Typography>
      <hr></hr>

      <Typography className="mb-8" variant="h6">Update a Shot</Typography>
      <Typography className="mb-16" component="p">
      Building the data and calling update()<br></br>
      To update an Shot, you need to provide the id of the Shot and a list of fields you want to update.<br></br>
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`data = {'description': 'description of shot'}
result = session.update('Shot', 'aaj:EP999:SQ010:SH010', data)
`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      This will update the Shot object.
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
  'uid': 'aaj:EP999:SQ010:SH010',
  'name': 'SH010',
  'created_at': '2022-01-18T16:51:47.454000Z',
  'updated_at': '2022-01-18T16:51:47.454000Z',
  'description': 'description of shot',
  'start_frame': 101,
  'end_frame': 152,
  'project': 'aaj',
  'episode': 'aaj:EP999',
  'sequence': 'aaj:EP999:SQ010'
}`}
      </FuseHighlight>
      <hr></hr>


      <Typography className="mb-8" variant="h6">Delete a Shot</Typography>
      <Typography className="mb-16" component="p">
      Calling delete()<br></br>
      Deleting an entity in ase_session is pretty straight-forward. No extraneous steps required.
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`result = session.delete("Shot", 'aaj:EP999:SQ010:SH010')`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      If the Shot was deleted successfully result will contain no body but only status code 204.
      </Typography>
    </>
  );
}

export default ShotDoc;
