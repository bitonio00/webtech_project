
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

const useStyles = (theme) => ({
  root: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    // background: 'rgba(0,0,0,.2)',
  },
  card: {
    textAlign: 'center',
  },
  icon: {
    width: '30%',
    fill: '#fff',
  }
})

export default function Welcome() {
  const styles = useStyles(useTheme())
  return (
    <div css={styles.root}>
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
          </div>
        </Grid>
        <Grid item xs>
          <div css={styles.card}>
            <FriendsIcon css={styles.icon} />
            <Typography color="textPrimary">
              Invite friends
            </Typography>
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
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
