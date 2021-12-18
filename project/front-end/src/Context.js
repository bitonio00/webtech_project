
import React, {useState} from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios';

const Context = React.createContext()

export default Context


export const Provider = ({
  children
}) => {
  const [cookies, setCookie, removeCookie] = useCookies([])
  const [oauth, setOauth] = useState(cookies.oauth)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [channels, setChannels] = useState([])
  const [currentChannel, setCurrentChannel] = useState(null)
  const [gravatar,setGravatar] = useState(false)
  const [avatarUser,setAvatarUser]=useState()
  const[usersChannel,setUsersChannel]=useState([])
  return (
    <Context.Provider value={{
      oauth: oauth,
      setOauth: (oauth) => {
        if(oauth){
          const payload = JSON.parse(
            Buffer.from(
              oauth.id_token.split('.')[1], 'base64'
            ).toString('utf-8')
          )
          oauth.email = payload.email
          oauth.name = payload.name
          setCookie('oauth', oauth)
        }else{
          setCurrentChannel(null)
          setChannels([])
          removeCookie('oauth')
        }
        setOauth(oauth)
      },
      avatarUser:avatarUser,
      setAvatarUser:async (username)=>
      {

        const {data: user} = await axios.get(`http://localhost:3001/users/${oauth.name}`, {
         headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })
      
        setAvatarUser(user.avatar)
          console.log('avatarUSERu',avatarUser)
      },
      usersChannel:usersChannel,
      setUsersChannel:async ()=>
      {

        const {data: users} = await axios.get(`http://localhost:3001/users`, {
         headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })

        setUsersChannel(users)
        console.log('dans context',usersChannel)
      },
      channels: channels,
      gravatar: gravatar,
      drawerVisible: drawerVisible,
      setDrawerVisible: setDrawerVisible,
      setChannels: setChannels,
      setGravatar: setGravatar,
      currentChannel: currentChannel,
      setCurrentChannel: (channelId) => {
        const channel = channels.find( channel => channel.id === channelId)
        setCurrentChannel(channel)
      },
    }}>{children}</Context.Provider>
  )
}
