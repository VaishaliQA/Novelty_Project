const router = require('express').Router();
const { urlencoded } = require("express");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const fromEmail = process.env.TEST_FROM;
const toEmail = process.env.TEST_TO;
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const { Book, User } = require("../../models");
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/sendEmail', async (req, res) => {  
  try {  
    const msg = {
      template_id: "d-e8b4d3e225d644e6ad26a1c7f1c73f3e",
      // hard coding 'TO' and 'FROM' for now during testing
      // to: req.body.email, // your recipient
      to: toEmail, // your recipient
      from: fromEmail, // your verified sender
      dynamic_template_data: {
        name: req.body.name,
        bookTitle: req.body.title,
        bookUrl: req.body.thumbnail,
        confirm: "http://localhost:3001/api/email/" + req.body.id + "/" + req.session.user_id
      },
    };
    sgMail.send(msg)
    console.log('Sent!')
    res.send()
  } catch (err) {
    res.status(500).json(err);
  }
} )


router.get('/:id/:borrower', (req, res) => {      
  
    // find one book by its `id` value
    Book.findOne(
      {
        where: {
          id: req.params.id
        },
        attributes: ['id', 'isbn13', 'title', 'available'],
      }
    ).then(book =>{
      if(!book){
        res.status(404).json({ message: 'No book found with this id' });
        return;
      }

      console.log("before: " + book.availabile);

      book.available = false;
      book.borrower_id = req.params.borrower;

      console.log("after: " + book.availabile);

      res.status(200);
      res.redirect('http://localhost:3001/librarypage')

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