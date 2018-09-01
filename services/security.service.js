const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');
const { TE, to } = require('../services/util.service');

const getJWT = async function (user_Id) {
    let expiration_time = parseInt(CONFIG.jwt_expiration);
    return jwt.sign({ user_id: user_Id }, CONFIG.jwt_encryption, { expiresIn: expiration_time });
};
module.exports.getJWT = getJWT;

const toWeb = async function (data) {
    let json = await to(data.toJSON());
    return json;
};
module.exports.toWeb = toWeb;

const encryptPassword = async function (password) {
    let salt, hash
    [err, salt] = await to(bcrypt.genSalt(10));
    if (err) TE(err.message, true);

    [err, hash] = await to(bcrypt.hash(password, salt));
    if (err) TE(err.message, true);

    return hash;
};
module.exports.encryptPassword = encryptPassword;

const comparePassword = async function (dbPassword, userPassword) {
    if (!userPassword) {
        TE("password not set");
    }
    [err, pass] = await to(bcrypt.compare(dbPassword, userPassword));
    if (err) TE(err);

    if (!pass) TE('invalid password');

    return pass;
};
module.exports.comparePassword = comparePassword;