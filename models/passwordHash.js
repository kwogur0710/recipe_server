const crypto = require('crypto');

module.exports.passwordHash = (password) => {
    return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
}