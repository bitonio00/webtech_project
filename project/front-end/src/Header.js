
/** @jsxImportSource @emotion/react */
import { useContext } from 'react';
// Layout
import { useTheme } from '@mui/styles';
import { IconButton, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button} from '@mui/material';
import Context from './Context';

const useStyles = (theme) => ({
  header: {
    padding: theme.spacing(1),
    backgroundColor: 'rgba(255,255,255,.3)',
    flexShrink: 0,
    display:'flex',
    JustifyContent:'space-between'
  },
  headerLogIn: {
    backgroundColor: 'red',
  },
  headerLogOut: {
    backgroundColor: 'blue',
  },
  menu: {
    [theme.breakpoints.up('sm')]: {
      display: 'none !important',
    },
  }
})

export default function Header({
  drawerToggleListener
}) {
  const styles = useStyles(useTheme())
  const {
    oauth, setOauth,
    drawerVisible, setDrawerVisible
  } = useContext(Context)
  const drawerToggle = (e) => {
    setDrawerVisible(!drawerVisible)
  }
  const onClickLogout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }
  return (
    <header css={styles.header}>
      <div>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={drawerToggle}
        css={styles.menu}
      >
        <MenuIcon />
      </IconButton>
      Header</div>
      <div>
      {
        oauth ?
          <span>
            {oauth.email}
            {oauth.name}
            <Button variant='contained' onClick={onClickLogout}>logout <LogoutIcon/></Button>
          </span>
        :
          <span>new user</span>
      }
      </div>
    </header>
  );
}
