/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import axios from 'axios';
import { useContext } from 'react';
//local
import Context from './Context';
import { ReactComponent as ChannelIcon } from './icons/channel.svg';
// Layout
import { Button, outlinedInputClasses, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
    width: '40%',
    fill: '#fff',
  }
})



export default function FormChannel({

}) {
  const { oauth,
    channels, setChannels
  } = useContext(Context)
  const styles = useStyles(useTheme())
  const [channel, setChannel] =useState('');
  const [user,setUser]=useState('');
  const [open, setOpen] = useState(false);
  const channelObj = {
    id : 1,
    name: channel,
    users: [oauth.name,user]
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setChannel("")
    setUser("")
  };

  const onSubmit = async () => {
     await axios.post(
      `http://localhost:3001/channels`,{channel:channelObj},
      {
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      }
    }
   ).then(res => {
    console.log(res)
  })
  
  setChannels([...channels, channelObj])
  handleClose()
  console.log(channels)
  console.log(channelObj)
  
}
  const handleChange = (e) => {
    setChannel(e.target.value);
  };
  const handleChangeUSer = (e) => {
    setUser(e.target.value);
  };
  return (
     <div>
       <Button variant="outlined" onClick={handleClickOpen}>
       <ChannelIcon css={styles.icon} />
       Create channel
      </Button>
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create channel</DialogTitle>
          <DialogContent>
            <TextField
              id="outlined-multiline-flexible"
              label="Channel_Name"
              multiline
              maxRows={4}
              value={channel}
              onChange={handleChange}
             variant="outlined"
           />
           <TextField
              id="user"
              label="user_Name"
              multiline
              maxRows={4}
              value={user}
              onChange={handleChangeUSer}
              variant="outlined"
           />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained"  color="primary" endIcon={<SendIcon />}onClick={onSubmit}>Add a channel</Button>
          </DialogActions>
      </Dialog>
    
  </div>
  )
}
