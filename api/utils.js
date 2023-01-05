



const requireUser = (req, res, next) => {
    if(!req.user) {
        next({
            error: 'MissingUserError',
            name: 'MissingUserError',
            message: 'There is no user set'
        })
    }else {
        next ()
    }
}

module.exports = {
    requireUser
}