let products = [];
let nextId = 1;

exports.listProducts = (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);
  if (isNaN(page) || page < 1) page = 1;
  if (isNaN(limit) || limit < 1) limit = 10;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = products.slice(start, end);
  res.json({
    data: paginated,
    meta: {
      page,
      limit,
      total: products.length
    }
  });
};

exports.getProduct = (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: { code: 404, message: 'Product not found.' } });
  res.json(product);
};

exports.createProduct = (req, res) => {
  const { name, price, stock } = req.body;
  // Validation is handled by validateProduct middleware
  // 409 Conflict: duplicate product name
  if (products.some(p => p.name === name)) {
    return res.status(409).json({ error: { code: 409, message: 'Product name must be unique.' } });
  }
  const product = { id: nextId++, name, price, stock };
  products.push(product);
  res.status(201).json(product);
};

exports.updateProduct = (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: { code: 404, message: 'Product not found.' } });
  const { name, price, stock } = req.body;
  if (name !== undefined) {
    // 409 Conflict: duplicate product name
    if (products.some(p => p.name === name && p.id !== product.id)) {
      return res.status(409).json({ error: { code: 409, message: 'Product name must be unique.' } });
    }
    product.name = name;
  }
  if (price !== undefined) product.price = price;
  if (stock !== undefined) product.stock = stock;
  res.json(product);
};

exports.deleteProduct = (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: { code: 404, message: 'Product not found.' } });
  products.splice(index, 1);
  res.status(204).send();
};
