'use strict';
const { TE } = require('../services/util.service');
const pool = require('../config/connection');
const { to, ReE, ReS } = require('../services/util.service');
const time = require('../services/time.service');

const create = async function (userInfo) {
    let sql = `CALL createUser(?,?,?,?,?,?,?,?)`;
    let err, result, currentTime;
    [err, currentTime] = await to(time.getCurrentTime());
    [err, result] = await to(pool.query(sql, [userInfo.user_Id, userInfo.userName, userInfo.emailId, userInfo.password, userInfo.phoneNumber, currentTime.toLocaleString(), currentTime.toLocaleString(), userInfo.age]));
    if (err) {
        TE(err);
    }
    else {
        return result;
    }
};
module.exports.create = create;

const update = async function (userInfo) {
    let sql = `CALL updateUser(?,?,?,?,?,?,?)`;
    let err, result, currentTime;
    [err, currentTime] = await to(time.getCurrentTime());
    [err, result] = await to(pool.query(sql, [userInfo.user_Id, userInfo.userName, userInfo.emailId, userInfo.password, userInfo.phoneNumber, userInfo.updatedAt, userInfo.confirmPassword, userInfo.age]));
    if (err) {
        TE(err)
    } else {
        return result;
    }
};
module.exports.update = update;

const getUser = async function (user_Id) {
    let sql = `CALL getUser(?)`;
    let err, result;
    [err, result] = await to(pool.query(sql, [user_Id]));
    if (err) {
        TE(err);
    } else {
        return result;
    }
};
module.exports.getUser = getUser;