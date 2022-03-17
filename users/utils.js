const res = require('express/lib/response');
const jwt = require('jsonwebtoken');

exports.getUser = function(token){
    console.log(token)
    const decoded = jwt.verify(token, 'secretKey')
    console.log(decoded)
    return decoded
}

exports.getProfilePicture = function(username){
    return `https://avatars.dicebear.com/api/bottts/${username}.svg`
}