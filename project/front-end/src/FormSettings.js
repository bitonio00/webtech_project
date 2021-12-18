import { useState } from 'react'
import axios from 'axios';
import { useContext,useEffect } from 'react';
import { useDropzone } from "react-dropzone"
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
import { Link as RouterLink } from 'react-router-dom';
import UploadIcon from '@mui/icons-material/Upload';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';

import Pic1 from './avatar/avatar_zoro.jpg'
import Pic2 from './avatar/avatar_urss.png'
import Gravatar from 'react-gravatar'
import { Avatar } from '@mui/material';
import Switch from '@mui/material/Switch';


export default function FormChannel({

}) {
  const { oauth,
    gravatar,setGravatar,setAvatarUser,

  } = useContext(Context)


  const [open, setOpen] = useState(false);
  const [openLanguage, setOpenLanguage] = useState(false);
  const [openAvatar, setOpenAvatar] = useState(false);
  const [nationalitie,setNationalitie]=useState('');
  const [language,setLanguage]=useState('');
  const [avatar,setAvatar]=useState('');
  const [state,setState]=useState(false)

  const [user,setUser]=useState({username:'',email:'',nationalitie:'',language:''})
  const [imageArray,setImageArray]=useState([Pic1,Pic2])
  const [files, setFiles] = useState([])
  const [validate,setValidate]=useState(false)
  const [baseImage, setBaseImage] = useState("")




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
       setAvatar(user.avatar)
       console.log(user)
     }catch(err){
       console.error(err)
     }
   }

   fetch()
   setState(false)
},[state])

const { getRootProps, getInputProps } = useDropzone({multiple:false,
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
  })

  const images = files.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} style={{ width: "200px" }} alt="preview" />
      </div>
    </div>
  ))



  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenLanguage = () => {
    setOpenLanguage(true);
  };
  const handleClickOpenAvatar = () => {
    setOpenAvatar(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseLanguage = () => {
    setOpenLanguage(false);
  };
  const handleCloseAvatar = () => {
    setOpenAvatar(false);
  };
  const handleChange = (e) => {
    setNationalitie(e.target.value);
  };
  const handleChangeLanguage = (e) => {
    setLanguage(e.target.value);
  };
  const handleChangeAvatar = (image) => {
    console.log('click image')
    setAvatar(image);
    console.log(avatar)
  };

  const handleChangeSwitch = (e) => {
    setGravatar(e.target.checked);
    console.log(gravatar);
  };



  const onSubmit = async () => {
    setNationalitie(nationalitie)
    const userObj ={
      username : oauth.name,
      email: oauth.email,
      nationalitie :nationalitie,
      language :language,
      avatar : avatar,

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
          language :language,
          avatar: avatar,
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

        const onSubmitAvatar = async () => {

          const userObj ={
            username : oauth.name,
            email: oauth.email,
            nationalitie :nationalitie,
            language :language,
            avatar: avatar,
          }


           console.log('UPDATE Avatar',userObj)
        const res = await axios.put(`http://localhost:3001/users/${oauth.name}`, {user: userObj},{
          headers: {
              'Authorization': `Bearer ${oauth.access_token}`
          }
        })
        if(res.data.status)
        {
          setState(true)
          setAvatarUser(avatar)
        }
        else {
          alert('oups something went wrong')
        }
          handleCloseAvatar()
      }



 const onUpload=async ()=>
 {


   console.log('UPDATE image',files[0])
   const base64 = await convertBase64(files[0]);
    setBaseImage(base64)

    const userObj ={
      username : oauth.name,
      email: oauth.email,
      nationalitie :nationalitie,
      language :language,
      avatar:base64
    }
    console.log("grossepute",base64)
  const res = await axios.put(`http://localhost:3001/users/${oauth.name}`, {user: userObj},{
  headers: {
      'Authorization': `Bearer ${oauth.access_token}`
  }
    })
    if(res.data.status)
    {
        setState(true)
        setAvatarUser(base64)
    }
    else {
      alert('oups something went wrong')
    }

 }

 const convertBase64 = (file) => {
     return new Promise((resolve, reject) => {
       const fileReader = new FileReader();
       fileReader.readAsDataURL(file);

       fileReader.onload = () => {
         resolve(fileReader.result);
       };

       fileReader.onerror = (error) => {
         reject(error);
       };
     });
   };


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

                      {gravatar=== true?
                      <Gravatar email={oauth.email} />
                      :<Avatar src={avatar}/>}


                    </td>
                    <td>
                    <Button variant="contained"  color="primary" endIcon={<EditIcon />}onClick={handleClickOpenAvatar}></Button>
                    </td>
                </tr>
                <tr>
                    <td>
                        upload your avatar :
                    </td>
                    <td>
                    <div style={{display:'flex'}}>
                    <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <IconButton >
                    <UploadIcon fontSize="large" />
                    </IconButton>
                    </div>
                    <div>{images}</div>
                    { files.length  ?
                    <IconButton onClick={onUpload}>
                      <CheckIcon color="success" fontSize="large" />
                    </IconButton>
                    :
                    <span></span>
                  }
                    </div>
                    </td>
                </tr>
                <tr>
                   <td>
                      use gravatar
                   </td>
                   <td>
                     <Switch  onChange={handleChangeSwitch}/>

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
         <Dialog open={openAvatar} onClose={handleCloseAvatar}>
          <DialogTitle>Avatar</DialogTitle>
          <DialogContent>
             {imageArray.map((image,i) =>(<img  key={i} src={image} onClick={ () =>handleChangeAvatar(image)}/>)
             )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAvatar}>Cancel</Button>
            <Button variant="contained"  color="primary" endIcon={<SendIcon />}onClick={onSubmitAvatar}>Update Avatar</Button>
          </DialogActions>
         </Dialog>
            </div>
  )
}
