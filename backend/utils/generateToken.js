const crypto = require('crypto');

const genereToken = () => {
    return crypto.randomBytes(32).toString("hex");
};

module.exports = genereToken;
