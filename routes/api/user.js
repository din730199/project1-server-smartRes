var express = require('express');
var router = express.Router();
const pool = require('../../connectDB/connectDB');
const { check, validationResult } = require('express-validator');



/* GET check login. */
router.post('/checkLogin.marvelTeam', function(req, res, next) {

    
    var userObj = {
        email : req.body.email,
        password : req.body.password
    }
    console.log(userObj.email+" : "+userObj.password);
    
    if(userObj.email === "" || userObj.password === "" )
    {
        res.json({msg : "Email và Password không được để trống !!!"})
    }
    else if(userObj.email === null || userObj.password === null || userObj.email === undefined || userObj.password === undefined )
    {
        res.json({msg : "Lỗi hệ thống !!!"})
    }
    else if(!validateEmail(userObj.email))
    {
        res.json({msg : "Email sai định dạng !!!"})
    }
    else
    {
        pool.connect((err, client, done) => {
            if (err) throw err
            client.query('SELECT * FROM public."Customer" where email = $1 and password = $2',[userObj.email,userObj.password], (err, data) => {
                console.log(data.rows);
                
                if(data.rows.length !== 0)
                {
                    res.json(data.rows);
                }
                else{
                    res.json({msg : "Sai email hoặc password !!!"});
                }
               
                
              })
          })

        
    }
});

/* checklogin user */
router.post('/checkLoginUser', function(req, res, next) {

    
    var userObj = {
        email : req.body.email,
        password : req.body.password
    }
    console.log(userObj.email+" : "+userObj.password);
    
    if(userObj.email === "" || userObj.password === "" )
    {
        res.json({msg : "Email và Password không được để trống !!!"})
    }
    else if(userObj.email === null || userObj.password === null || userObj.email === undefined || userObj.password === undefined )
    {
        res.json({msg : "Lỗi hệ thống !!!"})
    }
    else if(!validateEmail(userObj.email))
    {
        res.json({msg : "Email sai định dạng !!!"})
    }
    else
    {
        pool.connect((err, client, done) => {
            if (err) throw err
            client.query('SELECT * FROM public."Users" where email = $1 and password = $2',[userObj.email,userObj.password], (err, data) => {
                console.log(data.rows);
                
                if(data.rows.length !== 0)
                {
                    res.json(data.rows);
                }
                else{
                    res.json({msg : "Sai email hoặc password !!!"});
                }
               
                
              })
          })

        
    }
});

/* POST sign up. */
router.post('/postSignup.marvelTeam', function(req, res, next) {
    var userObj = {
        email : req.body.email,
        password : req.body.password,
        repassword : req.body.repassword,
        name : req.body.name
    }

    console.log(userObj.email + " : " + userObj.password);
    

    if(userObj.email === "" || userObj.password === "" || userObj.name === ""  )
    {
        res.json({msg : "Email, Name và Password không được để trống !!!"})
    }
    else if(userObj.email === null || userObj.password === null || userObj.name === null || userObj.email === undefined || userObj.password === undefined || userObj.name === undefined )
    {
        res.json({msg : "Lỗi hệ thống !!!"})
    }
    else if(!validateEmail(userObj.email))
    {
        res.json({msg : "Email sai định dạng !!!"})
    }
    else if(userObj.password!=userObj.repassword){
        res.json({msg : "Nhập lại mật khẩu không đúng !!!"})
    }
    else
    {
        pool.query('INSERT INTO public."Customer"(email, password, name) VALUES ($1, $2, $3)',[userObj.email,userObj.password,userObj.name], (err, data) => {
          
            if (err) {
                res.json({msg : "Email đã được đăng ký !!!"})
            } else {
                res.json({msg : "Đăng ký thành công !!!"})
            }
           
            
          })
    }
    
    

   

      
  });

// POST change password
router.post('/changePassword.marvelTeam', (req,res) => {
    var userChange = {
        email : req.body.email,
        password : req.body.password,
        newPassword : req.body.newPassword
    }   
    var msg = [];
    
  
      if(userChange.email === "" || userChange.password === "")
      {
          msg = [...msg,"Các trường không được để trống !!!"];
      }
      else if(!validateEmail(userChange.email))
      {
        msg = [...msg,"Email sai định dạng !!!"];
      }
      else{
        pool.query('UPDATE public."Customer" SET password=$1 WHERE email=$2 AND password=$3;',[userChange.newPassword,userChange.email,userChange.password], (err, data) => {
            console.log(data);
            
            if (data.rowCount === 0) {
                msg = [...msg,"Sai mật khẩu !!!"];
                
            } else {
                
                msg = [...msg,"Đổi pass thành công !!!"];
                
            }
            
            res.json({msg : msg});
          })
      }

     


})

//changepassword user

router.post('/changePassUser', (req,res)=>{
    var User={
        email : req.body.email,
        password : req.body.password,
        newPassword : req.body.newPassword
    }

    var msg = [];
    
  
      if(User.email === "" || User.password === "")
      {
          msg = [...msg,"Các trường không được để trống !!!"];
      }
      else if(!validateEmail(User.email))
      {
        msg = [...msg,"Email sai định dạng !!!"];
      }
      else{
        pool.query('UPDATE public."Customer" SET password=$1 WHERE email=$2 AND password=$3;',[User.newPassword,User.email,User.password], (err, data) => {
            console.log(data);
            
            if (data.rowCount === 0) {
                msg = [...msg,"Sai mật khẩu !!!"];
                
            } else {
                
                msg = [...msg,"Đổi pass thành công !!!"];
                
            }
            
            res.json({msg : msg});
          })
      }

})

// POST change Info User
router.post('/changeInfoUser.marvelTeam', (req,res) => {
    var UserInfo = {
        email : req.body.email,
        password : req.body.password,
        name : req.body.name,
        avatar : req.body.avatar

    }
    var msg = [];
    if(UserInfo.name === "")
    {
        msg = [...msg,"Name không được để trống !!!"];
    }
    else
    {
        pool.query('UPDATE public."Users" SET name=$1 , avatar=$2 Where email=$3 AND password=$4;',[UserInfo.name,UserInfo.avatar,UserInfo.email,UserInfo.password], (err, data) => {
            console.log(data);
            
            if (data.rowCount === 0) {
                msg = [...msg,"Sai mật khẩu !!!"];
                
            } else {
                msg = [...msg,"Update thành công !!!"];
                
            }
            
            res.json({msg : msg});
          })

    }

    


})

router.get('/getAllUser',(req,res) => {
    pool.query(`SELECT * FROM public."Users"`,(err,data) => {
        res.status(200).json({data : data.rows});
    })
})


var validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
module.exports = router;
