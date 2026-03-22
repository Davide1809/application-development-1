let products = [];
let nextId = 1;

// Helper: check if a product name is already taken
function isNameTaken(name, excludeId = null) {
  return products.some(p => p.name === name && p.id !== excludeId);
}

// Helper: find a product by ID or send a 404 response
function findProductOr404(id, res) {
  const product = products.find(p => p.id === parseInt(id));
  if (!product) {
    res.status(404).json({ error: { code: 404, message: 'Product not found.' } });
    return null;
  }
  return product;
}

exports.listProducts = (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);
  if (isNaN(page) || page < 1) page = 1;
  if (isNaN(limit) || limit < 1) limit = 10;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginated = products.slice(startIndex, endIndex);

  res.json({
    data: paginated,
    meta: { page, limit, total: products.length }
  });
};

exports.getProduct = (req, res) => {
  const product = findProductOr404(req.params.id, res);
  if (!product) return;
  res.json(product);
};

exports.createProduct = (req, res) => {
  const { name, price, stock } = req.body;
  if (isNameTaken(name)) {
    return res.status(409).json({ error: { code: 409, message: 'Product name must be unique.' } });
  }
  const product = { id: nextId++, name, price, stock };
  products.push(product);
  res.status(201).json(product);
};

exports.updateProduct = (req, res) => {
  const product = findProductOr404(req.params.id, res);
  if (!product) return;

  const { name, price, stock } = req.body;
  if (name !== undefined) {
    if (isNameTaken(name, product.id)) {
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
  if (index === -1) {
    return res.status(404).json({ error: { code: 404, message: 'Product not found.' } });
  }
  products.splice(index, 1);
  res.status(204).send();
};
