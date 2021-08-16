const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

router.get('/:id', async (req, res, next) => {
  const usercard = await User.findOne({ where: { id: req.params.id}})
  return res.render('usercard', {usercard, dateCond: (usercard.createdAt == usercard.updatedAt)})
})


module.exports = router;
