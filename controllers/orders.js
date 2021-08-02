
const { Cart, User} = require('mongoose').models;
const Order=require('../models/order');

async  function createOrder(req, res) {
  try {
    let data = req.body;
    let cart = await Cart.findOne({_id: data.cart_id});
    if (!cart) {
      throw ('cart Not found');
    }
    const order = new Order({order_stage: data.order_stage,customer: cart.customer._id});
    cart.items.map(function(item) {
      addItem(item);
    });

    function addItem(item) {
      order.items.push(item);
      order.pickup_location.push(item.Addresses[Math.floor(Math.random() * item.Addresses.length)])
    }
    order.save((err,order)=>{
      if(err) {console.log(err);
      {
        return res.status(400).json({ success : false});}
      }
      else{
      res.status(200).json({
         succes:true,
         order : order
      });
      }
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}

async  function ordersList(req, res) {
  try {
    let data = req.body;
    let orders = await Order.find({order_stage: req.query.order_stage});
    if (!orders) {
      throw ('orders Not found');
    }
    res.json(orders);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async  function assignDeliveryPerson(req, res) {
  try {
    let delivery_person_id = req.body.delivery_person;
    let order = await Order.findOne({_id: req.params.id});
    if (!order) {
      throw ('order Not found');
    }
    order.delivery_person_id = delivery_person_id
    order.save()
    res.json(order);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async  function updateOrderStatus(req, res) {
  try {
    let order_stage = req.body.order_stage;
    let order = await Order.findOne({_id: req.params.id});
    if (!order) {
      throw ('order Not found');
    }
    order.order_stage = order_stage
    order.save()
    res.json(order);
  } catch (error) {
    return res.status(500).json(error);
  }
}
module.exports   = {createOrder, ordersList, assignDeliveryPerson, updateOrderStatus}