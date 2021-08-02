
var mongoose=require('mongoose');
const orderSchema=mongoose.Schema({
  items: [{
    id: {type: Number},
    name: {type: String},
    quantity: {type: Number},
  }],
  order_stage:{ type:String, 
    enum:[ 'TaskCreated','ReachedStore','ItemsPicked','Enroute','Delivered','Canceled'],
    default: 'TaskCreated' },
  pickup_location:[{ type:String }],
  customer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  delivery_person_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports=mongoose.model('Order',orderSchema);
