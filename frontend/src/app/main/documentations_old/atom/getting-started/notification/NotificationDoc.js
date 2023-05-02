import FuseHighlight from '@fuse/core/FuseHighlight';
import Typography from '@mui/material/Typography';

function NotificationDoc() {
  return (
    <>
      <Typography variant="h6" className="mb-24">
        Notification
      </Typography>
      <Typography className="mb-16" component="p">
        Any task is assigned to you will notify on the top right.<br></br>
        You can select and start from Notifications by selecting the task it redirects to my tasks.<br></br>
      </Typography>
    </>
  );
}

export default NotificationDoc;
