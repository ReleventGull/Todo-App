const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { getUserByUsername, createUser, getUser} = require("../db/users");
const {JWT_SECRET} = process.env



userRouter.post("/register", async (req, res, next) => {
  try {
    console.log(JWT_SECRET)
    const { username, password } = req.body;
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      next({
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
    console.log("there was an error registering the uesr")
    throw error
    }
});

userRouter.post('/login', async(req, res, next) => {
    try {
        const {username, password} = req.body
        const _user = await getUser({username: username, password: password})
        if(!_user) {
            next({
                error:"IncorrectCredentials",
                name:"CredentialsError",
                message:"Username or password is not correct"
            })
        }else {
            const token = jwt.sign({id: _user.id, username: _user.username}, JWT_SECRET)
            res.send({message: 'Succes', user: _user, token:token})
        }
    }catch(error) {
        console.log("There was an error logging in the user")
        throw error
    }
})




module.exports = userRouter;
