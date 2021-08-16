const express = require('express');
const router = express.Router();
const { User } = require('../db/models');


router.get('/del/:id', async (req, res) => {
  await User.destroy({
    where: {
      id: req.params.id
    }
  })
  res.redirect('/account')
})


module.exports = router;
