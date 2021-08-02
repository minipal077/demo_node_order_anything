// const User=require('./models/user');

const { Cart, User} = require('mongoose').models;

async  function logout(req, res) {
  try {
    req.user.deleteToken(req.token,(err,user)=>{
      if(err) return res.status(400).send(err);
      res.sendStatus(200);
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}

async  function login(req, res) {
  try {
    let token=req.cookies.auth;
    User.findByToken(token,(err,user)=>{
      if(err) return  res(err);
      if(user) return res.status(400).json({
        error :true,
        message:"You are already logged in"
      });
    
      else{
        User.findOne({'phone':req.body.phone},function(err,user){
          if(!user) return res.json({isAuth : false, message : ' Auth failed ,phone not found'});
  
          user.comparepassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({ isAuth : false,message : "password doesn't match"});
  
            user.generateToken((err,user)=>{
              if(err) return res.status(400).send(err);
              res.cookie('auth',user.token).json({
                isAuth : true,
                id : user._id,
                phone : user.phone
              });
            });  
          });
        });
      }
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}

async  function register(req, res) {
  try {
    // taking a user
    const newuser=new User(req.body);
    if(newuser.password!=newuser.confirm_password)return res.status(400).json({message: "password not match"});
    User.findOne({phone:newuser.phone},function(err,user){
      if(user) return res.status(400).json({ auth : false, message :"phone number exits"});

      newuser.save((err,doc)=>{
        if(err) {console.log(err);
        {
          return res.status(400).json({ success : false});}
        }
        else{
          const cart =new Cart({customer:doc._id});
          cart.save()
          res.status(200).json({
            succes:true,
            user : doc,
            cart : cart
          });
        }
      });
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}


module.exports   = {login, logout, register}