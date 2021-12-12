
/** @jsxImportSource @emotion/react */
import {forwardRef, useImperativeHandle, useLayoutEffect, useRef, useContext, useNavigate, useEffect,useState} from 'react'
import axios from 'axios';

// Layout
import { useTheme } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOffIcon from '@mui/icons-material/EditOff';
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

  const { oauth } = useContext(Context)
  const [state,setState]=useState(false)
  const [stateEdit,setStateEdit]=useState(true)
  const styles = useStyles(useTheme())
   useEffect( () => {
    console.log("useEffect")
    const fetch = async () => {

        const {data: messages} = await axios.get(`http://localhost:3001/channels/${channel.id}/messages`, {
          headers: {

          }
        })
        setMessages(messages)


    }
    fetch()
   setState(false)
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
      const res = await axios.delete(`http://localhost:3001/channels/${message.channelId}/messages/${message.creation}`, {
      data: message,
      headers: {

      }
    })
    if (res.data.status === 'ok') setMessages(messages.filter(e => e.creation !== message.creation && e.channelId === message.channelId))
    else alert('oups something went wrong')
  }
  const onEdit =async (message)=>{

  }

  return (
    <div css={styles.root} ref={rootEl}>
      <h1>Messages for {channel.name}</h1>
      <ul>
        { messages.map( (message, i) => {


            const {value} = stateEdit ? unified()
            .use(markdown)
            .use(remark2rehype)
            .use(html)
            .processSync(message.content):
            <span></span>


            return (
              <li key={i} css={styles.message}>
                <p>
                  <span>{message.author}</span>
                  {' - '}
                  <span>{dayjs().calendar(message.creation)}</span>


                { (message.author===oauth.name) ?

                  <IconButton aria-label="edit"  onClick={()=> {onEdit(message);setStateEdit(true)}} >
                  <EditOffIcon />
                  </IconButton>

                :
                <span></span>
              }
              { (message.author===oauth.name) ?

              <IconButton aria-label="delete" onClick={()=> {onDelete(message);setState(true)}}>
              <DeleteIcon />
              </IconButton>


              :
              <span></span>
            }
                </p>
                <div dangerouslySetInnerHTML={{__html: value}}>
                </div>
              </li>
            )
        })}
      </ul>
      <div ref={scrollEl} />
    </div>
  )
})
