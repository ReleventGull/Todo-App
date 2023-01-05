const express = require("express");
const router = express.Router();
const { getUserByUsername } = require("../db/users");
const { JWT_SECRET } = process.env;

router.use(async (req, res, next) => {
  try {
    const auth = req.header("Authorization");
    if (!auth) {
      next();
    } else {
      const [_, token] = auth.split();
      const { id, username } = jwt.verify(token, JWT_SECRET);
      if (!username) {
        next({
          error: "InvalidToken",
          name: "TokenError",
          message: "Token is invalid",
        });
      } else {
        req.user = await getUserByUsername(username);
        next();
      }
    }
  } catch (error) {
    throw error;
  }
});

const userRouter = require("./users");
router.use("/users", userRouter);

module.exports = router;
