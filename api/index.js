const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { getUserByUsername } = require("../db/users");
const { JWT_SECRET } = process.env;



router.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
    if(!auth) {
        next ()
    }else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length)
        try {
            const {username} = jwt.verify(token, JWT_SECRET)
            if (username) {
                req.user = await getUserByUsername(username)
                next ()
            }
        }catch({name, message}) {
            next({name, message })
        }
    } else {
        next ({
            name: 'AuthoizationHeaderError',
            message: `Authorization token must start with ${ prefix }`
        })
    }
});


const userRouter = require("./users");
router.use("/users", userRouter);

const todoRouter = require('./todos')
router.use('/todos', todoRouter)
module.exports = router;
