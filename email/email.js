// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const sgMail = require('@sendgrid/mail')

export function sendMessage(recipient, name, bookUrl, confirmUrl) {

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
    template_id: "d-e8b4d3e225d644e6ad26a1c7f1c73f3e",
    to: recipient, // your recipient
    from: 'jon@fart.institute', // your verified sender
    subject: 'Sending with SendGrid is Fun',
    dynamic_template_data: {
        "name": name,
        "bookUrl": bookUrl,
        "confirm": confirmUrl
    }
    }
    sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent!')
    })
    .catch((error) => {
        console.error(error)
    })
}

sendMessage("jonshogren@fart.institute", "Jon", "https://m.media-amazon.com/images/I/51F0uan3+EL._AC_SY780_.jpg", "https://www.mandrill.fun")