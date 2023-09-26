const sendEmail  = require("./sendEmail");


const sendResetPasswordEmail=  async({username, email, passwordToken, origin})=>{

        const resetLink = `${origin}/api/v1/auth/resetPassword?token=${passwordToken}&email=${email}`
    
        const message = `<h5>please reset your password by clicking the following link:
        <a href="${resetLink}">Click!</a></h5>`
        return sendEmail({
            to:email,
            subject: "Reset Password",
            html: `Hello ${username},
            ${message}` 
        })
    }


 module.exports = sendResetPasswordEmail