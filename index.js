const express=require('express');
const mongoose= require('mongoose');
const bodyparser=require('body-parser');
const cookieParser=require('cookie-parser');
const db=require('./config/config').get(process.env.NODE_ENV);
const User=require('./models/user');
const Cart=require('./models/cart');
const {auth} =require('./middlewares/auth');

var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var ordersRouter = require('./routes/orders');


const app=express();
// app use
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use(cookieParser());

// database connection
mongoose.Promise=global.Promise;
mongoose.connect(db.DATABASE,{ useNewUrlParser: true,useUnifiedTopology:true },function(err){
    if(err) console.log(err);
    console.log(`database is connected ${db.DATABASE}`);
});

app.get('/',function(req,res){
    res.status(200).send(`Welcome to login , Order anything`);
});

//routes
app.use('/api', authRouter);
app.use('/api/users',auth, usersRouter);
app.use('/api/orders',auth, ordersRouter);


// listening port
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
});
