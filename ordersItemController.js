var OrderItem = require("../dal/orderitemsdal");

exports.getAll = function (req, res) {
  console.log("calling controller function");
  OrderItem.getAllOrderItem(function (err, orderItem) {
    if (err) res.send(err);
    res.send(orderItem);
  });
};

exports.insert = function (req, res) {
  var new_OI = new OrderItem(req.body);
  console.log(new_OI);

  //handles null error
  if (!new_OI.product_id || !new_OI.order_id) {
    res
      .status(400)
      .send({ error: true, message: "Please provide prod id and order id" });
  } else {
    OrderItem.createOrderItem(new_OI, function (err, orderItem) {
      if (err) res.send(err);
      res.json(orderItem);
    });
  }
};

exports.getBy = function (req, res) {
  OrderItem.getOrderItemById(req.params.id, function (err, orderItem) {
    if (err) res.send(err);
    res.json(orderItem);
  });
};

exports.update = function (req, res) {
  OrderItem.updateById(
    req.params.id,
    new OrderItem(req.body),
    function (err, orderItem) {
      if (err) res.send(err);
      res.json(orderItem);
    }
  );
};

exports.remove = function (req, res) {
  OrderItem.remove(req.params.id, function (err, orderItem) {
    if (err) res.send(err);
    res.json({ message: "Order successfully deleted" });
  });
};