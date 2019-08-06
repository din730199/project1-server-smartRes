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

    router.post('/addBill', (req,res)=> {
      var billObj={
          datePay = req.query.datePay,
          status = req.query.status,
          idTable = req.query.idTable,
          foodID = req.query.foodID,
          sumPrice = req.query.sumPrice
      }

      pool.query('INSERT INTO public."Bill"("datePay", status, "idTable", "foodID", "sumPrice")VALUES ($1,$2,$3,$4,$5);',[billObj.datePay,billObj.status,billObj.idTable,billObj.foodID,billObj.sumPrice], (err, data) => {
        
          if (err) {
              res.json({msg : "Error"})
          } else {
              res.json({msg : "Thành công !!!"})
          }
         
          
        })
  })
    
module.exports = router;