const jwt = require('jsonwebtoken')
require('dotenv').config()


const createToken = (id, email) =>
    jwt.sign({ id, email },
        process.env.TOKEN_SECRET,
        { expiresIn: '1d' }
    );
module.exports = createToken;