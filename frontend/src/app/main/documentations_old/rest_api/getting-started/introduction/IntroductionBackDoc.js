import Typography from '@mui/material/Typography';

function IntroductionBackDoc() {
  return (
    <>
      <Typography variant="h4" className="mb-24">
        Atom back-end documentation
      </Typography>
      <Typography className="mb-16" component="p">
        Atom api is organized around REST. Our API has predictable resource-oriented URLs, accepts
        form-encoded request bodies and JSON, returns JSON-encoded responses, and uses standard HTTP
        response codes, authentication, and verbs. <br />
        To work around with most url endpoints, user must use JWT authentication to get the tokens.
        We can use any Api client to work with. We will use POSTMAN for all the examples below.
      </Typography>
    </>
  );
}

export default IntroductionBackDoc;
