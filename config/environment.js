
// This file will contain all the environments

const development = {
    name: 'development',
    asset_path:'./assets',
    session_cookie_key:'blahsomething',
    db: 'codeial_development',
    smtp:{
        service: 'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure : false,
        auth: {
            user:'vishwatej888@gmail.com',
            pass: 'gigjhbyiluymoamn' // go to google manage accounts-> security on left -> apps -> device computer, service mail -> genarate password
            // regenerate the password because it expires   gigjhbyiluymoamn
        }
    },
    google_client_id : "806814583785-nl69erc6tsmvllsi97dug9ib5m68g30d.apps.googleusercontent.com",
    google_client_secret : "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",
    google_callback_url : "http://localhost:800/users/auth/google/callback",
    jwt_secret : 'codeial',
}

const production = {
    name: 'production'
}

module.exports = development;

// zlwlftmuzmpzuocb