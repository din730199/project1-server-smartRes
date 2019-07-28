var express = require('express');
var router = express.Router();
const pool = require('../../connectDB/connectDB');

/*
    @URL = api/table/getTableByType
    @method = GET
    @params = idType
    @res = data[]
*/
router.get('/getTableByType', (req,res) => {
    var idType = req.query.idType;
    if(idType === null || idType === undefined)
    {
        res.json({msg : "Tham số null hoặc undefined"});
    }
    pool.query(`SELECT * FROM public."TableRes" tr, public."typeTable" tt where tr."idType" = tt."id" AND tt."id" = $1`,[idType], (err, data) => {
       
        res.json({data : data.rows});
      })
})

module.exports = router;