const User = require('../models/user.model');
const validator = require('validator');
const { to, TE } = require('../services/util.service');
const securityService = require('../services/security.service');

const getUser  = async function(userId) {
    let err, user;
    [err, user] = await to(User.getUser(userId));
    if (err) TE('user already exists with that email');

    return user;
}
module.exports.getUser  = getUser

const getAllUsers = async function () {
    let err, users;
    [err, users] = await to(User.getAllUsers());
    if(err) TE("no users found");

    return users;
}
module.exports.getAllUsers = getAllUsers