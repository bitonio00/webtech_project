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




export default function FormChannel({
  
}) {
  const {
    channels, setChannels
  } = useContext(Context)
  /*const addChannel = (channel) => {
    setChannels([...channels, channel])
  }*/
  const [channel, setChannel] =useState('')
  const channelObj = {
    id : 1,
    name: channel
  }
  const onSubmit = async () => {
     await axios.post(
      `http://localhost:3001/channels`,channelObj
   ).then(res => {
    console.log(res)
  })
  setChannels([...channels, channelObj])
  console.log(channels)
  console.log(channel)
  }
  const handleChange = (e) => {
    setChannel(e.target.value);
  };
  return (
    <form  onSubmit={onSubmit} noValidate>
      <TextField
        id="outlined-multiline-flexible"
        label="Channel_Name"
        multiline
        maxRows={4}
        value={channel}
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
          Send
        </Button>
      </div>
    </form>
  )
}