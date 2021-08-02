
const { Cart, User} = require('mongoose').models;

async  function addToCart(req, res) {
  try {
    let _id = req.params.id;
    let cart = await Cart.findOne({_id: _id});
    if (!cart) {
      throw ('Not found');
    }
    req.body.items.map(function(item) {
      addItem(item);
    });

    function addItem(item) {
      var index = cart.items.findIndex(x => x.id == item.id)
      if (index === -1) {
        cart.items.push(item);
      }
    }
    cart.save()
    res.json(cart);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async  function deliveryPersonList(req, res) {
  try {
    let users = await User.find({user_type: 'delivery_person'});
    if (!users) {
      throw ('users Not found');
    }
    res.json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
}
module.exports   = {addToCart, deliveryPersonList}