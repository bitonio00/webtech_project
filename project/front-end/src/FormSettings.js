import { useState } from 'react'
import axios from 'axios';
import { useContext,useEffect } from 'react';
//local
import Context from './Context';
import { ReactComponent as ChannelIcon } from './icons/channel.svg';
// Layout
import { Button, outlinedInputClasses, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Gravatar from 'react-gravatar'


export default function FormChannel({

}) {
  const { oauth,

  } = useContext(Context)

  const [open, setOpen] = useState(false);
  const [openLanguage, setOpenLanguage] = useState(false);
  const [nationalitie,setNationalitie]=useState('');
  const [language,setLanguage]=useState('');
  const [state,setState]=useState(false)
  const [user,setUser]=useState({username:'',email:'',nationalitie:'',language:''})
  

  useEffect( () => {
console.log("fetch----------------")
   const fetch = async () => {
    // console.log(oauth.username)
     try{

       const {data: user} = await axios.get(`http://localhost:3001/users/${oauth.name}`,{
         headers: {
             'Authorization': `Bearer ${oauth.access_token}`
         }
       })
       console.log("user----------------",user)

       setNationalitie(user.nationalitie)
       setLanguage(user.language)
       console.log(user)
     }catch(err){
       console.error(err)
     }
   }

   fetch()
   setState(false)
},[state])

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenLanguage = () => {
    setOpenLanguage(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseLanguage = () => {
    setOpenLanguage(false);
  };
  const handleChange = (e) => {
    setNationalitie(e.target.value);
  };
  const handleChangeLanguage = (e) => {
    setLanguage(e.target.value);
  };
  const onSubmit = async () => {
    setNationalitie(nationalitie)
    const userObj ={
      username : oauth.name,
      email: oauth.email,
      nationalitie :nationalitie,
      language :language
    }
     
    
     console.log('UPDATE NATION',userObj)
  const res = await axios.put(`http://localhost:3001/users/${oauth.name}`, {user: userObj},{
    headers: {
        'Authorization': `Bearer ${oauth.access_token}`
    }
  })
  if(res.data.status)
  {
    setState(true)
  }
  else {
    alert('oups something went wrong')
  }
   
    handleClose()
    }
 const onSubmitLanguage = async () => {

        setLanguage(language)
        const userObj ={
          username : oauth.name,
          email: oauth.email,
          nationalitie :nationalitie,
          language :language
        }
         
        
         console.log('UPDATE LANG',userObj)
      const res = await axios.put(`http://localhost:3001/users/${oauth.name}`, {user: userObj},{
        headers: {
            'Authorization': `Bearer ${oauth.access_token}`
        }
      })
      if(res.data.status)
      {
        setState(true)
      }
      else {
        alert('oups something went wrong')
      }
        handleCloseLanguage()
        }
  return (
            <div>
              <table>
                <tbody>
                <tr>
                    <td>
                        name :
                    </td>
                    <td>
                        {oauth.name}
                    </td>

                </tr>
                <tr>
                    <td>
                        email :
                    </td>
                    <td>
                        {oauth.email}
                    </td>
                </tr>
                <tr>
                    <td>
                        nationalitie(s) :
                    </td>
                    <td>
                        {nationalitie}
                    </td>
                    <td>
                     <Button variant="contained"  color="primary" endIcon={<EditIcon />} onClick={handleClickOpen}></Button>
                    </td>

                </tr>
                <tr>
                    <td>
                        language spoken :
                    </td>
                    <td>
                        {language}
                    </td>
                    <td>
                      <Button variant="contained"  color="primary" endIcon={<EditIcon />}onClick={handleClickOpenLanguage}></Button>
                    </td>
                </tr>
                <tr>
                    <td>
                        avatar :
                    </td>
                    <td>
                    <Gravatar email={oauth.email} />
                    </td>
                </tr>
                </tbody>
                </table>
         <Dialog open={open} onClose={handleClose}>
          <DialogTitle>nationalitie(s)</DialogTitle>
          <DialogContent>
            <TextField
              id="outlined-multiline-flexible"
              label="nationalitie"
              multiline
              maxRows={4}
              value={nationalitie}
              onChange={handleChange}
             variant="outlined"
           />

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained"  color="primary" endIcon={<SendIcon />}onClick={onSubmit}>update nationalitie</Button>
          </DialogActions>
         </Dialog>

         <Dialog open={openLanguage} onClose={handleCloseLanguage}>
          <DialogTitle>language</DialogTitle>
          <DialogContent>
            <TextField
              id="outlined-multiline-flexible"
              label="nationalitie"
              multiline
              maxRows={4}
              value={language}
              onChange={handleChangeLanguage}
             variant="outlined"
           />

          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseLanguage}>Cancel</Button>
            <Button variant="contained"  color="primary" endIcon={<SendIcon />}onClick={onSubmitLanguage}>update language</Button>
          </DialogActions>
         </Dialog>
            </div>
  )
}
