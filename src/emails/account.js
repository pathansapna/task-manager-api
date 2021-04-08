const sgMail = require('@sendgrid/mail')
// const sendgridAPIkey = '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'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) =>{
    sgMail.send({
        to: email,
        from: 'pathansapna@gmail.com',
        subject: 'Thanks for joining in',
        text: 'Welcome to the app, '+name+' . Let me know how you along with the app.',
        // html: ''
    })
}

const sendCancelationEmail = (email, name) =>{

    sgMail.send({
        to: email,
        from: 'pathansapna@gmail.com',
        subject: 'Sorry to see you go',
        text: 'Goodbye,'+ name+' . I hope to see you back sometime soon.'
    }).then(()=>{
            console.log('Message send');
        }).catch((error) => {
            console.log(error.response.body)
            // console.log(error.response.body.errors[0].message)
        })
}
module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}

// sgMail.send({
//     to:  'sapnashaikh69@gmail.com',
//     from: 'pathansapna@gmail.com',
//     subject: 'This is my first creation',
//     text: 'I hope this one actually get to you.'
// }).then(()=>{
//     console.log('Message send');
// }).catch((error) => {
//     console.log(error.response.body)
//     // console.log(error.response.body.errors[0].message)
// })