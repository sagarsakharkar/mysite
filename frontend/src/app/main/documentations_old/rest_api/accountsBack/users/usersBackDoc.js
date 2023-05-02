import FuseHighlight from '@fuse/core/FuseHighlight';
import Typography from '@mui/material/Typography';

function contactsBackDoc() {
  return (
    <>
      <Typography variant="h4" className="mb-24">
        User
      </Typography>
      <Typography className="mb-8" variant="h6">
        Create a User
      </Typography>
      <Typography className="mb-16" component="p">
        In request body we send the data we want to set for the object. And in response body we get
        the complete details of the object created.
      </Typography>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <Typography className="mb-8 font-500 text-16 text-red">Important:</Typography>
        <ol>
          <li>
            URL:{' '}
            <code>
              <b>localhost:8000/api/v1/users/accounts/</b>
            </code>
          </li>
          <li>
            Method type:{' '}
            <code>
              <b>POST</b>
            </code>
          </li>
        </ol>
      </div>
      <Typography className="mb-16" component="p">
        Request:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`{
  'is_superuser': True,
  'username': 'admin',
  'first_name': 'Sagar',
  'last_name': 'Sakharkar',
  'is_staff': True,
  'is_active': True,
  'email': 'prafullsakharkar@gmail.com'
}`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
        Response:
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
      <hr />

      <Typography className="mb-8" variant="h6">
        Find All Users
      </Typography>
      <Typography className="mb-16" component="p">
        To get the list of objects, we don't send anything in the request body. We just have to hit
        the URL with GET method.
      </Typography>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <Typography className="mb-8 font-500 text-16 text-red">Important:</Typography>
        <ol>
          <li>
            URL:{' '}
            <code>
              <b>localhost:8000/api/v1/users/accounts/</b>
            </code>
          </li>
          <li>
            Method type:{' '}
            <code>
              <b>GET</b>
            </code>
          </li>
        </ol>
      </div>
      <Typography className="mb-16" component="p">
        Request:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`{
}`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
        Response:
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
      <hr />

      <Typography className="mb-8" variant="h6">
        Find a User
      </Typography>
      <Typography className="mb-16" component="p">
        To get the details of a single object, we use the id of the object in the URL itself. We
        don't need anything in the request body.
      </Typography>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <Typography className="mb-8 font-500 text-16 text-red">Important:</Typography>
        <ol>
          <li>
            URL:{' '}
            <code>
              <b>localhost:8000/api/v1/users/accounts/1/</b>
            </code>
          </li>
          <li>
            Method type:{' '}
            <code>
              <b>GET</b>
            </code>
          </li>
        </ol>
      </div>
      <Typography className="mb-16" component="p">
        Request:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`{
}`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
        Response:
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
      <hr />

      <Typography className="mb-8" variant="h6">
        Find filtered User
      </Typography>
      <Typography className="mb-16" component="p">
        We can filter objects based on key and value pairs which is concatenated with the URL itself
        with a question mark symbol ( ? ). We don't have to send anything in the request body.
      </Typography>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <Typography className="mb-8 font-500 text-16 text-red">Important:</Typography>
        <ol>
          <li>
            For example, to find all objects with username as "admin", we take the URL
            <code>
              <b>localhost:8000/api/v1/users/accounts/</b>
            </code>
            Add a{' '}
            <code>
              <b>?</b>
            </code>{' '}
            to it, and then the key values pairs for filtering.
            <br /> URL:{' '}
            <code>
              <b>localhost:8000/api/v1/users/accounts/?username=admin</b>
            </code>
          </li>
          <li>
            Method type:{' '}
            <code>
              <b>GET</b>
            </code>
          </li>
        </ol>
      </div>
      <Typography className="mb-16" component="p">
        Request:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`{
}`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
        Response:
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
      <hr />

      <Typography className="mb-8" variant="h6">
        Find extra data for a User
      </Typography>
      <Typography className="mb-16" component="p">
        To get some extra data based on the object, we can add the parameters in the URL itself to
        get the parameter data based on that particular object. Below, 1 in the URL represents the
        id of the object.
      </Typography>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <Typography className="mb-8 font-500 text-16 text-red">Important:</Typography>
        <ol>
          <li>
            URL:{' '}
            <code>
              <b>localhost:8000/api/v1/users/accounts/1/groups/</b>
            </code>
          </li>
          <li>
            Method type:{' '}
            <code>
              <b>GET</b>
            </code>
          </li>
        </ol>
      </div>
      <Typography className="mb-16" component="p">
        Request:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`{
}`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
        Response:
      </Typography>
      <FuseHighlight component="pre" className="language-json mb-24">
        {`[{
  "id":1,
  "name":"group1"
}]`}
      </FuseHighlight>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <Typography className="mb-8 font-500 text-16 text-red">Important:</Typography>
        <ol>
          <li>
            URL:{' '}
            <code>
              <b>localhost:8000/api/v1/users/accounts/1/permissions/</b>
            </code>
          </li>
          <li>
            Method type:{' '}
            <code>
              <b>GET</b>
            </code>
          </li>
        </ol>
      </div>
      <Typography className="mb-16" component="p">
        Request:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`{
}`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
        Response:
      </Typography>
      <FuseHighlight component="pre" className="language-json mb-24">
        {`[{
  "id":18,
  "name":"Can change user group",
  "content_type_id":5,
  "codename":"change_usergroup"
}]`}
      </FuseHighlight>
      <hr />

      <Typography className="mb-8" variant="h6">
        Update a User
      </Typography>
      <Typography className="mb-16" component="p">
        To update any record of the object, we pass only the key and value data in the request body
        that needs to be updated.
      </Typography>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <Typography className="mb-8 font-500 text-16 text-red">Important:</Typography>
        <ol>
          <li>
            URL:{' '}
            <code>
              <b>localhost:8000/api/v1/users/accounts/1/</b>
            </code>
          </li>
          <li>
            Method type:{' '}
            <code>
              <b>PATCH</b>
            </code>
          </li>
        </ol>
      </div>
      <Typography className="mb-16" component="p">
        Request:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`{
  'is_active': False
}`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
        Response:
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
  'is_active': False,
  'date_joined': '2022-01-08T08:18:26.112000Z',
  'email': 'prafullsakharkar@gmail.com',
  'avatar': 'http://127.0.0.1:8000/media/profile_pics/default.jpg',
  'role': None
}`}
      </FuseHighlight>
      <hr />

      <Typography className="mb-8" variant="h6">
        Delete a User
      </Typography>
      <Typography className="mb-16" component="p">
        To update any record of the object, we pass only the key and value data in the request body
        that needs to be updated. To delete an object, we use the id of the object in the URL. We
        don't send any data in the request body. Also with successful deletion of the object, we
        don't get in data but just status code of 204.
      </Typography>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <Typography className="mb-8 font-500 text-16 text-red">Important:</Typography>
        <ol>
          <li>
            URL:{' '}
            <code>
              <b>localhost:8000/api/v1/users/accounts/1/</b>
            </code>
          </li>
          <li>
            Method type:{' '}
            <code>
              <b>DELETE</b>
            </code>
          </li>
        </ol>
      </div>
      <Typography className="mb-16" component="p">
        Request:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`{
}`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
        Response:
      </Typography>
      <FuseHighlight component="pre" className="language-json mb-24">
        Status code: 204 No Content
      </FuseHighlight>
    </>
  );
}

export default contactsBackDoc;
