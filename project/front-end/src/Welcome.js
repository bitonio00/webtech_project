
/** @jsxImportSource @emotion/react */
// Layout
import { useTheme } from '@mui/styles';
import { Grid, Typography } from '@mui/material';
import { ReactComponent as ChannelIcon } from './icons/channel.svg';
import { ReactComponent as FriendsIcon } from './icons/friends.svg';
import { ReactComponent as SettingsIcon } from './icons/settings.svg';
import FormChannel from './FormChannel';
import {Link} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { borderRadius, fontSize, height } from '@mui/system';

const useStyles = (theme) => ({
  root: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection:'column',
    background: '#E3E2DF',
    color:'#0B0C10',
    borderRadius: 5
  },
  card: {
    textAlign: 'center',
    boxShadow: 'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px',
    borderRadius: 5
  },
  icon: {
    width: '30%',
    fill: '#fff',
  },
  title :{
    height:'50%',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    fontSize:'5em',
    fontWeight :'bold'

  },
 
})

export default function Welcome() {
  const styles = useStyles(useTheme())
  return (
    <div css={styles.root}>
      <div css={styles.title}>
       <span contenteditable="false">react chat app</span>
     
     </div>
     <div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={5}
      >
        <Grid item xs>
          <div css={styles.card}>
          
            <FormChannel />
            <h3>Clik on the image for create a channel :</h3>
            <p>then chose a name and user, a channel will Be create </p>
            <p>in the list at your left</p>
          </div>
        </Grid>
        <Grid item xs>
          <div css={styles.card}>
            <FriendsIcon css={styles.icon} />
            <Typography color="textPrimary">
              Invite friends
            </Typography>
            <h3>when you are in your channel click on the button :</h3>
            <p>you can add all your friends in a channel for chat with them</p>
            <p>you juste have to click on the button and insert your friend name</p>
          </div>
        </Grid>
        <Grid item xs>
          <div css={styles.card}>
          <Link to ='/settings' component={RouterLink}>
            
             <SettingsIcon css={styles.icon} />
               <Typography color="textPrimary">
                 Settings
              </Typography>
              
           </Link>
              <h3>here is your settings :</h3>
              <p>you can change your information and </p>
              <p>chose an avatar</p>
          </div>
        </Grid>
      </Grid>
      </div>
    </div>
  );
}
