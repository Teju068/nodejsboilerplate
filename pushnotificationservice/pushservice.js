const CONFIG = require('../config/config');
var FCM = require('fcm-push');

var serverKey = CONFIG.android_service_key;
var fcm = new FCM(serverKey);

/**
 * Registration Ids/ Topics
 * Limit to number of registration Ids is 1000,
 * Topics are free and unlimited
 * @param {*} pushObject 
 * 
 */
const sendNotification = async function (pushObject) {
    var message = {
        registration_ids: pushObject.registration_ids, // required fill with device token or topics
        collapse_key: pushObject.collapse_key,
        data: {
            data: pushObject.data
        },
        notification: {
            title: pushObject.title,
            body: pushObject.body
        }
    };

    //promise style
    fcm.send(message)
        .then(function (response) {
            console.log("Successfully sent with response: ", response);
        })
        .catch(function (err) {
            console.log("Something has gone wrong!");
            console.error(err);
        });
};
