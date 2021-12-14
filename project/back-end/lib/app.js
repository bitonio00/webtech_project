const db = require('./db')
const express = require('express')
const cors = require('cors')
const authenticator = require('./authenticator')

const app = express()
const authenticate = authenticator({
  test_payload_email: process.env['TEST_PAYLOAD_EMAIL'],
  jwks_uri: 'http://127.0.0.1:5556/dex/keys'
})

app.use(require('body-parser').json())
app.use(cors())

app.get('/', (req, res) => {
  res.send([
    '<h1>ECE WebTech Chat</h1>'
  ].join(''))
})

// Channels

app.get('/channels', authenticate, async (req, res) => {
  const channels = await db.channels.list()
  res.json(channels)
})

app.get('/channels/:users',authenticate,  async (req, res) => {
  const channels = await db.channels.list()
  let result=[]
   for(let i=0; i<channels.length;i++)
   {
     if(channels[i].users != undefined)
    {for( let l=0; l<channels[i].users.length;l++)
     {
       if(channels[i].users[l] === req.params.users)
       {
        result.push(channels[i])
       }
     }}

   }
console.log(result)
  res.json(result)

})

app.post('/channels',authenticate, async (req, res) => {

const users=await db.users.list()
  for(let i=0; i<req.body['channel'].users.length; i++)
  {
    if(!users.find(user=>user.username===req.body['channel'].users[i]))
    {
      console.log(req.body['channel'].users[i])
      const user={
        id:1,
        username:req.body['channel'].users[i]
      }
      await db.users.create(user)
    }
  }
  const users2=await db.users.list()
  console.log("bdd2|||",users2)
  const channel = await db.channels.create(req.body['channel'])
  res.status(201).json(channel)

})
app.post('/channels/init', async (req, res) => {

  const channel = await db.channels.create(req.body['channel'])
  res.status(201).json(channel)

})

app.delete('/channels/:id/messages/:creation',authenticate, async (req, res) => {
  try{
    console.log("1")
    await db.messages.delete(req.params.id, req.params.creation)
  }
  catch(err){
    res.status(400).send("erreur suivante :"+err)
  }
})

app.put('/channels/:id/messages/:creation',authenticate,async (req, res) => {
  try{

    await db.messages.update(req.body.content, req.params.id,req.params.creation)
  }
  catch(err){
    res.status(400).send("erreur suivante :"+err)
  }
})
app.get('/channels/:id', authenticate,async (req, res) => {
  const channel = await db.channels.get(req.params.id)
  res.json(channel)
})

app.put('/channels/:id',authenticate, async (req, res) => {
  console.log('BODY |||',req.body['edited'])
  console.log('id ||||',req.params.id)
  const channel = await db.channels.update(req.params.id,req.body['edited'])
  res.json(channel)
  console.log('to')
  //tryy
})


// Messages

app.get('/channels/:id/messages',authenticate, async (req, res) => {
  try{
    const channel = await db.channels.get(req.params.id)
  }catch(err){
    return res.status(404).send('Channel does not exist.')
  }
  const messages = await db.messages.list(req.params.id)
  res.json(messages)
})

app.post('/channels/:id/messages',authenticate, async (req, res) => {
  const message = await db.messages.create(req.params.id, req.body)
  res.status(201).json(message)
})

// Users

app.get('/users',authenticate, async (req, res) => {
  const users = await db.users.list()
  res.json(users)
})

app.post('/users',authenticate, async (req, res) => {
  const user = await db.users.create(req.body)
  res.status(201).json(user)
})

app.get('/users/:id',authenticate, async (req, res) => {
  const user = await db.users.get(req.params.id)
  res.json(user)
})

app.put('/users/:id',authenticate, async (req, res) => {
  const user = await db.users.update(req.body)
  res.json(user)
})

module.exports = app
