const User = require('../models/user.model');
const validator = require('validator');
const { to, TE } = require('../services/util.service');
const securityService = require('../services/security.service');

const getUniqueKeyFromBody = function (body) {// this is so they can send in 3 options unique_key, email, or phone and it will work
    let unique_key = body.user_Id;
    console.log(body.user_Id)
    if (typeof unique_key === 'undefined') {
        if (typeof body.emailId != 'undefined') {
            unique_key = body.emailId
        } else if (typeof body.phoneNumber != 'undefined') {
            unique_key = body.phoneNumber;
        }
    }

    return unique_key;
};
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;

const createUser = async function (userInfo) {
    let  err, user;
    if (validator.isEmail(userInfo.emailId)) {
        [err, user] = await to(User.create(userInfo));
        if (err) {
            console.log(err)
            TE('user already exists with that email '+ err.message);
        }
        return user;

    } else if (validator.isMobilePhone(userInfo.phoneNumber, 'any')) {//checks if only phone number was sent
        [err, user] = await to(User.create(userInfo));
        if (err) TE('user already exists with that phone number: ' + err.message);

        return user;
    } else {
        TE('A valid email or phone number was not entered.');
    }
};
module.exports.createUser = createUser;

const updateUser = async function (userInfo) {
    let err, user;
    [err, user] = await to(User.update(userInfo));

    if (err) TE('unable to update the user details');
    return user;
};
module.exports.updateUser = updateUser;

const authUser = async function (userInfo) {
    let unique_key;
    unique_key = getUniqueKeyFromBody(userInfo);

    if (!unique_key) TE('Please enter an email or phone number to login');

    if (!userInfo.password) TE('Please enter a password to login');

    let err,user;
    if (validator.isEmail(unique_key)) {

        [err, user] = await to(User.getUser(unique_key));
        if (err) TE(err.message);

    } else if (validator.isMobilePhone(unique_key, 'any')) {

        [err, user] = await to(User.getUser(unique_key));
        if (err) TE(err.message);

    } else {
        TE('A valid email or phone number was not entered');
    }

    if (!user) TE('Not registered');

    [err, result] = await to(securityService.comparePassword(userInfo.password,user[0][0].password));

    if (err) TE(err.message);

    return user;

};
module.exports.authUser = authUser;