const User = require('../../models/user')

exports.createTodo = async (req, res) => {
    const { uid, tid } = req.body
    try {
        let userExist = await User.findOneByUID(uid)

    }
}
