let orders = [];
let nextId = 1;

exports.listOrders = (req, res) => {
  res.json(orders);
};

exports.getOrder = (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: { code: 404, message: 'Order not found.' } });
  res.json(order);
};

exports.createOrder = (req, res) => {
  const { userId, items, total } = req.body;
  if (!userId || !Array.isArray(items) || items.length === 0 || total == null) {
    return res.status(400).json({ error: { code: 400, message: 'Invalid order data.' } });
  }
  // 409 Conflict: duplicate order ID (should not happen with auto-increment, but for demonstration)
  // Not implemented as IDs are auto-generated
  const order = { id: nextId++, userId, items, total, status: 'processing' };
  orders.push(order);
  res.status(201).json(order);
};

exports.updateOrder = (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: { code: 404, message: 'Order not found.' } });
  const { status, items, total } = req.body;
  // 409 Conflict: invalid state transition (example: cannot set status to shipped if already cancelled)
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
  if (index === -1) return res.status(404).json({ error: { code: 404, message: 'Order not found.' } });
  orders.splice(index, 1);
  res.status(204).send();
};
