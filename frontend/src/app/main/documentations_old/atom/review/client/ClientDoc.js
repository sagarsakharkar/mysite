import FuseHighlight from '@fuse/core/FuseHighlight';
import Typography from '@mui/material/Typography';

function ClientDoc() {
  return (
    <>
      <Typography variant="h4" className="mb-24">
        Client
      </Typography>
      <Typography className="mb-32" component="p">
        From the <code>Top Menu</code> select <code>Review</code> {'>'} <code>Client</code>.
      </Typography>
    </>
  );
}

export default ClientDoc;
