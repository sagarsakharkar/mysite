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

function TaskDoc() {
  const classes = useStyles();
  return (
    <>
    <Typography className="mb-32" component="p">
        From the <code>Top Menu</code> select <code>Projects</code> {'>'} <code>Project Code</code> {'>'} <code>Tasks</code>.
      </Typography>
      <Typography variant="h4" className="mb-24">
        View Tasks
      </Typography>
      <img
        src="static/assets/images/documentation/view_task.png"
        alt="view_task"
      />
      <Typography variant="h4" className="mb-24">
        Create Task
      </Typography>
      <Typography className="mb-32" component="p">
        Click on <div className={clsx(classes.badge, 'breaking')}><Icon>add</Icon></div> button.
      </Typography>
      <img
        src="static/assets/images/documentation/add_new_task_button.png"
        alt="add_new_task_button"
      />
      <img
        src="static/assets/images/documentation/new_task.png"
        alt="new_task"
      />
      <Typography className="mb-32" component="p">
        It will shows you <div className={clsx(classes.badge, 'new')}>Entity</div>,
        <div className={clsx(classes.badge, 'new')}>Step</div>,
        <div className={clsx(classes.badge, 'new')}>Name</div>,
        <div className={clsx(classes.badge, 'new')}>Assignee</div>,
        <div className={clsx(classes.badge, 'new')}>Bid</div>,
        <div className={clsx(classes.badge, 'new')}>Reviewer</div>,
        <div className={clsx(classes.badge, 'new')}>Status</div>,
        <div className={clsx(classes.badge, 'new')}>Priority</div>.
      </Typography>
      <Typography className="mb-32" component="p">
        <div className={clsx(classes.badge, 'new')}>Assignee</div> here you have to add Assignee name.
      </Typography>
      <Typography className="mb-32" component="p">
        <div className={clsx(classes.badge, 'new')}>Bid</div> is time for that task.
      </Typography>
      <Typography className="mb-32" component="p">
        In the <div className={clsx(classes.badge, 'breaking')}>New Task</div> pop-up dialog enter the all required fields and click on <div className={clsx(classes.badge, 'new')}>ADD</div> button.
      </Typography>
      <Typography variant="h4" className="mb-24">
        Edit Task
      </Typography>
      <Typography className="mb-32" component="p">
        Click on <div className={clsx(classes.badge, 'breaking')}><Icon>edit</Icon></div> icon for the Task you want to edit.
      </Typography>
      <img
        src="static/assets/images/documentation/edit_task.png"
        alt="edit_task"
      />
      <Typography variant="h4" className="mb-24">
        Multiple Task Update
      </Typography>
      <Typography className="mb-32" component="p">
        Check the <div className={clsx(classes.badge, 'breaking')}><Icon>check_box_outline_blank</Icon></div> Check Boxse for the Tasks you want to update on.
      </Typography>
      <Typography className="mb-32" component="p">
        Than click on<div className={clsx(classes.badge, 'breaking')}><Icon>more_horiz</Icon></div> button which will visible on header bar of table.
      </Typography>
      <img
        src="static/assets/images/documentation/multiple_tasks_update.png"
        alt="multiple_tasks_update"
      />
      {/* <Typography variant="h4" className="mb-24">
        Delete Task
      </Typography>
      <Typography className="mb-32" component="p">
        Click on <div className={clsx(classes.badge, 'breaking')}><Icon>delete</Icon></div> icon for the task you want to delete.
      </Typography> */}
      <Typography variant="h4" className="mb-24">
      Single or Multiple Tasks Delete
      </Typography>
      <Typography className="mb-32" component="p">
        Check the <div className={clsx(classes.badge, 'breaking')}><Icon>check_box_outline_blank</Icon></div> Check Boxse for the Tasks you want to delete on.
      </Typography>
      <Typography className="mb-32" component="p">
        Than click on<div className={clsx(classes.badge, 'breaking')}><Icon>more_horiz</Icon></div> button which will visible on header bar of table.
      </Typography>
    </>
  );
}

export default TaskDoc;
