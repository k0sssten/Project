const router = require('express').Router();

router.get('/', (req, res) => {
  res.redirect('/startpage');
});

module.exports = router;
