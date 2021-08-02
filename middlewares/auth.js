const User=require('./../models/user');

let auth =(req,res,next)=>{
  let token =req.cookies.auth;
  User.findByToken(token,(err,user)=>{
    if(err) throw err;
    if(!user) return res.json({
      error :true
    });

    req.token= token;
    req.user=user;
    next();
  })
}

let adminAuth =(req,res,next)=>{
  if(req.user.user_type !== 'admin'){
    return res.status(400).json({ message: 'Admin access denied' })
  }
  next();
}

let delivery_personAuth =(req,res,next)=>{
  if(req.user.user_type !== 'delivery_person'){
    return res.status(400).json({ message: 'Delivery Person access denied' })
  }
  next();
}

let customerAuth =(req,res,next)=>{
  if(req.user.user_type !== 'customer'){
    return res.status(400).json({ message: 'Customer access denied' })
  }
  next();
}

module.exports={auth, adminAuth, delivery_personAuth, customerAuth};