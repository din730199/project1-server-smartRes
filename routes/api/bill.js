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

  router.get('/getBillById',(req,res)=>{
    var id = req.query.id;
  
        if(id == null || id == undefined)
        {
            res.status(404).json({msg : "Error 404 error"});
        }
        else
        {
            pool.query(`SELECT * FROM public."Bill" where "id" = ${id}`, (err, data) => {
      
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

    router.get('/changeStatus' ,(req,res) => {
      var id = req.query.id;
  
         pool.query(`UPDATE public."Bill"
         SET status=true
         WHERE id=${id};`, (err, data) => {
          res.json({msg : 'successfull'});
         })
      
      
    })
  
  router.post('/postBill', async (req , res) => {
    var Bill = {
      datePay : req.body.datePay,
      status : req.body.status,
      idTable : req.body.idTable,
      sumPrice : req.body.sumPrice,
      emailCustomer : req.body.emailCus
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
        "datePay", status, "idTable", "sumPrice","emailCustomer")
       VALUES ( '${Bill.datePay}', ${Bill.status}, ${Bill.idTable}, ${Bill.sumPrice}, ${Bill.emailCustomer})` );

       

       if(data.rowCount === 1){
        await pool.query(`SELECT
       MAX(id) from public."Bill"`, async (err, data) => {
        console.log(data.rows);
         await arrayFood.forEach( async element => {
          console.log(data.rows[0].max);
          await pool.query(`INSERT INTO public."DetailsBill"(
            "idBill", "idFood", amount)
            VALUES (${data.rows[0].max}, ${element.id}, ${element.sl})`)
        });
       
         
        
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

  router.get('/sumByDay' ,(req,res) => {

    try {
      pool.query(`SELECT SUM("sumPrice") FROM public."Bill" where "datePay" = date('now') `, (err, data) => {
        res.status(200).json({data : data.rows});
       })
    } catch (error) {
      res.json({msg : "server error"})
    }
       
    
    
  })

  router.get('/sumByMonth' ,(req,res) => {

    try {
      pool.query(`SELECT date_trunc('month', "datePay") AS txn_month, sum("sumPrice") as month_sum
      FROM public."Bill"
  GROUP BY date_trunc('month', "datePay")`, (err, data) => {
        res.status(200).json({data : data.rows});
       })
    } catch (error) {
      res.json({msg : "server error"})
    }
       
    
    
  })

  router.get('/sumByYear' ,(req,res) => {

    try {
      pool.query(`SELECT date_trunc('year', "datePay") AS txn_year, sum("sumPrice") as year_sum
      FROM public."Bill"
  GROUP BY date_trunc('year', "datePay")`, (err, data) => {
        res.status(200).json({data : data.rows});
       })
    } catch (error) {
      res.json({msg : "server error"})
    }
       
    
    
  })

  router.get('/sumByWeek' ,(req,res) => {

    try {
      pool.query(`SELECT date_trunc('week', "datePay") AS txn_week, sum("sumPrice") as week_sum
      FROM public."Bill"
  GROUP BY date_trunc('week', "datePay")`, (err, data) => {
        res.status(200).json({data : data.rows});
       })
    } catch (error) {
      res.json({msg : "server error"})
    }
       
    
    
  })
    
module.exports = router;