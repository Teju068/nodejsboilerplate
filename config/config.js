require('dotenv').config();//instatiate environment variables

let CONFIG = {} //Make this global to use all over the application

CONFIG.app = process.env.APP || 'dev';
CONFIG.port = process.env.PORT || '3000';

/**
 * database
 */
CONFIG.db_dialect = process.env.DB_DIALECT || 'mysql';
CONFIG.db_host = process.env.DB_HOST || 'localhost';
CONFIG.db_port = process.env.DB_PORT || '3306';
CONFIG.db_name = process.env.DB_NAME || 'tickle';
CONFIG.db_user = process.env.DB_USER || 'root';
CONFIG.db_password = process.env.DB_PASSWORD || 'raju@123123';

/**
 * passport authentication
 */
CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || 'As@243cawd23ef_3d2';
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || '10000';

/**
 *  Push Notification
 */
CONFIG.android_service_key = process.env.ANDROID_PUSH_SERVICE_KEY || '14212421433221';
module.exports = CONFIG;
