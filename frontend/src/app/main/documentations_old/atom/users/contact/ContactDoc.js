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

function ContactDoc() {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h4" className="mb-24">
        View Contacts
      </Typography>
      <Typography className="mb-32" component="p">
        From the <code>Top Menu</code> select <code>Users</code> {'>'} <code>Contacts</code>.
      </Typography>
      <img
        src="static/assets/images/documentation/view_account.png"
        alt="view_account"
      />
      <Typography variant="h4" className="mb-24">
        Create Contacts
      </Typography>
      <Typography className="mb-32" component="p">
        Click on <div className={clsx(classes.badge, 'breaking')}><Icon>add</Icon></div> button.
      </Typography>
      <img
        src="static/assets/images/documentation/add_new_account_button.png"
        alt="add_new_account_button"
      />
      <img
        src="static/assets/images/documentation/new_account.png"
        alt="new_account"
      />
      <Typography className="mb-32" component="p">
        It will shows you <div className={clsx(classes.badge, 'new')}>User Name</div>,
        <div className={clsx(classes.badge, 'new')}>Fisrt Name</div>,
        <div className={clsx(classes.badge, 'new')}>Last Name</div>,
        <div className={clsx(classes.badge, 'new')}>Role</div> dropdown,
        <div className={clsx(classes.badge, 'new')}>Email</div>,
        <div className={clsx(classes.badge, 'new')}>Is Active</div> toggle.
      </Typography>
      <Typography className="mb-32" component="p">
      <div className={clsx(classes.badge, 'new')}>Role</div> is for role of the user.
      </Typography>
      <Typography className="mb-32" component="p">
      <div className={clsx(classes.badge, 'new')}>Role</div> is for user is active or not.
      </Typography>
      <Typography className="mb-32" component="p">
        In the <div className={clsx(classes.badge, 'breaking')}>New Account</div> pop-up dialog enter the all required fields and click on <div className={clsx(classes.badge, 'new')}>ADD</div> button.
      </Typography>
      <Typography variant="h4" className="mb-24">
        Edit Contacts
      </Typography>
      <Typography className="mb-32" component="p">
        Click on <div className={clsx(classes.badge, 'breaking')}><Icon>edit</Icon></div> icon for the account you want to edit.
      </Typography>
      <img
        src="static/assets/images/documentation/edit_account.png"
        alt="edit_account"
      />
      <Typography className="mb-32" component="p">
        In the <div className={clsx(classes.badge, 'breaking')}>Edit Account</div> pop-up dialog enter the all required fields and click on <div className={clsx(classes.badge, 'new')}>SAVE</div> button.
      </Typography>
      <Typography variant="h4" className="mb-24">
        Change Password
      </Typography>
      <Typography className="mb-32" component="p">
        Click on <div className={clsx(classes.badge, 'breaking')}><Icon>vpn_key</Icon></div> icon for the account you want to change password.
      </Typography>
      <img
        src="static/assets/images/documentation/change_account_password.png"
        alt="change_account_password"
      />
      <Typography className="mb-32" component="p">
        Enter new password and click on <div className={clsx(classes.badge, 'new')}>CHANGE</div> button.
      </Typography>
      <Typography variant="h4" className="mb-24">
        Delete Account
      </Typography>
      <Typography className="mb-32" component="p">
        Check the <div className={clsx(classes.badge, 'breaking')}><Icon>check_box_outline_blank</Icon></div> Check Box for the account you want to delete on.
        {/* check_box */}
      </Typography>
      <Typography className="mb-32" component="p">
        Than click on<div className={clsx(classes.badge, 'breaking')}><Icon>more_horiz</Icon></div> button which will visible on header bar of table.
      </Typography>
      <Typography className="mb-32" component="p">
        You will see option to remove.
      </Typography>
      <Typography variant="h4" className="mb-24">
      Delete multiple accounts
      </Typography>
      <Typography className="mb-32" component="p">
        Check the <div className={clsx(classes.badge, 'breaking')}><Icon>check_box_outline_blank</Icon></div> Check Boxse for the accounts you want to delete on.
      </Typography>
      <Typography className="mb-32" component="p">
        Than click on<div className={clsx(classes.badge, 'breaking')}><Icon>more_horiz</Icon></div> button which will visible on header bar of table.
      </Typography>
    </>
  );
}

export default ContactDoc;
