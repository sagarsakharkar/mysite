import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/material';
import { blue, green, red } from '@mui/material/colors';
import clsx from 'clsx';
import Icon from '@mui/material/Icon';

const useStyles = makeStyles((theme) => ({
  badge: {
    display: 'inline-flex',
    fontSize: 13,
    color: '#FFF',
    letterSpacing: '.015em',
    lineHeight: 1,
    padding: '5px 8px',
    borderRadius: 2,
    '&.new': {
      backgroundColor: green[500],
    },
    '&.fix': {
      backgroundColor: blue[500],
    },
    '&.breaking': {
      backgroundColor: red[500],
    },
  },
}));

function EmailDoc() {
  const classes = useStyles();
  return (
    <>
    <Typography className="mb-32" component="p">
        From the <code>Top Menu</code> select <code>Settings</code> {'>'} <code>Email</code>.
      </Typography>
      <Typography variant="h4" className="mb-24">
        View Email
      </Typography>
      <img
        src="static/assets/images/documentation/view_email.png"
        alt="view_email"
      />
      <Typography className="mb-32" component="p">
        Here you can drag-drop Email Id's in To or CC according to your requirment.
      </Typography>
      <Typography className="mb-32" component="p">
        Click on <div className={clsx(classes.badge, 'breaking')}>ADD</div> button.
      </Typography>
    </>
  );
}

export default EmailDoc;
