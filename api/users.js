const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { getUserByUsername, createUser, getUser, getUserById, createProfilePicture} = require("../db/users");
const {getTodosByUserId} = require('../db/todos')
const {JWT_SECRET} = process.env
const {requireUser} = require('./utils')



userRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      res.status(401).send({
        error: "User already Exists",
        name: "InvalidUsername",
        message: "A user by that username already exists",
      });
    }else {
      const newUser = await createUser({
        username: username,
        password: password,
      });
      const token = jwt.sign({ id: newUser.id, username: newUser.username }, JWT_SECRET);
      res.send({message: 'Succes', user: newUser, token:token})
    }
  }catch (error) {
    console.error("there was an error registering the uesr")
    throw error
    }
});

userRouter.post('/login', async(req, res, next) => {
    try {
        const {username, password} = req.body
        const _user = await getUser({username: username, password: password})
        if(!_user) {
            res.status(401).send({
                error:"IncorrectCredentials",
                name:"CredentialsError",
                message:"Username or password is not correct"
            })
        }else {
            const token = jwt.sign({id: _user.id, username: _user.username}, JWT_SECRET)
            res.send({message: 'Succes', user: _user, token:token})
        }
    }catch(error) {
        console.error("There was an error logging in the user")
        throw error
    }
})
userRouter.post('/profilePicture', requireUser, async(req, res, next) => {
  try {
    const {img} = req.body
    const addImage = await createProfilePicture({id: req.user.id, img: img})
    console.error("Add image result", addImage)
    res.send({
      message:"Profile Picture added!",
      user:addImage
    })
  }catch(error) {
    console.error("There was an error in the api/users userRouter", error)
    throw error
  }
})

userRouter.get('/me', requireUser, async(req, res, next) => {
  try {
  
    const userTodos = await getTodosByUserId(req.user.id)
    const objectCount = {
      all: userTodos.length,
      complete: 0,
      overdue: 0,
      incomplete: 0
    }
    for(let i = 0; i < userTodos.length; i++) {
      userTodos[i]['status'] = ''
      if (userTodos[i].isComplete) {
        userTodos[i].status = 'complete'
        objectCount.complete ++
      } else if (new Date(userTodos[i].due_date) - new Date() <= 0) {
        userTodos[i].status = 'overdue'
        objectCount.overdue ++
      }else {
        userTodos[i].status = 'incomplete'
        objectCount.incomplete ++
      }
    }
   
    const user = await getUserById(req.user.id)
    res.send({user: user, todoCount:objectCount})
  }catch(error) {
      console.error(error)
  }
})





module.exports = userRouter;
