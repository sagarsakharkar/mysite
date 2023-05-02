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

function PermisionDoc() {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h4" className="mb-24">
        View Permisions
      </Typography>
      <Typography className="mb-32" component="p">
        From the <code>Top Menu</code> select <code>Users</code> {'>'} <code>Permisions</code>.
      </Typography>
      <img
        src="static/assets/images/documentation/view_permission.png"
        alt="view_permission"
      />
      <Typography variant="h4" className="mb-24">
        Change Permisions
      </Typography>
      <Typography className="mb-32" component="p">
        Select group you want to change permission
      </Typography>
      <Typography className="mb-32" component="p">
      <div className={clsx(classes.badge, 'breaking')}><Icon>check_box</Icon></div> Check and <div className={clsx(classes.badge, 'breaking')}><Icon>check_box_outline_blank</Icon></div> Uncheck according to your requirment.
      </Typography>
      <Typography className="mb-32" component="p">
        Than click on <div className={clsx(classes.badge, 'new')}>CHANGE PERMISSION</div> button.
      </Typography>
    </>
  );
}

export default PermisionDoc;
