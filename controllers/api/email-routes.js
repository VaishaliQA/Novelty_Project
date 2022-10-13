const router = require('express').Router();
const { Book, User } = require("../../models");

router.get('/api/email/:id', (req, res) => {      
    // find one book by its `id` value
    Book.findOne(
      {
        where: {
          isbn: req.params.id
        },
        attributes: ['isbn', 'title'],
      }
    ).then(dbCategoryData =>{
      if(!dbCategoryData){
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbCategoryData);
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });
    
module.exports = router;
