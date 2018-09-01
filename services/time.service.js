'use strict'

const getCurrentTime = async function () {
    let currentTime = new Date();
    return currentTime;
};

module.exports.getCurrentTime = getCurrentTime;