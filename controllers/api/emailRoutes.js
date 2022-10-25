const router = require('express').Router();
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const fromEmail = process.env.TEST_FROM;
const toEmail = process.env.TEST_TO;
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const { Book, User } = require("../../models");

router.post('/sendEmail/:title/:thumbnail/:name', async (req, res) => {  
  try {  
    // define message date from api URL?
    // hard coding variables for now during testing
    // TODO: add additional book details from API post
    const thumbnail = decodeURIComponent(req.params.thumbnail);
 
    //! Must have a TO to test
    const msg = {
      template_id: "d-e8b4d3e225d644e6ad26a1c7f1c73f3e",
      to: toEmail, // your recipient
      from: fromEmail, // your verified sender
      dynamic_template_data: {
        name: req.params.name,
        bookTitle: req.params.title,
        bookUrl: thumbnail,
        confirm: "https://www.mandrill.fun",
      },
    };
    sgMail.send(msg)
    console.log('Sent!')
    res.send()
  } catch (err) {
    res.status(500).json(err);
  }
} )



router.get('/api/email/:id', (req, res) => {      
  
    // find one book by its `id` value
    Book.findOne(
      {
        where: {
          isbn: req.params.id
        },
        attributes: ['id', 'isbn13', 'title', 'available'],
      }
    ).then(book =>{
      if(!book){
        res.status(404).json({ message: 'No book found with this id' });
        return;
      }

      book.availability = false;
      res.json(book);

      book.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
      });
    })
    .catch((e) => console.log("error", e));
});
    
module.exports = router;
