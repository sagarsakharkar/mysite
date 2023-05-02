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

function GroupDoc() {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h4" className="mb-24">
        View Groups
      </Typography>
      <Typography className="mb-32" component="p">
        From the <code>Top Menu</code> select <code>Users</code> {'>'} <code>Groups</code>.
      </Typography>
      <img
        src="static/assets/images/documentation/view_group.png"
        alt="view_group"
      />
      <Typography variant="h4" className="mb-24">
        Create Groups
      </Typography>
      <Typography className="mb-32" component="p">
        Click on <div className={clsx(classes.badge, 'breaking')}><Icon>add</Icon></div> button.
      </Typography>
      <img
        src="static/assets/images/documentation/add_new_group_buuton.png"
        alt="add_new_group_buuton"
      />
      <img
        src="static/assets/images/documentation/new_group.png"
        alt="new_group"
      />
      <Typography className="mb-32" component="p">
        It will shows you <div className={clsx(classes.badge, 'new')}>Name</div>,
        <div className={clsx(classes.badge, 'new')}>Description</div>,
        <div className={clsx(classes.badge, 'new')}>Is Role Group</div> toggle.
      </Typography>
      <Typography className="mb-32" component="p">
        <div className={clsx(classes.badge, 'new')}>Description</div> will be group description.
      </Typography>
      <Typography className="mb-32" component="p">
        <div className={clsx(classes.badge, 'new')}>Is Role Group</div> Is Role Group.
      </Typography>
      <Typography className="mb-32" component="p">
        In the <div className={clsx(classes.badge, 'breaking')}>New Group</div> pop-up dialog enter the all required fields and click on <div className={clsx(classes.badge, 'new')}>ADD</div> button.
      </Typography>
      <Typography variant="h4" className="mb-24">
        Edit Group
      </Typography>
      <Typography className="mb-32" component="p">
        Click on <div className={clsx(classes.badge, 'breaking')}><Icon>edit</Icon></div> icon for the group you want to edit.
      </Typography>
      <img
        src="static/assets/images/documentation/edit_group.png"
        alt="edit_group"
      />
      <Typography className="mb-32" component="p">
        In the <div className={clsx(classes.badge, 'breaking')}>Edit Group</div> pop-up dialog enter the all required fields and click on <div className={clsx(classes.badge, 'new')}>SAVE</div> button.
      </Typography>
      <Typography variant="h4" className="mb-24">
        Delete Group
      </Typography>
      <Typography className="mb-32" component="p">
        Click on <div className={clsx(classes.badge, 'breaking')}><Icon>delete</Icon></div> icon for the group you want to delete.
      </Typography>
      <Typography variant="h4" className="mb-24">
        Delete Multiple Groups
      </Typography>
      <Typography className="mb-32" component="p">
        Check the <div className={clsx(classes.badge, 'breaking')}><Icon>check_box_outline_blank</Icon></div> Check Boxse for the groups you want to delete on.
      </Typography>
      <Typography className="mb-32" component="p">
        Than click on<div className={clsx(classes.badge, 'breaking')}><Icon>more_horiz</Icon></div> button which will visible on header bar of table.
      </Typography>
    </>
  );
}

export default GroupDoc;
