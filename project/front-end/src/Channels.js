
/** @jsxImportSource @emotion/react */
import {useContext, useEffect} from 'react';
import axios from 'axios';
// Layout
import {Link, listClasses, ListItemButton} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// Local
import Context from './Context'
import {useNavigate} from 'react-router-dom'
import CommentIcon from '@mui/icons-material/Comment';
import { List } from '@mui/material';
import { ListItem } from '@mui/material';
import { ListItemIcon } from '@mui/material';
import { ListItemText } from '@mui/material';

const styles = {
  root: {
    '& a': {
      padding: '.2rem .5rem',
      whiteSpace: 'nowrap',

    },

  },
}

export default function Channels() {
  const {
    oauth,
    channels, setChannels,setAvatarUser
  } = useContext(Context)
  const navigate = useNavigate();
  useEffect( () => {console.log('yo')
    const fetch = async () => {
      try{
          console.log('fetch:channels')
        const {data: channels} = await axios.get(`http://localhost:3001/channels/${oauth.name}`, {
         headers: {
            'Authorization': `Bearer ${oauth.access_token}`,
            'Email':oauth.email
          }
        })
        setAvatarUser(oauth.name)
        setChannels(channels)
      }catch(err){
        console.error(err)
      }
    }
    fetch()
  }, [oauth, setChannels])
  return (
    <List>
    <ul css={styles.root}>
      <ListItem  button css={styles.channel}>

         <Link to="/channels" component={RouterLink}>Welcome</Link>

      </ListItem>
      { channels.map( (channel, i) => (
       console.log(channel.users),
        <ListItem  button key={i} css={styles.channel}>
          <ListItemButton variant="outlined">
          <Link
            href={`/channels/${channel.id}`}
            onClick={ (e) => {
              e.preventDefault()
              navigate(`/channels/${channel.id}`)
            }}
          >
            {channel.name}
          </Link>
          <ListItemIcon edge='end' aria-label="comments">
            <CommentIcon/>
          </ListItemIcon>
          </ListItemButton>
      </ListItem>
      ))}
    </ul>
    </List>
  );
}
