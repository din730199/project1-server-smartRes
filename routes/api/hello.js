var express = require('express');
var router = express.Router();

router.get('/',(req,res) => {
    res.send('hello')
})

router.get('/hello123',(req,res) => {
    res.send('hello123')
})

module.exports = router;