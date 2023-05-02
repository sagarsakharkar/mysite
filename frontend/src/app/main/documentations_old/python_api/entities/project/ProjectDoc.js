import React from 'react';
import FuseHighlight from '@fuse/core/FuseHighlight';
import Typography from '@mui/material/Typography';

function ProjectDoc() {
  return (
    <>
      <Typography variant="h4" className="mb-24">Project</Typography>
      <Typography className="mb-8" variant="h6">Create a Project</Typography>
      <Typography className="mb-16" component="p">
      Building the data and calling create()<br></br>
      </Typography>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <Typography className="mb-8 font-500 text-16 text-red">Important:</Typography>
        <ol>
          <li>To create a Project, you need to provide the following values;</li>
          <li><code><b>name:</b></code> It's the string for name of the project</li>
          <li><code><b>code:</b></code> It's the string for code name of the project</li>
          <li><code><b>start_date:</b></code> It's the start date of the project</li>
          <li><code><b>duration:</b></code> It's the duration of the project</li>
          <li><code><b>due_date:</b></code>  It's the due date for the project</li>
          <li><code><b>resolution:</b></code> It's the string representing the resolution of the project</li>
          <li><code><b>start_frame:</b></code> It's the start of frame for the project</li>
          <li><code><b>fps:</b></code> It represents frame per second of the project</li>
          <li><code><b>is_episodic:</b></code> It's boolean representing whether project is episodic or not</li>
          <li><code><b>is_active:</b></code>  It's boolean representing whether project is active or not</li>
          <li><code><b>local_path:</b></code> It's the local path where the project is stored</li>
        </ol>
      </div>
      <Typography className="mb-16" component="p">
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`data = {'
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
  'local_path': '/ASE/01prj/AAJ'
}
result = session.create('Project', data)`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      This will create a new Project named "AAJ".
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
      The variable result now contains a dictionary hash with the Project information you created.
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
      <Typography className="mb-16" component="p">
        In addition, ase_session has returned the id that it has assigned to the Project as well.
      </Typography>

      <hr></hr>

      <Typography className="mb-8" variant="h6">Find Multiple Projects</Typography>
      <Typography className="mb-16" component="p">
      Building the Query<br></br>
      Suppose we want to find out Project with name as "aaj".<br></br><br></br>
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`filters = [{'name': 'aaj' }]
result = session.find('Project', filters)
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
        {`[{'uid': 'aaj',
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
      <hr></hr>

      <Typography className="mb-8" variant="h6">Find a Project</Typography>
      <Typography className="mb-16" component="p">
      Building the Query<br></br>
      We are going to assume we know the 'id' of the Project we're looking for in this example.<br></br><br></br>
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`id = "aaj"
result = session.find_one('Project',  id)
`}
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
      <Typography className="mb-16" component="p">
      By default, find_one() returns a single dictionary object.
      </Typography>
      <hr></hr>

      <Typography className="mb-8" variant="h6">Update a Project</Typography>
      <Typography className="mb-16" component="p">
      Building the data and calling update()<br></br>
      To update a Project, you need to provide the id of the Project and a list of fields you want to update.<br></br>
      Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`data = {"duration": 3}
result = session.update("Project", "aaj", data)`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      This will update the Project object.
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
      <hr></hr>


      <Typography className="mb-8" variant="h6">Delete a Project</Typography>
      <Typography className="mb-16" component="p">
      Calling delete()<br></br>
      Deleting an entity in ase_session is pretty straight-forward. No extraneous steps required.
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`result = session.delete("Project", "aaj")`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
      If the Project was deleted successfully result will contain no body but only status code 204.
      </Typography>
    </>
  );
}

export default ProjectDoc;
