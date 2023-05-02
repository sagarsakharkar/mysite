import React from 'react';
import FuseHighlight from '@fuse/core/FuseHighlight';
import Typography from '@mui/material/Typography';

function uploadFileDoc() {
  return (
    <>
      <Typography variant="h4" className="mb-24">UploadFile</Typography>
      <Typography className="mb-8" variant="h6">Create a UploadFile</Typography>
      <Typography className="mb-16" component="p">
      Building the data and calling create()
      </Typography>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <Typography className="mb-8 font-500 text-16 text-red">Important:</Typography>
        <ol>
          <li>To create a UploadFile, you need to provide the following values;</li>
          <li><code><b>name:</b></code> Name of the file</li>
          <li><code><b>type:</b></code> Describes the type of the file</li>
          <li><code><b>url:</b></code> It describes the url of the file</li>
          <li><code><b>created_by:</b></code> It's the id of the user file is uploaded by.</li>
        </ol>
      </div>
      <Typography className="mb-16" component="p">
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`data = {
  'name': 'pexels-tanika-3687770_Iq0O9Cq.jpg',
  'type': 'image/jpeg',
  'url': 'http://127.0.0.1:8000/media/review_files/pexels-tanika-3687770_Iq0O9Cq_RaRxMUB.jpg',
  'created_by': 1
}
result = session.create('UploadFile', data)`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      This will create a new UploadFile.
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
      The variable result now contains a dictionary hash with the UploadFile information you created.
      </Typography>
      <FuseHighlight component="pre" className="language-json mb-24">
        {`{
  'id': 28,
  'name': 'pexels-tanika-3687770_Iq0O9Cq.jpg',
  'type': 'image/jpeg',
  'url': 'http://127.0.0.1:8000/media/review_files/pexels-tanika-3687770_Iq0O9Cq_RaRxMUB.jpg',
  'created_at': '2022-01-17T15:40:22.717000Z',
  'created_by': 1
}`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
        In addition, ase_session has returned the id that it has assigned to the UploadFile as well.
      </Typography>

      <hr></hr>

      <Typography className="mb-8" variant="h6">Find Multiple UploadFiles</Typography>
      <Typography className="mb-16" component="p">
      Building the Query<br></br>
      Suppose we want to find out UploadFile with type of file.<br></br><br></br>
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`filters = [{'type': 'image/jpeg' }]
result = session.find('UploadFile', filters)`}
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
  'id': 28,
  'name': 'pexels-tanika-3687770_Iq0O9Cq.jpg',
  'type': 'image/jpeg',
  'url': 'http://127.0.0.1:8000/media/review_files/pexels-tanika-3687770_Iq0O9Cq_RaRxMUB.jpg',
  'created_at': '2022-01-17T15:40:22.717000Z',
  'created_by': 1
}]`}
      </FuseHighlight>
      <hr></hr>

      <Typography className="mb-8" variant="h6">Find a UploadFile</Typography>
      <Typography className="mb-16" component="p">
      Building the Query<br></br>
      We are going to assume we know the 'id' of the UploadFile we're looking for in this example.<br></br><br></br>
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`id = 28
result = session.find_one('UploadFile',  id)`}
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
  'id': 28,
  'name': 'pexels-tanika-3687770_Iq0O9Cq.jpg',
  'type': 'image/jpeg',
  'url': 'http://127.0.0.1:8000/media/review_files/pexels-tanika-3687770_Iq0O9Cq_RaRxMUB.jpg',
  'created_at': '2022-01-17T15:40:22.717000Z',
  'created_by': 1
}`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      By default, find_one() returns a single dictionary object.
      </Typography>
      <hr></hr>

      <Typography className="mb-8" variant="h6">Update a UploadFile</Typography>
      <Typography className="mb-16" component="p">
      Building the data and calling update()<br></br>
      To update an UploadFile, you need to provide the id of the UploadFile and a list of fields you want to update.<br></br>
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`data = {'type': 'image/png'}
result = session.update('UploadFile', 28 , data)`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      This will update the UploadFile object.
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
  'id': 28,
  'name': 'pexels-tanika-3687770_Iq0O9Cq.jpg',
  'type': 'image/png',
  'url': 'http://127.0.0.1:8000/media/review_files/pexels-tanika-3687770_Iq0O9Cq_RaRxMUB.jpg',
  'created_at': '2022-01-17T15:40:22.717000Z',
  'created_by': 1
}`}
      </FuseHighlight>
      <hr></hr>


      <Typography className="mb-8" variant="h6">Delete a UploadFile</Typography>
      <Typography className="mb-16" component="p">
      Calling delete()<br></br>
      Deleting an entity in ase_session is pretty straight-forward. No extraneous uploadfiles required.
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`result = session.delete("UploadFile", 28)`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      If the UploadFile was deleted successfully result will contain no body but only status code 204.
      </Typography>
    </>
  );
}

export default uploadFileDoc;