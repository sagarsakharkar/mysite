import React from 'react';
import FuseHighlight from '@fuse/core/FuseHighlight';
import Typography from '@mui/material/Typography';

function contactsDoc() {
  return (
    <>
      <Typography variant="h4" className="mb-24">User</Typography>
      <Typography className="mb-8" variant="h6">Create a User</Typography>
      <Typography className="mb-16" component="p">
      Building the data and calling create()
      </Typography>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <Typography className="mb-8 font-500 text-16 text-red">Important:</Typography>
        <ol>
          <li>To create a User, you need to provide the following values;</li>
          <li><code><b>is_superuser:</b></code> It's a boolean field if the user will be superuser or not</li>
          <li><code><b>username:</b></code> It's string type for the username</li>
          <li><code><b>first_name:</b></code> It's string type for the first-name of the user</li>
          <li><code><b>last_name:</b></code> It's string type for the last-name of the user</li>
          <li><code><b>is_staff:</b></code> It's boolean type if the user has staff privileges</li>
          <li><code><b>is_active:</b></code> It's boolean type if the user is active or not</li>
          <li><code><b>email:</b></code> It's string type for the email of user</li>
        </ol>
      </div>
      <Typography className="mb-16" component="p">
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`data = {
  'is_superuser': True,
  'username': 'admin',
  'first_name': 'Sagar',
  'last_name': 'Sakharkar',
  'is_staff': True,
  'is_active': True,
  'email': 'prafullsakharkar@gmail.com'
}
result = session.create('User', data)`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      This will create a new User named as "admin".
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
      The variable result now contains a dictionary hash with the User information you created.
      </Typography>
      <FuseHighlight component="pre" className="language-json mb-24">
        {`{
  'id': 1,
  'last_login': '2022-01-18T12:34:40.957000Z',
  'is_superuser': True,
  'username': 'admin',
  'first_name': 'Sagar',
  'last_name': 'Sakharkar',
  'is_staff': True,
  'is_active': True,
  'date_joined': '2022-01-08T08:18:26.112000Z',
  'email': 'prafullsakharkar@gmail.com',
  'avatar': 'http://127.0.0.1:8000/media/profile_pics/default.jpg',
  'role': None
}`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
        In addition, ase_session has returned the id that it has assigned to the User as well.
      </Typography>

      <hr></hr>

      <Typography className="mb-8" variant="h6">Find Multiple Users</Typography>
      <Typography className="mb-16" component="p">
      Building the Query<br></br>
      Suppose we want to find out all users who are superuser.<br></br><br></br>
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`filters = [{'is_superuser': True }]
result = session.find('User', filters)`}
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
  'last_login': '2022-01-18T12:34:40.957000Z',
  'is_superuser': True,
  'username': 'admin',
  'first_name': 'Sagar',
  'last_name': 'Sakharkar',
  'is_staff': True,
  'is_active': True,
  'date_joined': '2022-01-08T08:18:26.112000Z',
  'email': 'prafullsakharkar@gmail.com',
  'avatar': 'http://127.0.0.1:8000/media/profile_pics/default.jpg',
  'role': None
}]`}
      </FuseHighlight>
      <hr></hr>

      <Typography className="mb-8" variant="h6">Find a User</Typography>
      <Typography className="mb-16" component="p">
      Building the Query<br></br>
      We are going to assume we know the 'id' of the User we're looking for in this example.<br></br><br></br>
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`id = 1
result = session.find_one('User',  id)`}
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
  'last_login': '2022-01-18T12:34:40.957000Z',
  'is_superuser': True,
  'username': 'admin',
  'first_name': 'Sagar',
  'last_name': 'Sakharkar',
  'is_staff': True,
  'is_active': True,
  'date_joined': '2022-01-08T08:18:26.112000Z',
  'email': 'prafullsakharkar@gmail.com',
  'avatar': 'http://127.0.0.1:8000/media/profile_pics/default.jpg',
  'role': None
}`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      By default, find_one() returns a single dictionary object.
      </Typography>
      <hr></hr>

      <Typography className="mb-8" variant="h6">Update a User</Typography>
      <Typography className="mb-16" component="p">
      Building the data and calling update()<br></br>
      To update an User, you need to provide the id of the User and a list of fields you want to update.<br></br>
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`data = {'is_superuser': False}
result = session.update('User', 1, data)`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      This will update the User object.
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
  'last_login': '2022-01-18T12:34:40.957000Z',
  'is_superuser': False,
  'username': 'admin',
  'first_name': 'Sagar',
  'last_name': 'Sakharkar',
  'is_staff': True,
  'is_active': True,
  'date_joined': '2022-01-08T08:18:26.112000Z',
  'email': 'prafullsakharkar@gmail.com',
  'avatar': 'http://127.0.0.1:8000/media/profile_pics/default.jpg',
  'role': None
}`}
      </FuseHighlight>
      <hr></hr>


      <Typography className="mb-8" variant="h6">Delete a User</Typography>
      <Typography className="mb-16" component="p">
      Calling delete()<br></br>
      Deleting an entity in ase_session is pretty straight-forward. No extraneous uploadfiles required.
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`result = session.delete("User", 1)`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      If the User was deleted successfully result will contain no body but only status code 204.
      </Typography>
    </>
  );
}

export default contactsDoc;