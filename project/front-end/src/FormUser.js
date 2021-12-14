/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import axios from 'axios';
import { useContext } from 'react';
//local
import Context from './Context';
// Layout
import { Button, outlinedInputClasses, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/styles';




export default function FormUser({
  channel
}) {

  const [user,setUser]=useState('')

  const onSubmit = async () => {
    channel.users.push(user)
    console.log(channel.users)
    await axios.put(`http://localhost:3001/channels/${channel.id}`,{edited : channel}
     ).then(res => {
      console.log(res)
    })


  }
  const handleChange = (e) => {
    setUser(e.target.value);
  };
  return (
    <form  onSubmit={onSubmit} noValidate>
      <TextField
        id="outlined-multiline-flexible"
        label="User Name"
        multiline
        maxRows={4}
        value={user}
        onChange={handleChange}
        variant="outlined"
      />

      <div>
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          onClick={onSubmit}
        >
         Add
        </Button>
      </div>
    </form>
  )
}
