import FuseHighlight from '@fuse/core/FuseHighlight';
import Typography from '@mui/material/Typography';

function LogoutDoc() {
  return (
    <>
      <Typography variant="h6" className="mb-24">
        Logout
      </Typography>
      <Typography className="mb-16" component="p">
        <code>Logout</code> is on the top right.
      </Typography>
      <img
        src="static/assets/images/documentation/logout.png"
        alt="logout"
      /><br></br>
    </>
  );
}

export default LogoutDoc;
