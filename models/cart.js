var mongoose=require('mongoose');
const config=require('../config/config').get(process.env.NODE_ENV);

const cartSchema=mongoose.Schema({
  items: [{
	id: {type: Number},
    name: {type: String},
    Addresses:[],
    quantity: {type: Number},
  }],
  totalItems:{ type:Number },
  customer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

});


module.exports=mongoose.model('Cart',cartSchema);
