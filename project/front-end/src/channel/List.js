
/** @jsxImportSource @emotion/react */
import {forwardRef, useImperativeHandle, useLayoutEffect, useRef, useContext, useNavigate, useEffect,useState} from 'react'
import axios from 'axios';
import Gravatar from 'react-gravatar'

// Layout
import { Button, outlinedInputClasses, TextField } from '@mui/material';
import { useTheme } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOffIcon from '@mui/icons-material/EditOff';
import SendIcon from '@mui/icons-material/Send'
import Input from '@mui/material/Input';
import { Avatar } from '@mui/material';
//localhost
import Context from '../Context'
// Markdown
import { unified } from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import html from 'rehype-stringify'
// Time
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import updateLocale from 'dayjs/plugin/updateLocale'
import FormUser from '../FormUser';
import { display } from '@mui/system';

dayjs.extend(calendar)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
  calendar: {
    sameElse: 'DD/MM/YYYY hh:mm A'
  }
})

const useStyles = (theme) => ({
  root: {
    position: 'relative',
    flex: '1 1 auto',
    overflow: 'auto',
    '& ul': {
      'margin': 0,
      'padding': 0,
      'textIndent': 0,
      'listStyleType': 0,
    },
  },
  message: {
    padding: '.2rem .5rem',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,.05)',
    },
  },
  fabWrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '50px',
  },
  fab: {
    position: 'fixed !important',
    top: 0,
    width: '50px',
  },

})

export default forwardRef(({
  channel,
  onScrollDown,
  messages,
  setMessages
}, ref) => {

  const { oauth,avatarUser,gravatar } = useContext(Context)
  const [state,setState]=useState(false)
  // const [stateEdit,setStateEdit]=useState({showEdit:false} , {idMessage: null})
  const [editContent,setEditContent]=useState('')
  const [showEdit,setShowEdit]=useState(false)
  const [idEditedMessage,setIdEditedChannelId]=useState(null)
  const[editedChannelId,setEditedChannelId]=useState('')
  const[editedCreation,setEditedCreation]=useState('')
  const styles = useStyles(useTheme())

   useEffect( () => {

    const fetch = async () => {
      try{
        const {data: messages} = await axios.get(`http://localhost:3001/channels/${channel.id}/messages`,{
          headers: {
              'Authorization': `Bearer ${oauth.access_token}`
          }
        })
        console.log(messages)
        setMessages(messages)
      }catch(err){
        console.error(err)
        console.log('errpr')
      }



    }
    fetch()
    setState(false)
    console.log("fetch1:",state)
 },[state])
  // Expose the `scroll` action
  useImperativeHandle(ref, () => ({
    scroll: scroll
  }));
  const rootEl = useRef(null)
  const scrollEl = useRef(null)
  const scroll = () => {
    scrollEl.current.scrollIntoView()
  }
  // See https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj
  const throttleTimeout = useRef(null) // react-hooks/exhaustive-deps
  useLayoutEffect( () => {
    const rootNode = rootEl.current // react-hooks/exhaustive-deps
    const handleScroll = () => {
      if (throttleTimeout.current === null) {
        throttleTimeout.current = setTimeout(() => {
          throttleTimeout.current = null
          const {scrollTop, offsetHeight, scrollHeight} = rootNode // react-hooks/exhaustive-deps
          onScrollDown(scrollTop + offsetHeight < scrollHeight)
        }, 200)
      }
    }
    handleScroll()
    rootNode.addEventListener('scroll', handleScroll)
    return () => rootNode.removeEventListener('scroll', handleScroll)
  })

   const  onDelete = async (message) => {

       const res=await axios.delete(`http://localhost:3001/channels/${message.channelId}/messages/${message.creation}`,{
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

  }
  const onEdit = async () => {

    const res = await axios.put(`http://localhost:3001/channels/${editedChannelId}/messages/${editedCreation}`,{content:editContent}, {
      headers:{
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

  }

  return (
    <div css={styles.root} ref={rootEl}>
      <div style={{display: 'flex',justifyContent:'space-between',border:'solid'}}>
         <h1>Messages for {channel.name}</h1>
         <FormUser channel={channel} />
      </div>
      <ul>
        { messages.map( (message, i) => {


            const {value} = unified()
            .use(markdown)
            .use(remark2rehype)
            .use(html)
            .processSync(message.content)


            return (
              <li key={i} css={styles.message}>
              <div style={{display:'flex'}}>
                <div>
                {
                  gravatar ?
                  <Gravatar email={oauth.email} />
                  :
                  <Avatar src={avatarUser}/>

                }</div>
                <div>
                  <span>{message.author}</span>
                  {' - '}
                  <span>{dayjs().calendar(message.creation)}</span>


                { (message.author===oauth.name) ?

                  <IconButton aria-label="edit"  onClick={()=> {setShowEdit(true);setIdEditedChannelId(i);
                  setEditContent(message.content);
                  setEditedCreation(message.creation);
                  setEditedChannelId(message.channelId)}} >
                  <EditOffIcon />
                  </IconButton>
                :
                <span></span>
              }
              { (message.author===oauth.name) ?

              <IconButton aria-label="delete" onClick={()=> {onDelete(message)}}>
              <DeleteIcon />
              </IconButton>
              :
              <span></span>
            }</div>
                
                </div>
                <div dangerouslySetInnerHTML={{__html: value}}>
                </div>

                { (i===idEditedMessage && showEdit===true) ?

                  <form onSubmit={(e)=>{onEdit();setShowEdit(false);e.preventDefault()}}>
                    <Input
                      id="outlined-multiline-flexible"
                      label="Edit"
                      type="text"
                      multiline
                      maxRows={4}
                      value={editContent}
                      onChange={(e)=>{setEditContent(e.target.value)}}
                    />
                  <button>edit</button>
                  </form>
                :
                <span></span>
                }

              </li>

            )
        })}
      </ul>
      <div ref={scrollEl} />
    </div>
  )
})
