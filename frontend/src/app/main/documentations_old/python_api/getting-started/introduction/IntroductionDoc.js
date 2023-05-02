import FuseHighlight from '@fuse/core/FuseHighlight';
import Typography from '@mui/material/Typography';

function IntroductionDoc() {
  return (
    <>
      <Typography variant="h6" className="mb-24">
        Create a ase_session API instance
      </Typography>

      <Typography className="mb-16" component="p">
        This example shows you how to establish your initial connection to ase_session using jwt
        authentication. session represents your ase_session API instance.
      </Typography>
      <FuseHighlight component="pre" className="language-json mb-24">
        session = ase_session.Session('admin', 'adminPass@123')
      </FuseHighlight>
    </>
  );
}

export default IntroductionDoc;
