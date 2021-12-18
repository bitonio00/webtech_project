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
import { List } from '@mui/material';
import { ListItem } from '@mui/material';
import { ListItemText } from '@mui/material';
import { useTheme } from '@mui/styles';
import GroupsIcon from '@mui/icons-material/Groups';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ListUser({
    channel
  }) {
  
    const [user,setUser]=useState('')
    const [open, setOpen] = useState(false);
    const {oauth}=useContext(Context)
  
    const handleClickOpen = () => {
      setOpen(true);
      console.log(channel)
    };
    const handleClose = () => {
      setOpen(false);
      setUser("")
     
    };

    
    return (
      <div> 
         <Button varitant='outlined' onClick={handleClickOpen}  style={{width:'100px',height:'100px'}}>
           <GroupsIcon  fontSize='large'/>
        </Button>
        
       <Dialog open={open} onClose={handleClose}>
         <DialogTitle>List user</DialogTitle>
         <DialogContent>
             <List>
             {channel.users.map((user, i) =>(
                console.log(user),
                <ListItem key={i}>
                    <ListItemText> {user}</ListItemText>
                </ListItem>
        
             ))}
             </List>
         </DialogContent>
         <DialogActions>
           <Button onClick={handleClose}>OK</Button>
          
         </DialogActions>
       </Dialog>
      
      </div>
    )
  }
  
