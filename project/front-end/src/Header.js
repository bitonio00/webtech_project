
/** @jsxImportSource @emotion/react */
import { useContext,useEffect } from 'react';
// Layout
import { useTheme } from '@mui/styles';
import { IconButton, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button} from '@mui/material';
import Context from './Context';
import Gravatar from 'react-gravatar'
import { Avatar } from '@mui/material';

const useStyles = (theme) => ({
  header: {
    padding: theme.spacing(1),
    backgroundColor: 'rgba(255,255,255,.3)',
    flexShrink: 0,
    display:'flex',
    border:'solid',
    justifyContent:'space-between'
    
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
    drawerVisible, setDrawerVisible,avatarUser,setAvatarUser,gravatar
  } = useContext(Context)
  const drawerToggle = (e) => {
    setDrawerVisible(!drawerVisible)
  }
  const onClickLogout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }
  useEffect( () => {
    const fetch = async () => {
      if(oauth)
      setAvatarUser(oauth.username)
    }
    fetch()
  }, [avatarUser,gravatar])
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
  </div>
  <div>
      {(() => {
        if (  gravatar && oauth ) {
          return (
            
            <div style={{display:'flex'}}>
              <Gravatar email={oauth.email} />
              <p>{oauth.name}</p>
            </div>

          )
        } else if (avatarUser && oauth) {
          return (
            <div style={{display:'flex'}}>
            <Avatar src={avatarUser}/>
            <p>{oauth.name}</p>
            </div>
          )
        }
        else {
          {
            <span></span>
          }
        }
      })()}

  </div>
  <div>
      {
        oauth ?
          <span>
            
            <Button variant='contained' onClick={onClickLogout}>logout <LogoutIcon/></Button>
          </span>
        :
          <span>new user</span>
      }
</div>
     

    
    </header>
  );
}
