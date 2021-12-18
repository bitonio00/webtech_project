/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import axios from 'axios';
import { useContext } from 'react';
//local
import Context from './Context';
// Layout
import { Button, outlinedInputClasses, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/styles';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const useStyles = (theme) => ({

  icon: {
    width: '100%',
    heigth:'50px',
    fill: '#fff',
  }
})

export default function FormUser({
  channel
}) {

  const [user,setUser]=useState('')
  const [open, setOpen] = useState(false);
  const {oauth}=useContext(Context)
  const styles = useStyles(useTheme())

  const handleClickOpen = () => {
    setOpen(true);
    console.log(channel)
  };
  const handleClose = () => {
    setOpen(false);
    setUser("")
  };

  const onSubmit = async () => {
    channel.users.push(user)
    console.log(channel.users)
    await axios.put(`http://localhost:3001/channels/${channel.id}`,{edited : channel},
      {
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      }
    }
     ).then(res => {
      console.log(res)
    })
    handleClose()

  }
  const handleChange = (e) => {
    const alreadyExist=channel.users.find(user=>user===e.target.value)
    if(!alreadyExist){
      setUser(e.target.value);
    }

  }
  
  return (
    <div>
       <Button varitant='outlined' onClick={handleClickOpen}  style={{width:'100px',height:'100px'}}>
         <GroupAddIcon  fontSize='large'/>
      </Button>

     <Dialog open={open} onClose={handleClose}>
       <DialogTitle> user</DialogTitle>
       <DialogContent>
         <TextField
         id="outlined-multiline-flexible"
         label="User Name"
         multiline
         maxRows={4}
         value={user}
         onChange={handleChange}
         variant="outlined"
        />
       </DialogContent>
       <DialogActions>
         <Button onClick={handleClose}>Cancel</Button>
         <Button variant="contained"  color="primary" endIcon={<SendIcon />}onClick={onSubmit}>Add User</Button>
       </DialogActions>
     </Dialog>

    </div>
  )
}
