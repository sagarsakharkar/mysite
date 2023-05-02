import FuseHighlight from '@fuse/core/FuseHighlight';
import Typography from '@mui/material/Typography';

function LoginBackDoc() {
  return (
    <>
      <Typography variant="h4" className="mb-24">
        Python API: Login
      </Typography>
      <Typography variant="h6" className="mb-24">
        Create authentication token/login
      </Typography>
      <Typography className="mb-16" component="p">
        We assume we have a user already created with username as "admin" and password as "admin".
        We use these credentials to create the jwt token.
        <br />
        URL: localhost:8000/auth/jwt/create/ <br />
        Method type: POST
        <br />
        <br />
        Request body:
      </Typography>
      <FuseHighlight component="pre" className="language-json mb-24">
        {`{
  "username" : "admin",
  "password" : "admin"
}`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
        Response:
      </Typography>
      <FuseHighlight component="pre" className="language-json mb-24">
        {`{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY0NTM5MDY4NSwianRpIjoiMTk3ODI0NjhiODE1NDcxZDgzYmNmMmE2OTI2MTBmMDAiLCJ1c2VyX2lkIjoxfQ.yC7jTZX9Veer72DD2nkmB2MAwNkL9w0jqOYlffA-63g",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQzNzcwNjg1LCJqdGkiOiI5ZmFjZTJiZDUxYjg0ODc0YTIwZjg0YjIzNzE0YzgxZiIsInVzZXJfaWQiOjF9.sizRsKeo8YkAoqnLTR7GXrEGnR_JiojNMAPgwAO9rk4"
}`}
      </FuseHighlight>
      <Typography className="mb-16" component="p">
        We set this access token in Authorization tab as Bearer token.
      </Typography>
    </>
  );
}

export default LoginBackDoc;
