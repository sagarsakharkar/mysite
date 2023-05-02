import FuseHighlight from '@fuse/core/FuseHighlight';
import Typography from '@mui/material/Typography';

function LoginDoc() {
  return (
    <>
      <Typography variant="h4" className="mb-24">
        ATOM: Login
      </Typography>

      <Typography className="mb-8" variant="h5">
        Overview
      </Typography>

      <Typography className="mb-16" component="p">
        Before being allowed to use the site ATOM, you will be asked to login.<br></br> The login screen for the ATOM asks for a username and password. Your username and password will be provided by your HR/Team Lead
      </Typography>

      <Typography className="mt-32 mb-8" variant="h6">
        Login to the ATOM
      </Typography>

      <Typography className="mb-16" component="p">
        Enter your Username and Password<br></br>
        Click the <code>Login</code> button to get access to the ATOM.<br></br>
        After logged in ATOM, you will be redirected to respective pages based on your role i.e., if you are a <code>Supervisor</code>,<code>Co-ordinator</code> or <code>Artist</code>.<br></br>
      </Typography>
      <img
        src="static/assets/images/documentation/login.png"
        alt="login"
      /><br></br>
    </>
  );
}

export default LoginDoc;
