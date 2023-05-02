import FuseHighlight from '@fuse/core/FuseHighlight';
import Typography from '@mui/material/Typography';

function InternalDoc() {
  return (
    <>
      <Typography variant="h4" className="mb-24">
        Internal
      </Typography>
      <Typography className="mb-32" component="p">
      From the <code>Top Menu</code> select <code>Review</code> {'>'} <code>Internal</code>.
      </Typography>
    </>
  );
}

export default InternalDoc;
