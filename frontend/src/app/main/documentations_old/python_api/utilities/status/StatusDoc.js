import React from 'react';
import FuseHighlight from '@fuse/core/FuseHighlight';
import Typography from '@mui/material/Typography';

function StatusDoc() {
  return (
    <>
      <Typography variant="h4" className="mb-24">Status</Typography>
      <Typography className="mb-8" variant="h6">Create a Status</Typography>
      <Typography className="mb-16" component="p">
      Building the data and calling create()
      </Typography>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <Typography className="mb-8 font-500 text-16 text-red">Important:</Typography>
        <ol>
          <li>To create a Status, you need to provide the following values;</li>
          <li><code><b>name:</b></code> It's the string for name of the status</li>
          <li><code><b>color:</b></code> It's the string for the hex code of the color</li>
          <li><code><b>status_type:</b></code> It's the string for the type of status</li>
        </ol>
      </div>
      <Typography className="mb-16" component="p">
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`data = {
  'name': 'Ready To Start',
  'color': '#f4f6f7',
  'status_type': 'Pipeline'
}
result = session.create('Status', data)`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      This will create a new Status named "Ready To Start".
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
      The variable result now contains a dictionary hash with the Status information you created.
      </Typography>
      <FuseHighlight component="pre" className="language-json mb-24">
        {`{
  'id': 1,
  'name': 'Ready To Start',
  'color': '#f4f6f7',
  'status_type': 'Pipeline'
}`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
        In addition, ase_session has returned the id that it has assigned to the Status as well.
      </Typography>

      <hr></hr>

      <Typography className="mb-8" variant="h6">Find Multiple Statuss</Typography>
      <Typography className="mb-16" component="p">
      Building the Query<br></br>
      Suppose we want to find out statuses with department as "Pipeline".<br></br><br></br>
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`filters = [{'department': 'Pipeline' }]
result = session.find('Status', filters)`}
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
  'id': 1,
  'name': 'Ready To Start',
  'color': '#f4f6f7',
  'status_type': 'Pipeline'
}]`}
      </FuseHighlight>
      <hr></hr>

      <Typography className="mb-8" variant="h6">Find a Status</Typography>
      <Typography className="mb-16" component="p">
      Building the Query<br></br>
      We are going to assume we know the 'id' of the Status we're looking for in this example.<br></br><br></br>
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`id = 1
result = session.find_one('Status', id)`}
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
  'id': 1,
  'name': 'Ready To Start',
  'color': '#f4f6f7',
  'status_type': 'Pipeline'
}`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      By default, find_one() returns a single dictionary object.
      </Typography>
      <hr></hr>

      <Typography className="mb-8" variant="h6">Update a Status</Typography>
      <Typography className="mb-16" component="p">
      Building the data and calling update()<br></br>
      To update an Status, you need to provide the id of the Status and a list of fields you want to update.<br></br>
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`data = {'color': '#f4a5a5'}
result = session.update('Status', 1, data)`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      This will update the Status object.
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
  'id': 1,
  'name': 'Ready To Start',
  'color': '#f4a5a5',
  'status_type': 'Pipeline'
}`}
      </FuseHighlight>
      <hr></hr>


      <Typography className="mb-8" variant="h6">Delete a Status</Typography>
      <Typography className="mb-16" component="p">
      Calling delete()<br></br>
      Deleting an entity in ase_session is pretty straight-forward. No extraneous statuss required.
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`result = session.delete("Status", 1)`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      If the Status was deleted successfully result will contain no body but only status code 204.
      </Typography>
    </>
  );
}

export default StatusDoc;
