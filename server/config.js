// This file would normally be private for security reasons 
// Since this is not a production app and I intend for it to work on other machines, I left it public

const crypto = require('crypto');
module.exports = {
    JWT_SECRET: crypto.randomBytes(32).toString('hex')
  };