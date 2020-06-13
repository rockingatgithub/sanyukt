const fs= require('fs');
const rfs= require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

//crete a rotating file stream....
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'sanyukt_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.google.com',
        port: 587,
        secure: false,
        auth: {
            user: 'sidproductionmail@gmail.com',
            pass: '2509@Course'
        }
    },
    google_client_id: "419536015092-7md7csdcss45prfes7h89cp0a18uaq1t.apps.googleusercontent.com",
    google_client_secret: "CDOD4cIAkOnQbzkTz1JpafVy",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'sanyukt',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}

const production = {
    name: 'production',
    asset_path: process.env.SANYUKT_ASSET_PATH,
    session_cookie_key: process.env.SANYUKT_SESSION_COOKIE_KEY,
    db: process.env.SANYUKT_DATABASE,
    smtp: {
        service: process.env.SANYUKT_SMTP_SERVICE,
        host: process.env.SANYUKT_SMTP_HOST,
        port: process.env.SANYUKT_SMTP_PORT,
        secure: process.env.SANYUKT_SMTP_SECURE,
        auth: {
            user: process.env.SANYUKT_SMTP_AUTH_USER,
            pass: process.env.SANYUKT_SMTP_AUTH_PASS
        }
    },
    google_client_id: process.env.SANYUKT_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.SANYUKT_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.SANYUKT_GOOGLE_CALL_BACK_URL,
    jwt_secret: process.env.SANYUKT_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}

module.exports = eval(process.env.SANYUKT_ENVIRONMENT) === undefined ? development : eval(process.env.SANYUKT_ENVIRONMENT);