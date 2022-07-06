'use strict';
const { TE } = require('../services/util.service');
const pool = require('../config/connection');
const { to, ReE, ReS } = require('../services/util.service');
const time = require('../services/time.service');

const create = async function (userInfo) {
    let sql = `CALL createUser(?,?,?,?,?,?,?,?,?)`;
    let err, result;
    [err, result] = await to(pool.query(sql, ["teju068", userInfo.userName, userInfo.emailId, userInfo.password, userInfo.phoneNumber, userInfo.createdAt, userInfo.updatedAt, userInfo.confirmPassword, userInfo.age]));
    if (err) {
        console.log(err)
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

const getUser = async function (user_id) {
    let sql = `CALL getUser(?)`;
    let err, result;
    [err, result] = await to (pool.query(sql, [user_id]));
    if (err) {
        console.log("Reached in error   "+err.message)
        TE(err);
    } else {
        return result;
    }
};
module.exports.getUser = getUser;


const getAllUsers  = async function() {
    let err, result;
    [err, result] = await to (pool.query("select * from user"))
    if(err) {
        console.log(err)
        TE(err)
    }else {
        return result;
    }
}
module.exports.getAllUsers = getAllUsers