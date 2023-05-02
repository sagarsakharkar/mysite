import FuseHighlight from '@fuse/core/FuseHighlight';
import Typography from '@mui/material/Typography';

function NotesDoc() {
  return (
    <>
    <Typography className="mb-32" component="p">
        From the <code>Top Menu</code> select <code>Projects</code> {'>'} <code>Project Code</code> {'>'} <code>Notes</code>.
      </Typography>
      <Typography variant="h4" className="mb-24">
        View Notes
      </Typography>
      <img
        src="static/assets/images/documentation/view_notes.png"
        alt="view_notes"
      />
      <Typography variant="h4" className="mb-24">
        Create Notes
      </Typography>
      <Typography className="mb-32" component="p">
        Click to take a note.
      </Typography>
      <img
        src="static/assets/images/documentation/new_notes.png"
        alt="new_notes"
      />
      <Typography className="mb-32" component="p">
        You can add media file here.
      </Typography>
    </>
  );
}

export default NotesDoc;
