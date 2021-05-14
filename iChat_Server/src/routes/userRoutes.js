const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userData");

const userRouter = express.Router();

//GET All registered users
userRouter.get('/users', (req,res) => {

    User.find({},(err,data)=>{
        if(err){
            console.log(err)
        }
        if(data){
            res.send(data)
        }
    })    
});

//GET user profile
userRouter.get('/myprofile/:id', (req,res) => {
    const user_id = req.params.id;
    User.findOne({"_id": user_id})
      .then((user)=>{
          res.send(user);
      });
});

//change image
userRouter.post('/updateimage/:id', (req,res) => {
    const user_id = req.params.id;

    var update = User.findByIdAndUpdate(user_id,{
        imageUrl:req.body.image
    });
     update.exec(function (err,data){
      res.status(200).send(data);
     })
    });
  

//POST search User
userRouter.post('/search', (req,res) => {
    const username=req.body.username;
    User.find( { "username": { $regex:`${username}`, $options: "i" } })
       .then((users)=>{
         console.log('Users..',users);
         res.send(users);
       })
});

//POST Register
userRouter.post('/register', (req,res) => {
    // console.log(req.body);
    if( req.body.user_name == null     || req.body.user_name == ''    ||
        req.body.user_email == null    || req.body.user_email == ''   ||
        req.body.user_password == null || req.body.user_password == '' )
    {
        res.json({success:false, message: 'All Fields Are Required'});
    }
    else
    {   const uname = req.body.user_name;
        const emailid = req.body.user_email;
        // find existing user with same email or username
        User.findOne({$or:[{username:uname},{email:emailid}]})
        .then(function(user){
            if(user !== null)
            { //console.log(user);
                res.json({success:false, message: 'User Already exists'}); 
            }
            else
            {
                var pwd= bcrypt.hashSync(req.body.user_password,10);
                var user_data = {
                    username   : uname,
                    email      : emailid,
                    password   : pwd
                    ,imageUrl  : 'default_userpic.png'  
                };
                var user = User(user_data);
                user.save((err)=>{
                    if(err){
                        res.json({success:false, message:'Error Occurred...try again'});
                    } else{
                        res.json({success:true, message: 'User Account Created Successfully',user});
                    }
                }); 
            }
        })
        
    }

});

//POST login
userRouter.post('/login', (req,res) => {
    // var err;
    const emailid = req.body.user_email;
    const password = req.body.user_password;
    let user_data = req.body;
    // console.log(req.body);

    User.findOne({email : emailid})
    .then(function(user){
        if(user === null)
        {
            // res.status(401).send('Invalid User - SignUp for Login');
            res.json({success:false, message: 'Invalid User - SignUp for Login'});
        }
        else
        {
            // if(user.user_password === password)
            if(bcrypt.compareSync(password,user.password))
            {
                //Valid User
                const id=user._id;
                let payload = {subject:id};
                let token = jwt.sign(payload,'secretKey');
                // console.log(token);
                res.status(200).send({'token':token,'user':user, success:true, message: 'Login Success'});
            } //send user_role after login success
            else
            {
                // res.status(401).send('Invalid Username or Password');
                res.json({success:false, message: 'Invalid Username or Password'});
            }
        }
    })
});

userRouter.post('/newContact', (req,res) => {
    console.log(req);
    User.updateOne({username:req.body.username},{contactList:req.body.contactlist},(err,data)=>{
        if(err){
            console.log(err)
        }
        if(data){
            console.log(data)
            res.status(200).send(data)
        }
    })
})

userRouter.post('/addNewContact/:id', (re,res) => {
    const user_id = req.params.id;
    const newUser = req.body.username;
    console.log(req.body);
    var newUserExists =false;
    User.findOne({"_id": user_id})
        .then((user)=>{
            user.contacts.forEach(contact =>{
                if(contact.uname == newUser)
                {
                    newUserExists =true;
                }
            })
        })

    if(newUserExists == false)
    {
        var contact = { uname :req.body.username };
        var contactUpdate = User.findByIdAndUpdate(user_id, { $push : {$contacts : contact} });
        contactUpdate.exec((err,data)=>{
            if(err){
                console.log(err);
            }
            else{
                res.status(200).send(data);
            }
            
        })
    }
    else
    {
        res.json({success:false, message: 'User already exists in your contacts'});
    }
    
})


userRouter.post("/blockUser", (req,res) => {
    console.log(req);
    User.updateOne({username:req.body.username},{blockedList:req.body.blockedlist},(err,data)=>{
        if(err){
            console.log(err)
        }
        if(data){
            console.log(data)
            res.status(200).send(data)
        }
    })
})

userRouter.post("/blockUser/:id", (req,res) => {
    const user_id = req.params.id;
    const blockUser = req.body.toUser;

    User.findOne({"_id":user_id})
        .then((user) =>{
            user.contacts.forEach(contact =>{
                if(contact.uname == blockUser){
                    contact["isBlocked"] = !contact["isBlocked"];
                }
            })
            user.save();
            res.status(200);
        })
})


userRouter.post("/muteUser", (req,res) => {
    console.log(req);
    User.updateOne({username:req.body.username},{mutedList:req.body.mutedlist},(err,data)=>{
        if(err){
            console.log(err)
        }
        if(data){
            console.log(data)
            res.status(200).send(data)
        }
    })
})

userRouter.post("/muteUser/:id", (req,res) => {
    const user_id = req.params.id;
    const muteUser = req.body.toUser;

    User.findOne({"_id":user_id})
        .then((user) =>{
            user.contacts.forEach(contact =>{
                if(contact.uname == muteUser){
                    contact["isMuted"] = !contact["isMuted"];
                }
            })
            user.save();
            res.status(200);
        })
})


module.exports = userRouter;