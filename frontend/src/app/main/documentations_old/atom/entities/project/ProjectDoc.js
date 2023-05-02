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

function ProjectDoc() {
  const classes = useStyles();
  return (
    <>
      <Typography className="mb-32" component="p">
        From the <code>Top Menu</code> select <code>Projects</code> {'>'} <code>Project Code</code> {'>'} <code>Overview</code>.
      </Typography>
      {/* <Typography className="mb-32" component="p">
        And to see all project go to <code>Top Menu</code> select <code>Projects</code> {'>'} <code>Show All</code>.
      </Typography> */}
      <Typography variant="h4" className="mb-24">
        View Project
      </Typography>
      <img
        src="static/assets/images/documentation/view_project.png"
        alt="view_project"
      />
      <Typography variant="h4" className="mb-24">
        Create Project
      </Typography>
      <Typography className="mb-32" component="p">
        Go to <code>Top Menu</code> select <code>Projects</code> {'>'} <code>Show All</code>.
      </Typography>
      <Typography className="mb-32" component="p">
        Click on <div className={clsx(classes.badge, 'breaking')}><Icon>add</Icon></div> button.
      </Typography>
      <img
        src="static/assets/images/documentation/add_new_project_button.png"
        alt="add_new_project_button"
      />
      <img
        src="static/assets/images/documentation/new_project.png"
        alt="new_project"
      />
      <Typography className="mb-32" component="p">
        It display <div className={clsx(classes.badge, 'new')}>Code</div>,
        <div className={clsx(classes.badge, 'new')}>Name</div>,
        <div className={clsx(classes.badge, 'new')}>CG Supervisor</div>,
        <div className={clsx(classes.badge, 'new')}>Start Frame</div>, 
        <div className={clsx(classes.badge, 'new')}>Duration (in days)</div>, 
        <div className={clsx(classes.badge, 'new')}>FPS</div>,
        <div className={clsx(classes.badge, 'new')}>Resolution</div>,
        <div className={clsx(classes.badge, 'new')}>Local Path</div>,
        <div className={clsx(classes.badge, 'new')}>Is Episodic</div>etc.
      </Typography>
      <Typography className="mb-32" component="p">
      <div className={clsx(classes.badge, 'new')}>Code</div> is 3 Capital Latters Code for the project.
      </Typography>
      <Typography className="mb-32" component="p">
      <div className={clsx(classes.badge, 'new')}>Name</div> will be name of the project.
      </Typography>
      <Typography className="mb-32" component="p">
      <div className={clsx(classes.badge, 'new')}>CG Supervisor</div> is the supervisor for that project.
      </Typography>
      <Typography className="mb-32" component="p">
      <div className={clsx(classes.badge, 'new')}>Start Frame</div> will be start frame of project.
      </Typography>
      <Typography className="mb-32" component="p">
      <div className={clsx(classes.badge, 'new')}>Duration</div> will be duration for the project.
      </Typography>
      <Typography className="mb-32" component="p">
      <div className={clsx(classes.badge, 'new')}>FPS</div> Frames Per Sencod for the project.
      </Typography>
      <Typography className="mb-32" component="p">
      <div className={clsx(classes.badge, 'new')}>Resolution</div> is resolution of the project.
      </Typography>
      <Typography className="mb-32" component="p">
      <div className={clsx(classes.badge, 'new')}>Local Path</div> is Local Path of the project.
      </Typography>
      <Typography className="mb-32" component="p">
      <div className={clsx(classes.badge, 'new')}>Is Episodic</div> is toggle for the project contain episodes or not.
      </Typography>
      <Typography className="mb-32" component="p">
        In the <div className={clsx(classes.badge, 'breaking')}>New Project</div> pop-up dialog enter the all required fields and click on <div className={clsx(classes.badge, 'new')}>ADD</div> button.
      </Typography>
      <Typography variant="h4" className="mb-24">
        Edit Project
      </Typography>
      <Typography className="mb-32" component="p">
        Go to <code>INFO</code> tab.
      </Typography>
      <img
        src="static/assets/images/documentation/edit_project_button.png"
        alt="edit_project_button"
      />
      <Typography className="mb-32" component="p">
        Click on <div className={clsx(classes.badge, 'breaking')}><Icon>edit</Icon></div> icon.
      </Typography>
      <img
        src="static/assets/images/documentation/edit_project.png"
        alt="edit_project"
      />
      <Typography className="mb-32" component="p">
        In the <div className={clsx(classes.badge, 'breaking')}>Project</div> pop-up dialog enter the all required fields and click on <div className={clsx(classes.badge, 'new')}>SAVE</div> button.
      </Typography>
    </>
  );
}

export default ProjectDoc;
