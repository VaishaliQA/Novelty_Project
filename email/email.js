// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const sgMail = require("@sendgrid/mail");

function sendMessage(recipient, name, bookUrl, confirmUrl) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    template_id: "d-7dcccafe443d47329bc43438c60cf1e1",
    to: recipient, // your recipient
    from: "michaelaaron@gmail.com", // your verified sender
    subject: "Sending with SendGrid is Fun",
    dynamic_template_data: {
      name: name,
      bookUrl: bookUrl,
      confirm: confirmUrl,
    },
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent!");
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = sendMessage;

sendMessage(
  "macgreene14@gmail.com",
  "Jon",
  "https://m.media-amazon.com/images/I/51F0uan3+EL._AC_SY780_.jpg",
  "https://www.mandrill.fun"
);
