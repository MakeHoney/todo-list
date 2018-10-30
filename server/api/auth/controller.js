const User = require('../../models/user')

exports.register = async (req, res, next) => {
    let { uid, password } = req.body
    const createUser = user => {
        if (user) {
            throw new Error('user name already exist!')
        } else {
            User.create(uid, password)
        }
    }

    try {
        let userExist = 
        await User.findOneByUID(uid)
        await createUser(userExist)
        res.json({
            message: 'successfully registered!'
        })
    } catch (err) {
        res.status(409).json({
            message: err.message
        })
    }
}