var express = require('express');
var router = express.Router();
const pool = require('../../connectDB/connectDB');



/*
    @URL = api/bill/getBillByTableId
    @prams = idTable (int)
    @method = GET
    @res = data[]
*/
router.get('/getBillByTableId', (req,res) => {
    var idTable = req.query.idTable;
  
        if(idTable == null || idTable == undefined)
        {
            res.status(404).json({msg : "Error 404 error"});
        }
        else
        {
            pool.query(`SELECT * FROM public."Bill" where "idTable" = ${idTable}`, (err, data) => {
      
                console.log(data);
                
                 res.status(200).json({data : data.rows});
               })

        }
  })

router.get('/getAllBill',(req,res) => {
      pool.query(`SELECT * FROM public."Bill"`,(err,data) => {
          res.status(200).json({data : data.rows});
      })
  })
router.get('/getSumPriceByDatePay' , (req,res) => {
      var date = req.query.date;
      if(date===null|| date === undefined){
        res.status(501).json({msg : 'Phai nhap date'});
      }
      else{
        pool.query(`SELECT
        SUM ("sumPrice") AS total
     FROM
           public."Bill"
     WHERE
        "datePay" = '${date}'`, (err, data) => {
        
          console.log(data + 'bb');
        
          
         res.status(200).json({data : data.rows});
         })
      }
    })
  
  router.post('/postBill', async (req , res) => {
    var Bill = {
      datePay : req.body.datePay,
      status : req.body.status,
      idTable : req.body.idTable,
      sumPrice : req.body.sumPrice
    }

    var arrayFood = req.body.arrayFood ;
    console.log(arrayFood);
    /* 
      [
        {
          id,
          sl
        }
      ]
    */
    
    try {
     var data = await pool.query(`INSERT INTO public."Bill"(
        "datePay", status, "idTable", "sumPrice")
       VALUES ( '${Bill.datePay}', ${Bill.status}, ${Bill.idTable}, ${Bill.sumPrice})` );

       

       if(data.rowCount === 1){
        await pool.query(`SELECT
       MAX(id) from public."Bill"`, (err, data) => {
        console.log(data.rows)
        // await arrayFood.forEach( async element => {
        //   await pool.query(`INSERT INTO public."DetailsBill"(
        //     "idBill", "idFood", amount)
        //     VALUES (${data.rows.id}, ${element.id}, ${element.sl})`)
        // });
       
         
        
        })

        res.json({msg : 'insert successfull'});
       }
       else{
        res.json({msg : 'insert falied'});
       }
    } catch (error) {
      res.json({msg : "server error"})
    }
    
  })
    
module.exports = router;