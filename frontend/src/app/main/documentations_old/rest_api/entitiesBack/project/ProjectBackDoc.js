import FuseHighlight from '@fuse/core/FuseHighlight';
import Typography from '@mui/material/Typography';

function ProjectBackDoc() {
  return (
    <>
      <Typography variant="h4" className="mb-24">
        Project
      </Typography>
      <Typography className="mb-8" variant="h6">
        Create a Project
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
              <b>localhost:8000/api/v1/entities/projects/</b>
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
  'name': 'aaj',
  'code': 'AAJ',
  'start_date': '2022-01-09',
  'duration': 1,
  'due_date': None,
  'resolution': '4096X2160',
  'start_frame': 101,
  'fps': 24.0,
  'is_episodic': True,
  'is_active': True,
  'local_path': '/ASE/01prj/AAJ',
  'thumbnail': 'http://127.0.0.1:8000/media/project_thumbnails/default.jpg',
  'cg_supervisor': None
}`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
        Response:
      </Typography>
      <FuseHighlight component="pre" className="language-json mb-24">
        {`{
  'uid': 'aaj',
  'name': 'aaj',
  'created_at': '2022-01-09T08:25:47.385000Z',
  'updated_at': '2022-01-13T15:24:21.495000Z',
  'code': 'AAJ',
  'start_date': '2022-01-09',
  'duration': 1,
  'due_date': None,
  'resolution': '4096X2160',
  'start_frame': 101,
  'fps': 24.0,
  'is_episodic': True,
  'is_active': True,
  'local_path': '/ASE/01prj/AAJ',
  'thumbnail': 'http://127.0.0.1:8000/media/project_thumbnails/default.jpg',
  'cg_supervisor': None
}`}
      </FuseHighlight>
      <hr />

      <Typography className="mb-8" variant="h6">
        Find All Projects
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
              <b>localhost:8000/api/v1/entities/projects/</b>
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
  'uid': 'aaj',
  'name': 'aaj',
  'created_at': '2022-01-09T08:25:47.385000Z',
  'updated_at': '2022-01-13T15:24:21.495000Z',
  'code': 'AAJ',
  'start_date': '2022-01-09',
  'duration': 1,
  'due_date': None,
  'resolution': '4096X2160',
  'start_frame': 101,
  'fps': 24.0,
  'is_episodic': True,
  'is_active': True,
  'local_path': '/ASE/01prj/AAJ',
  'thumbnail': 'http://127.0.0.1:8000/media/project_thumbnails/default.jpg',
  'cg_supervisor': None
}]`}
      </FuseHighlight>
      <hr />

      <Typography className="mb-8" variant="h6">
        Find a Project
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
              <b>localhost:8000/api/v1/entities/projects/aaj/</b>
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
  'uid': 'aaj',
  'name': 'aaj',
  'created_at': '2022-01-09T08:25:47.385000Z',
  'updated_at': '2022-01-13T15:24:21.495000Z',
  'code': 'AAJ',
  'start_date': '2022-01-09',
  'duration': 1,
  'due_date': None,
  'resolution': '4096X2160',
  'start_frame': 101,
  'fps': 24.0,
  'is_episodic': True,
  'is_active': True,
  'local_path': '/ASE/01prj/AAJ',
  'thumbnail': 'http://127.0.0.1:8000/media/project_thumbnails/default.jpg',
  'cg_supervisor': None
}`}
      </FuseHighlight>
      <hr />

      <Typography className="mb-8" variant="h6">
        Find filtered Projects
      </Typography>
      <Typography className="mb-16" component="p">
        We can filter objects based on key and value pairs which is concatenated with the URL itself
        with a question mark symbol ( ? ). We don't have to send anything in the request body.
      </Typography>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <Typography className="mb-8 font-500 text-16 text-red">Important:</Typography>
        <ol>
          <li>
            For example, to find all objects with name as "aaj", we take the URL
            <code>
              <b>localhost:8000/api/v1/entities/projects/</b>
            </code>
            Add a{' '}
            <code>
              <b>?</b>
            </code>{' '}
            to it, and then the key values pairs for filtering.
            <br /> URL:{' '}
            <code>
              <b>localhost:8000/api/v1/entities/projects/?name=aaj</b>
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
  'uid': 'aaj',
  'name': 'aaj',
  'created_at': '2022-01-09T08:25:47.385000Z',
  'updated_at': '2022-01-13T15:24:21.495000Z',
  'code': 'AAJ',
  'start_date': '2022-01-09',
  'duration': 1,
  'due_date': None,
  'resolution': '4096X2160',
  'start_frame': 101,
  'fps': 24.0,
  'is_episodic': True,
  'is_active': True,
  'local_path': '/ASE/01prj/AAJ',
  'thumbnail': 'http://127.0.0.1:8000/media/project_thumbnails/default.jpg',
  'cg_supervisor': None
}]`}
      </FuseHighlight>
      <hr />

      <Typography className="mb-8" variant="h6">
        Find Extra data for a Project
      </Typography>
      <Typography className="mb-16" component="p">
        To get some extra data based on the object, we can add the parameters in the URL itself to
        get the parameter data based on that particular object. Below, "aaj" in the URL represents
        the id of object.
      </Typography>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <Typography className="mb-8 font-500 text-16 text-red">Important:</Typography>
        <ol>
          <li>
            URL:{' '}
            <code>
              <b>localhost:8000/api/v1/entities/projects/aaj/users/</b>
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
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <Typography className="mb-8 font-500 text-16 text-red">Important:</Typography>
        <ol>
          <li>
            URL:{' '}
            <code>
              <b>localhost:8000/api/v1/entities/projects/aaj/assets/</b>
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
  'uid': 'aaj:dummy',
  'name': 'dummy',
  'created_at': '2022-01-18T15:30:43.488000Z',
  'updated_at': '2022-01-18T15:30:43.488000Z',
  'asset_type': 'Prop',
  'prefix': 'dum',
  'description': '',
  'project': 'aaj',
  'episode': None,
  'sequence': None,
  'shot': None
}]`}
      </FuseHighlight>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <Typography className="mb-8 font-500 text-16 text-red">Important:</Typography>
        <ol>
          <li>
            URL:{' '}
            <code>
              <b>localhost:8000/api/v1/entities/projects/aaj/episodes/</b>
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
  'uid': 'aaj:EP999',
  'name': 'EP999',
  'created_at': '2022-01-18T15:45:12.456000Z',
  'updated_at': '2022-01-18T15:45:12.456000Z',
  'description': '',
  'project': 'aaj'
}]`}
      </FuseHighlight>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <Typography className="mb-8 font-500 text-16 text-red">Important:</Typography>
        <ol>
          <li>
            URL:{' '}
            <code>
              <b>localhost:8000/api/v1/entities/projects/aaj/sequences/</b>
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
  'uid': 'aaj:EP999:SQ010',
  'name': 'SQ010',
  'created_at': '2022-01-18T16:21:42.831000Z',
  'updated_at': '2022-01-18T16:21:42.831000Z',
  'description': '',
  'project': 'aaj',
  'episode': 'aaj:EP999'
}]`}
      </FuseHighlight>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <Typography className="mb-8 font-500 text-16 text-red">Important:</Typography>
        <ol>
          <li>
            URL:{' '}
            <code>
              <b>localhost:8000/api/v1/entities/projects/aaj/shots/</b>
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
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <Typography className="mb-8 font-500 text-16 text-red">Important:</Typography>
        <ol>
          <li>
            URL:{' '}
            <code>
              <b>localhost:8000/api/v1/entities/projects/aaj/steps/</b>
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
  'uid': 'aaj:EP999:SQ010:SH010:Animation',
  'name': 'Animation',
  'created_at': '2022-01-19T14:51:21.773000Z',
  'updated_at': '2022-01-28T09:18:48.577000Z',
  'bid_days': 0.42,
  'start_date': '2022-01-19T14:51:21.773000Z',
  'end_date': '2022-01-28T09:18:48.578000Z',
  'duration': 1,
  'package': '',
  'retakes': 0,
  'status': 2,
  'priority': 1,
  'project': 'aaj',
  'asset': None,
  'episode': 'aaj:EP999',
  'sequence': 'aaj:EP999:SQ010',
  'shot': 'aaj:EP999:SQ010:SH010'
}]`}
      </FuseHighlight>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <Typography className="mb-8 font-500 text-16 text-red">Important:</Typography>
        <ol>
          <li>
            URL:{' '}
            <code>
              <b>localhost:8000/api/v1/entities/projects/aaj/tasks/</b>
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
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <Typography className="mb-8 font-500 text-16 text-red">Important:</Typography>
        <ol>
          <li>
            URL:{' '}
            <code>
              <b>localhost:8000/api/v1/entities/projects/aaj/versions/</b>
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
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <Typography className="mb-8 font-500 text-16 text-red">Important:</Typography>
        <ol>
          <li>
            URL:{' '}
            <code>
              <b>localhost:8000/api/v1/entities/projects/aaj/notes/</b>
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
      <hr />

      <Typography className="mb-8" variant="h6">
        Update a Project
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
              <b>localhost:8000/api/v1/entities/projects/aaj/</b>
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
  'start_frame': 201
}`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
        Response:
      </Typography>
      <FuseHighlight component="pre" className="language-json mb-24">
        {`{
  'uid': 'aaj',
  'name': 'aaj',
  'created_at': '2022-01-09T08:25:47.385000Z',
  'updated_at': '2022-01-13T15:24:21.495000Z',
  'code': 'AAJ',
  'start_date': '2022-01-09',
  'duration': 1,
  'due_date': None,
  'resolution': '4096X2160',
  'start_frame': 201,
  'fps': 24.0,
  'is_episodic': True,
  'is_active': True,
  'local_path': '/ASE/01prj/AAJ',
  'thumbnail': 'http://127.0.0.1:8000/media/project_thumbnails/default.jpg',
  'cg_supervisor': None
}`}
      </FuseHighlight>
      <hr />

      <Typography className="mb-8" variant="h6">
        Delete a Project
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
              <b>localhost:8000/api/v1/entities/projects/aaj/</b>
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
        Project code: 204 No Content
      </FuseHighlight>
    </>
  );
}

export default ProjectBackDoc;
