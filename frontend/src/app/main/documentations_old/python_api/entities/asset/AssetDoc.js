import FuseHighlight from '@fuse/core/FuseHighlight';
import Typography from '@mui/material/Typography';

function AssetDoc() {
  return (
    <>
      <Typography variant="h4" className="mb-24">
        Asset
      </Typography>
      <Typography className="mb-8" variant="h6">
        Create a Asset
      </Typography>
      <Typography className="mb-16" component="p">
        Building the data and calling create()
      </Typography>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <Typography className="mb-8 font-500 text-16 text-red">Important:</Typography>
        <ol>
          <li>To create a Asset, you need to provide the following values;</li>
          <li>
            <code>
              <b>name:</b>
            </code>{' '}
            It's the string for name of the asset
          </li>
          <li>
            <code>
              <b>asset_type:</b>
            </code>{' '}
            It's the type of asset
          </li>
          <li>
            <code>
              <b>prefix:</b>
            </code>{' '}
            It's the string set as prefix of the asset
          </li>
          <li>
            <code>
              <b>description:</b>
            </code>{' '}
            It's the description about the asset
          </li>
          <li>
            <code>
              <b>project:</b>
            </code>{' '}
            It's the id of the project it is an asset of.
          </li>
          <li>
            <code>
              <b>episode:</b>
            </code>{' '}
            It's the id of the episode it is connected to
          </li>
          <li>
            <code>
              <b>sequence:</b>
            </code>{' '}
            It's the id of the sequence it is connected to
          </li>
          <li>
            <code>
              <b>shot:</b>
            </code>{' '}
            It's the id of the shot it is connected to
          </li>
        </ol>
      </div>
      <Typography className="mb-16" component="p">
        Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`data = {
  'name': 'dummy',
  'asset_type': 'Prop',
  'prefix': 'dum',
  'description': '',
  'project': 'aaj',
  'episode': None,
  'sequence': None,
  'shot': None
}
result = session.create('Asset', data)`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
        This will create a new Asset named "dummy". Output:
      </Typography>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <ol>
          <li>
            <code>
              <b>data</b>
            </code>{' '}
            is a list of key/value pairs where the key is the column name to update and the value is
            the value to set.
          </li>
          <li>
            <code>
              <b>session</b>
            </code>{' '}
            is the ase API instance you created in ase_session API instance.
          </li>
          <li>
            <code>
              <b>create()</b>
            </code>{' '}
            is the API method in the Session class we are calling. We pass in the entity type we're
            searching for and the data we're setting.
          </li>
        </ol>
      </div>
      <Typography className="mb-16" component="p">
        Output:
        <br />
        The variable result now contains a dictionary hash with the Asset information you created.
      </Typography>
      <FuseHighlight component="pre" className="language-json mb-24">
        {`{
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
}`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
        In addition, ase_session has returned the id that it has assigned to the Asset as well.
      </Typography>
      <hr />

      <Typography className="mb-8" variant="h6">
        Find Multiple Assets
      </Typography>
      <Typography className="mb-16" component="p">
        Building the Query
        <br />
        Suppose we want to find out Asset with prefix as "dum".
        <br />
        <br />
        Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`filters = [{'prefix': 'dum' }]
result = session.find('Asset', filters)
`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
        Pretty simple right? Well here's a little more insight into what's going on.
      </Typography>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <ol>
          <li>
            <code>
              <b>filters</b>
            </code>{' '}
            is a list of filter conditions.
          </li>
          <li>
            <code>
              <b>session</b>
            </code>{' '}
            is the ase API instance you created in ase_session API instance
          </li>
          <li>
            <code>
              <b>find()</b>
            </code>{' '}
            is the API method n the Session class we are calling. We provide it with the entity type
            we're searching for and our filters.
          </li>
        </ol>
      </div>
      <Typography className="mb-16" component="p">
        Output:
        <br />
        So what does this return? The variable result now contains;
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
      <hr />

      <Typography className="mb-8" variant="h6">
        Find a Asset
      </Typography>
      <Typography className="mb-16" component="p">
        Building the Query
        <br />
        We are going to assume we know the 'id' of the Asset we're looking for in this example.
        <br />
        <br />
        Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`id =  "aaj:dummy"
result = session.find_one('Asset', id)
`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
        Pretty simple right? Well here's a little more insight into what's going on.
      </Typography>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <ol>
          <li>
            <code>
              <b>id</b>
            </code>{' '}
            is the id for the object
          </li>
          <li>
            <code>
              <b>session</b>
            </code>{' '}
            is the ase API instance you created in ase_session API instance
          </li>
          <li>
            <code>
              <b>find_one()</b>
            </code>{' '}
            is the API method in the Session class we are calling. We provide it with the entity
            type we're searching for.
          </li>
        </ol>
      </div>
      <Typography className="mb-16" component="p">
        Output:
        <br />
        So what does this return? The variable result now contains;
      </Typography>
      <FuseHighlight component="pre" className="language-json mb-24">
        {`{
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
}`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
        By default, find_one() returns a single dictionary object.
      </Typography>
      <hr />

      <Typography className="mb-8" variant="h6">
        Update a Asset
      </Typography>
      <Typography className="mb-16" component="p">
        Building the data and calling update()
        <br />
        To update a Asset, you need to provide the id of the Asset and a list of fields you want to
        update.
        <br />
        Example:
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        {`data = {'description': 'description of asset'}
result = session.update('Asset', "aaj", data)
`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
        This will update the Asset object.
      </Typography>
      <div className="mb-16 px-12 py-8 border-1 border-red rounded-8">
        <ol>
          <li>
            <code>
              <b>data</b>
            </code>{' '}
            is a list of key/value pairs where the key is the field name to update and the value to
            update it to.
          </li>
          <li>
            <code>
              <b>session</b>
            </code>{' '}
            is the ase API instance you created in ase_session API instance
          </li>
          <li>
            <code>
              <b>update()</b>
            </code>{' '}
            is the API method in the Session class we are calling. We provide it with the entity
            type we're updating, the id of the entity, and the data we're updating it with.
          </li>
        </ol>
      </div>
      <Typography className="mb-16" component="p">
        Output:
        <br />
        The variable result now contains the object that with the updated values.
      </Typography>
      <FuseHighlight component="pre" className="language-json mb-24">
        {`{
  'uid': 'aaj:dummy',
  'name': 'dummy',
  'created_at': '2022-01-18T15:30:43.488000Z',
  'updated_at': '2022-01-18T15:30:43.488000Z',
  'asset_type': 'Prop',
  'prefix': 'dum',
  'description': 'description of asset' ,
  'project': 'aaj',
  'episode': None,
  'sequence': None,
  'shot': None
}`}
      </FuseHighlight>
      <hr />

      <Typography className="mb-8" variant="h6">
        Delete a Asset
      </Typography>
      <Typography className="mb-16" component="p">
        Calling delete()
        <br />
        Deleting an entity in ase_session is pretty straight-forward. No extraneous steps required.
      </Typography>
      <FuseHighlight component="pre" className="language-jsx mb-32">
        result = session.delete("Asset", "aaj:dummy")
      </FuseHighlight>
      <Typography className="mb-16" component="p">
        If the Asset was deleted successfully result will contain no body but only status code 204.
      </Typography>
    </>
  );
}

export default AssetDoc;
