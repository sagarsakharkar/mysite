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

function PriorityDoc() {
  const classes = useStyles();
  return (
    <>
      <Typography className="mb-32" component="p">
        From the <code>Top Menu</code> menu click on <code>Utilities</code> and select <code>Priority</code>.
      </Typography>
      <Typography variant="h4" className="mb-24">
        View Priority
      </Typography>
      <img
        src="static/assets/images/documentation/view_priority.png"
        alt="view_priority"
      />
      <Typography variant="h4" className="mb-24">
        Create Priority
      </Typography>
      <Typography className="mb-32" component="p">
        Click on <div className={clsx(classes.badge, 'breaking')}><Icon>add</Icon></div> button.
      </Typography>
      <img
        src="static/assets/images/documentation/add_new_priority_button.png"
        alt="add_new_priority_button"
      />
      <img
        src="static/assets/images/documentation/new_priority.png"
        alt="new_priority"
      />
      <Typography className="mb-32" component="p">
        It will shows you <div className={clsx(classes.badge, 'new')}>Name</div>,
        <div className={clsx(classes.badge, 'new')}>Color</div>.
      </Typography>
      <Typography className="mb-32" component="p">
        In the <div className={clsx(classes.badge, 'breaking')}>New Priority</div> pop-up dialog enter the all required fields and click on <div className={clsx(classes.badge, 'new')}>ADD</div> button.
      </Typography>
      <Typography variant="h4" className="mb-24">
        Edit Priority
      </Typography>
      <Typography className="mb-32" component="p">
        Click on <div className={clsx(classes.badge, 'breaking')}><Icon>edit</Icon></div> icon for the priority you want to edit.
      </Typography>
      <img
        src="static/assets/images/documentation/view_priority.png"
        alt="view_priority"
      />
      <Typography variant="h4" className="mb-24">
        Delete Priority
      </Typography>
      <Typography className="mb-32" component="p">
        Click on <div className={clsx(classes.badge, 'breaking')}><Icon>delete</Icon></div> icon for the priority you want to delete.
      </Typography>
      <Typography variant="h4" className="mb-24">
        Multiple Priorities Delete
      </Typography>
      <Typography className="mb-32" component="p">
        Check the <div className={clsx(classes.badge, 'breaking')}><Icon>check_box_outline_blank</Icon></div> Check Boxse for the priorities you want to delete on.
      </Typography>
      <Typography className="mb-32" component="p">
        Than click on<div className={clsx(classes.badge, 'breaking')}><Icon>more_horiz</Icon></div> button which will visible on header bar of table.
      </Typography>
    </>
  );
}

export default PriorityDoc;
