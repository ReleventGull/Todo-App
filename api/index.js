const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { getUserByUsername } = require("../db/users");
const { JWT_SECRET } = process.env;

// router.use(async (req, res, next) => {
//   try {
//     const auth = req.header("Authorization");
//     if (!auth) {
//       next();
//     } else {
//       const [_, token] = auth.split(' ');
//       console.log(token)
//       const { id, username } = jwt.verify(token, JWT_SECRET);
//       console.log(username)
//       if (!username) {
//         next({
//           error: "InvalidToken",
//           name: "TokenError",
//           message: "Token is invalid",
//         });
//       } else {
//         req.user = await getUserByUsername(username);
//         next();
//       }
//     }
//   }catch (error) {
//     throw error;
//   }
// });

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
