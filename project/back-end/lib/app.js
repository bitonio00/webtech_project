
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

app.get('/channels/:users',  async (req, res) => {
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

app.post('/channels', async (req, res) => {
  const channel = await db.channels.create(req.body)
  res.status(201).json(channel)
})

app.delete('/channels/:id/messages/:creation', async (req, res) => {

  try{
    console.log("1")
    await db.messages.delete(req.params.id, req.params.creation)
  }
  catch(err){
    res.status(400).send("erreur suivante :"+err)
  }
})

app.post('/channels/:id/messages/:creation/:content', async (req, res) => {

  try{

    await db.messages.update(req.params.content, req.params.id,req.params.creation)
  }
  catch(err){
    res.status(400).send("erreur suivante :"+err)
  }
})
app.get('/channels/:id', async (req, res) => {
  const channel = await db.channels.get(req.params.id)
  res.json(channel)
})

app.put('/channels/:id', async (req, res) => {
  const channel = await db.channels.update(req.body)
  res.json(channel)
})
app.put('/channels/:users', async (req, res) => {
  const channel = await db.channels.update(req.body)
  res.json(channel)
})

// Messages

app.get('/channels/:id/messages', async (req, res) => {
  try{
    const channel = await db.channels.get(req.params.id)
  }catch(err){
    return res.status(404).send('Channel does not exist.')
  }
  const messages = await db.messages.list(req.params.id)
  res.json(messages)
})

app.post('/channels/:id/messages', async (req, res) => {
  const message = await db.messages.create(req.params.id, req.body)
  res.status(201).json(message)
})

// Users

app.get('/users', async (req, res) => {
  const users = await db.users.list()
  res.json(users)
})

app.post('/users', async (req, res) => {
  const user = await db.users.create(req.body)
  res.status(201).json(user)
})

app.get('/users/:id', async (req, res) => {
  const user = await db.users.get(req.params.id)
  res.json(user)
})

app.put('/users/:id', async (req, res) => {
  const user = await db.users.update(req.body)
  res.json(user)
})

module.exports = app
