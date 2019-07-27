var express = require('express');
var router = express.Router();
const pool = require('../../connectDB/connectDB');

/*
    @URL = api/Food/getAllFood
    @method = GET
    @res = data[]
*/
router.get('/getAllFood', (req,res) => {
    pool.query('SELECT f.* FROM public."Food" f, public."typeFood" tf where f.type = tf.id', (err, data) => {
       
        res.json({data : data.rows});
      })
})

/*
    @URL = api/Food/getFoodByType
    @method = GET
    @params = type
    @res = data[]
*/
router.get('/getFoodByType', (req,res) => {
    var type = req.query.type;

    pool.query('SELECT * FROM public."Food" f, public."typeFood" tf where f.type = tf.id AND f.type = $1',[type], (err, data) => {
       
        res.json({data : data.rows});
      })
})

/*
    @URL = api/Food/getFoodByType
    @method = GET
    @params = name
    @res = data[]
*/
router.get('/getFoodByKeyword', (req,res) => {
  var name = req.query.name;

  console.log(name);
  
    pool.query(`SELECT * FROM public."Food" f, public."typeFood" tf where f.type = tf.id AND f."foodName" LIKE '%${name}%'`, (err, data) => {
    
     console.log(data);
     
      res.json({data : data.rows});
    })
})

router.get('/getTrangMieng' , (req , res) => {
    pool.query(`SELECT id, "foodName", price, "dateCreated", image, "dateEdit", type, "order"
	FROM public."Food" 
	where type = 3`, (err, data) => {
    
        console.log(data);
        
         res.json({data : data.rows});
       })
})
module.exports = router;