const res = require('express/lib/response');
const jwt = require('jsonwebtoken');

exports.getUser = function(token){
    const decoded = jwt.verify(token, 'secretKey')
    console.log(decoded)
    return decoded
}

exports.getProfilePicture = function(username){
    return `https://avatars.dicebear.com/api/identicon/${username}.svg`
}