
/** @jsxImportSource @emotion/react */
// Layout
import { useTheme } from '@mui/styles';
import {useContext} from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';
import { Drawer } from '@mui/material';

import { Grid, Typography } from '@mui/material';
import { ReactComponent as ChannelIcon } from './icons/channel.svg';
import { ReactComponent as FriendsIcon } from './icons/friends.svg';
import { ReactComponent as SettingsIcon } from './icons/settings.svg';
import FormChannel from './FormChannel';
import Channels from './Channels';
import Context from './Context'
import FormSettings from './FormSettings'


const useStyles = (theme) => ({
    root: {
      backgroundColor: '#373B44',
      overflow: 'hidden',
      flex: '1 1 auto',
      display: 'flex',
      flexDirection: 'row',
      position: 'relative',
    },
    drawer: {
      width: '200px',
      display: 'none',
    },
    drawerVisible: {
      display: 'block',
    },
    form :{
        display :'flex',
        justifyContent :'center',
        alignItem :'center',
    }
  })

export default function Settings() {
    const {
        // currentChannel, not yet used
        drawerVisible,
      } = useContext(Context)

  const theme = useTheme()
  const styles = useStyles(theme)
  const alwaysOpen = useMediaQuery(theme.breakpoints.up('sm'))
  const isDrawerVisible = alwaysOpen || drawerVisible
  return (
      
    <div css={styles.root}>
        <Drawer
        PaperProps={{ style: { position: 'relative' } }}
        BackdropProps={{ style: { position: 'relative' } }}
        ModalProps={{
          style: { position: 'relative' }
        }}
        variant="persistent"
        open={isDrawerVisible}
        css={[styles.drawer, isDrawerVisible && styles.drawerVisible]}
      >
        <Channels />
      </Drawer>
         <div>
             <h1>Settings</h1>
              <div >
                  <FormSettings/> 
              </div> 
         </div>
    </div>
  );
}
