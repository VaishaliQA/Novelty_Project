const router = require('express').Router();
const { Book, User } = require("../../models");

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
