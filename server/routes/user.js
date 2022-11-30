const express = require('express')
const User = require('../models/user')
const router = express.Router()

router
  .get('/', async (req, res) => {
    try {
      const users = await User.getAllUsers()
      res.send(users)
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })
  //for login function in models/user.js
  .post('/login', async (req, res) => {//req.body => {username, password, ...} the entire object user
    try{
        let user = await User.login(req.body)
        res.send({...user, userPassword: undefined})
    }
    catch(err) {
        res.status(401).send({message: err.message})
    }
  })

  //for register function in models/user.js
  .post('/register', async (req, res) => {
    try {
      let user = await User.register(req.body)
      res.send({...user, userPassword: undefined})
    } 
    catch (err) {
      res.status(401).send({message: err.message})
    }
  })
  
module.exports = router;