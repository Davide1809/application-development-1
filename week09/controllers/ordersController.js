let orders = [];
let nextId = 1;

// Helper: find an order by ID or send a 404 response
function findOrderOr404(id, res) {
  const order = orders.find(o => o.id === parseInt(id));
  if (!order) {
    res.status(404).json({ error: { code: 404, message: 'Order not found.' } });
    return null;
  }
  return order;
}

exports.listOrders = (req, res) => {
  res.json(orders);
};

exports.getOrder = (req, res) => {
  const order = findOrderOr404(req.params.id, res);
  if (!order) return;
  res.json(order);
};

exports.createOrder = (req, res) => {
  // Validation is handled by validateOrder middleware
  const { userId, items, total } = req.body;
  const order = { id: nextId++, userId, items, total, status: 'processing' };
  orders.push(order);
  res.status(201).json(order);
};

exports.updateOrder = (req, res) => {
  const order = findOrderOr404(req.params.id, res);
  if (!order) return;

  const { status, items, total } = req.body;
  if (status !== undefined) {
    if (order.status === 'cancelled' && status !== 'cancelled') {
      return res.status(409).json({ error: { code: 409, message: 'Cannot update a cancelled order.' } });
    }
    order.status = status;
  }
  if (items !== undefined) order.items = items;
  if (total !== undefined) order.total = total;
  res.json(order);
};

exports.deleteOrder = (req, res) => {
  const index = orders.findIndex(o => o.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: { code: 404, message: 'Order not found.' } });
  }
  orders.splice(index, 1);
  res.status(204).send();
};
