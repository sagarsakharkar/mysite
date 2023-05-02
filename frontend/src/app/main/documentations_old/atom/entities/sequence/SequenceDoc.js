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

function SequenceDoc() {
  const classes = useStyles();
  return (
    <>
      <Typography className="mb-32" component="p">
        From the <code>Top Menu</code> select <code>Projects</code> {'>'} <code>Project Code</code> {'>'} <code>Sequences</code>.
      </Typography>
      <Typography variant="h4" className="mb-24">
        View Sequence
      </Typography>
      <img
        src="static/assets/images/documentation/view_sequence.png"
        alt="view_sequence"
      />
      <Typography variant="h4" className="mb-24">
        Create Sequence
      </Typography>
      <Typography className="mb-32" component="p">
        Click on <div className={clsx(classes.badge, 'breaking')}><Icon>add</Icon></div> button.
      </Typography>
      <img
        src="static/assets/images/documentation/add_new_sequence_button.png"
        alt="add_new_sequence_button"
      />
      <img
        src="static/assets/images/documentation/new_sequence.png"
        alt="new_sequence"
      />
      <Typography className="mb-32" component="p">
        It will shows you <div className={clsx(classes.badge, 'new')}>Description</div>,
        <div className={clsx(classes.badge, 'new')}>Episode</div>,
        <div className={clsx(classes.badge, 'new')}>Range X</div>,
        <div className={clsx(classes.badge, 'new')}>Decimal</div>,
        <div className={clsx(classes.badge, 'new')}>Prefix</div>,
        <div className={clsx(classes.badge, 'new')}>Extension</div>,
        <div className={clsx(classes.badge, 'new')}>Sequence Range</div>.
      </Typography>
      <Typography className="mb-32" component="p">
        <div className={clsx(classes.badge, 'new')}>Description</div> is description for sequence.
      </Typography>
      <Typography className="mb-32" component="p">
        <div className={clsx(classes.badge, 'new')}>Episode</div> select episode for sequence from dropdown.
      </Typography>
      <Typography className="mb-32" component="p">
        <div className={clsx(classes.badge, 'new')}>Range X</div> Range is used to select the range of episodes by (1X, 5X, 10X, 100x) by selecting 5X it shows the range by multiples of 5.
      </Typography>
      <Typography className="mb-32" component="p">
        <div className={clsx(classes.badge, 'new')}>Decimal</div> is to set 3 or 4 digit for sequence.
      </Typography>
      <Typography className="mb-32" component="p">
        <div className={clsx(classes.badge, 'new')}>Prefix</div> is used to add a name or letter to the sequence.
      </Typography>
      <Typography className="mb-32" component="p">
        <div className={clsx(classes.badge, 'new')}>Extension</div> it will be add at end of every sequence.
      </Typography>
      <Typography className="mb-32" component="p">
        <div className={clsx(classes.badge, 'new')}>Episode Range</div> it is slider to create sequence in bulk.
      </Typography>
      <Typography className="mb-32" component="p">
        In the <div className={clsx(classes.badge, 'breaking')}>New Sequence</div> pop-up dialog enter the all required fields and click on <div className={clsx(classes.badge, 'new')}>ADD</div> button.
      </Typography>
      <Typography variant="h4" className="mb-24">
        Edit Sequence
      </Typography>
      <Typography className="mb-32" component="p">
        Click on <div className={clsx(classes.badge, 'breaking')}><Icon>edit</Icon></div> icon for the Sequence you want to edit.
      </Typography>
      <img
        src="static/assets/images/documentation/edit_sequence.png"
        alt="edit_sequence"
      />
      <Typography className="mb-32" component="p">
        In the <div className={clsx(classes.badge, 'breaking')}>Edit Sequence</div> pop-up dialog enter the all required fields and click on <div className={clsx(classes.badge, 'new')}>SAVE</div> button.
      </Typography>
      <Typography variant="h4" className="mb-24">
      Delete Episode
      </Typography>
      <Typography className="mb-32" component="p">
        Click on <div className={clsx(classes.badge, 'breaking')}><Icon>delete</Icon></div> icon for the sequence you want to delete.
      </Typography>
      <Typography variant="h4" className="mb-24">
        Multiple Assets Delete
      </Typography>
      <Typography className="mb-32" component="p">
        Check the <div className={clsx(classes.badge, 'breaking')}><Icon>check_box_outline_blank</Icon></div> Check Boxse for the sequences you want to delete on.
      </Typography>
      <Typography className="mb-32" component="p">
        Than click on<div className={clsx(classes.badge, 'breaking')}><Icon>more_horiz</Icon></div> button which will visible on header bar of table.
      </Typography>
    </>
  );
}

export default SequenceDoc;
