
/** @jsxImportSource @emotion/react */
import {useContext, useEffect} from 'react';
import axios from 'axios';
// Layout
import {Link} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// Local
import Context from './Context'
import {useNavigate} from 'react-router-dom'

import { List } from '@mui/material';
import { ListItem } from '@mui/material';
import { ListItemIcon } from '@mui/material';
import { ListItemText } from '@mui/material';

const styles = {
  root: {
    '& a': {
      padding: '.2rem .5rem',
      whiteSpace: 'nowrap', 
    }
  },
}

export default function Channels() {
  const {
    oauth,
    channels, setChannels
  } = useContext(Context)
  const naviate = useNavigate();
  useEffect( () => {console.log('yo')
    const fetch = async () => {
      try{
        const {data: channels} = await axios.get('http://localhost:3001/channels', {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })
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
      <ListItem>
       <li css={styles.channel}>
         <Link to="/channels" component={RouterLink}>Welcome</Link>
       </li>
      </ListItem>
      { channels.map( (channel, i) => (
        <ListItem>
        <li key={i} css={styles.channel}>
          <Link
            href={`/channels/${channel.id}`}
            onClick={ (e) => {
              e.preventDefault()
              naviate(`/channels/${channel.id}`)
            }}
          >
            {channel.name}
          </Link>
        </li>
      </ListItem>))}
    </ul>
    </List>
  );
}
