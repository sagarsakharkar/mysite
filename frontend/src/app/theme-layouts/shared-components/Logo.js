import { styled } from '@mui/material/styles';

const Root = styled('div')(({ theme }) => ({
  '& > .logo-icon': {
    transition: theme.transitions.create(['width', 'height'], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  '& > .badge': {
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  '& > .logo': {
    marginBottom: 0,
    maxWidth: 150,
    minHeight: 1,
    // maxHeight: 50,
    display: "block",
    width: "100%",
},
}));

function Logo() {
  return (
    <Root className="flex items-center">
			  {/* <img className="logo" src="static/images/logo/atom.ico" alt="logo" /> */}

        <img className="logo" src="static/images/logo/ase_logo.png" alt="logo" />

    </Root>
  );
}

export default Logo;
