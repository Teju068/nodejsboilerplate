const authService = require('../services/auth.service');
const userService = require('../services/user.service');
const { to, ReE, ReS } = require('../services/util.service');
const securityService = require('../services/security.service');

const create = async function (req, res) {
    const body = req.body;

    if (!body.emailId && !body.phoneNumber) {
        return ReE(res, 'Please enter an email or phone number to register.');
    } else if (!body.password) {
        return ReE(res, 'Please enter a password to register.');
    } else {
        let err, user, token;
        [err, hash] = await to (securityService.encryptPassword(body.password));
        if (err) return ReE(res, err, 422);
        body.password = hash;
        body.confirmPassword = hash
        [err, user] = await to(authService.createUser(body));
        if (err) return ReE(res, err, 422);
        [err, token] = await to(securityService.getJWT(body.user_Id));
        return ReS(res, { message: 'Successfully created new user.', user: user, token: token }, 201);
    }
};
module.exports.create = create;

const update = async function (req, res) {
    const body = req.body;
    if (!body.emailId && !body.phoneNumber) {
        return ReE(res, 'Please enter an email or phone number to register.');
    } else if (!body.password) {
        return ReE(res, 'Please enter a password to register.');
    } else {
        let err, user;
        [err, hash] = await to (securityService.encryptPassword(body.password));
        if (err) return ReE(res, err, 422);
        body.password = hash;
        [err, user] = await to(authService.updateUser(body));
        if (err) return ReE(res, err, 422);
        return ReS(res, { message: "User detail updated successfully", user: body }, 201);
    }
};
module.exports.update = update;

const login = async function (req, res) {
    const body = req.body;
    let err, user, token,userInfo;

    userInfo = req.body;
    [err, user] = await to(authService.authUser(userInfo[0]));
    if (err) return ReE(res, err, 422);
    
    [err, token] = await to(securityService.getJWT(body.user_Id));
    return ReS(res, { token: token, user: user },201);
};
module.exports.login = login;

const getUser = async function ( req, res) {
    let err, user;
    var userId = req.params["user_id"];
    [err, user] = await to(userService.getUser(userId))
    if(err) return ReE(res,err, 400);

    return  ReS(res, {user: user},200);
};
module.exports.getUser = getUser

const getAllUsers = async function ( req, res) {
    let err, users;
    [err, users]  = await to(userService.getAllUsers())
    if(err) return ReE(res, error, 500);

    return ReS(res, {users: users}, 200)
}
module.exports.getAllUsers = getAllUsers