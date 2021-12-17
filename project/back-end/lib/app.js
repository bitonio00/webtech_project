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
  const  result=myChannels(channels,req.params.users)
  await isUser(req.params.users,req.headers['email'])
  const users=await db.users.list()
  res.json(result)

})

app.post('/channels',authenticate, async (req, res) => {
console.log("eeeeeeeeeeeeeeeee")
  const channel = await db.channels.create(req.body['channel'])
  res.status(201).json(channel)

})
app.post('/channels/init', async (req, res) => {

  const channel = await db.channels.create(req.body['channel'])
  res.status(201).json(channel)

})

app.delete('/channels/:id/messages/:creation',authenticate, async (req, res) => {
    
  try{
    await db.messages.delete(req.params.id, req.params.creation)
     res.status(200).json({ "status": true, "result": 'Edit successful!' })
  }
  catch(err){
    res.status(400).send({"status":false,"erreur suivante":err})
  }
})

app.put('/channels/:id/messages/:creation',authenticate,async (req, res) => {
  try{

    await db.messages.update(req.body.content, req.params.id,req.params.creation)
    res.status(200).json({ "status": true, "result": 'Edit successful!' })
  }
  catch(err){
    res.status(400).send({"status":false,"erreur suivante ":err})
  }
})
app.get('/channels/:id', authenticate,async (req, res) => {
  const channel = await db.channels.get(req.params.id)
  res.json(channel)
})

app.put('/channels/:id',authenticate, async (req, res) => {

  await isUser(req.body['edited'].users)
  try{
  const channel = await db.channels.update(req.params.id,req.body['edited'])
  res.status(200).json({ "status": true, "result": 'Edit successful!' })
}catch(err){
  res.status(400).send({"status":false,"erreur suivante":err})
}

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

app.post('/users',  isUser)


app.get('/users/:username',authenticate, async (req, res) => {
  const users=await db.users.list()
  const user = await db.users.get(req.params.username)
  res.json(user)
})

app.put('/users/:id',authenticate, async (req, res) => {
  try{
    const user = await db.users.update(req.body['user'])
    res.status(200).json({ "status": true, "result": 'Edit successful!' })
  }
  catch(err){
      res.status(400).send({"status":false,"erreur suivante":err})
  }

})

async function isUser(username,email)
{

 const bddUsers=await db.users.list()
   if(!bddUsers.find(user=>user.username===username))
   {
     const user={

       username:username,
       email:email,
       language:'français',
       nationalitie:'français',
       avatar :'/broken-image.jpg',
     }
     await db.users.create(user)
   }
}

 function  myChannels(channels,user)
{
  let result=[]
   for(let i=0; i<channels.length;i++)
   {
     if(channels[i].users != undefined)
    {for( let l=0; l<channels[i].users.length;l++)
     {
       if(channels[i].users[l] ===user)
       {
        result.push(channels[i])
       }
     }}
   }
   return result
}

module.exports = app
