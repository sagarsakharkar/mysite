import FuseHighlight from '@fuse/core/FuseHighlight';
import Typography from '@mui/material/Typography';

function VersionBackDoc() {
  return (
    <>
      <Typography variant="h4" className="mb-24">
        Version
      </Typography>
      <Typography className="mb-8" variant="h6">
        Create a Version
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
              <b>localhost:8000/api/v1/entities/versions/</b>
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
 }`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
        Response:
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
      <hr />

      <Typography className="mb-8" variant="h6">
        Find All Versions
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
              <b>localhost:8000/api/v1/entities/versions/</b>
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
      <hr />

      <Typography className="mb-8" variant="h6">
        Find a Version
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
              <b>
                localhost:8000/api/v1/entities/versions/aaj:EP999:SQ010:SH010:Animation:Review_v1/
              </b>
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
      <hr />

      <Typography className="mb-8" variant="h6">
        Find filtered Versions
      </Typography>
      <Typography className="mb-16" component="p">
        We can filter objects based on key and value pairs which is concatenated with the URL itself
        with a question mark symbol ( ? ). We don't have to send anything in the request body.
      </Typography>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <Typography className="mb-8 font-500 text-16 text-red">Important:</Typography>
        <ol>
          <li>
            For example, to find all objects with name as "Review_v1", we take the URL
            <code>
              <b>localhost:8000/api/v1/entities/versions/</b>
            </code>
            Add a{' '}
            <code>
              <b>?</b>
            </code>{' '}
            to it, and then the key values pairs for filtering.
            <br /> URL:{' '}
            <code>
              <b>localhost:8000/api/v1/entities/versions/?name=Review_v1</b>
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
      <hr />

      <Typography className="mb-8" variant="h6">
        Find Extra data for a Version
      </Typography>
      <Typography className="mb-16" component="p">
        To get some extra data based on the object, we can add the parameters in the URL itself to
        get the parameter data based on that particular object. Below,
        "aaj:EP999:SQ010:SH010:Animation:Review_v1" in the URL represents the id of the object.
      </Typography>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <Typography className="mb-8 font-500 text-16 text-red">Important:</Typography>
        <ol>
          <li>
            URL:{' '}
            <code>
              <b>
                localhost:8000/api/v1/entities/versions/aaj:EP999:SQ010:SH010:Animation:Review_v1/notes/
              </b>
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
        Update a Version
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
              <b>
                localhost:8000/api/v1/entities/versions/aaj:EP999:SQ010:SH010:Animation:Review_v1/
              </b>
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
  'version_number': 3
}`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
        Response:
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
      <hr />

      <Typography className="mb-8" variant="h6">
        Delete a Version
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
              <b>
                localhost:8000/api/v1/entities/versions/aaj:EP999:SQ010:SH010:Animation:Review_v1/
              </b>
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
        Version code: 204 No Content
      </FuseHighlight>
    </>
  );
}

export default VersionBackDoc;
