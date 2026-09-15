const express = require("express");
const JsonCollection = require("../db");
const { authenticateToken, authorizeRoles } = require("../middleware/auth");

const router = express.Router();
const products = new JsonCollection("products.json");

// GET /products?limit=5&sort=asc  -> giống fakestoreapi
router.get("/", (req, res) => {
  let items = products.findAll();

  const { limit, sort } = req.query;
  if (sort === "asc") items = [...items].sort((a, b) => a.id - b.id);
  if (sort === "desc") items = [...items].sort((a, b) => b.id - a.id);
  if (limit) items = items.slice(0, Number(limit));

  res.json(items);
});

// GET /products/categories
router.get("/categories", (req, res) => {
  const items = products.findAll();
  const categories = [...new Set(items.map((p) => p.category))];
  res.json(categories);
});

// GET /products/category/:categoryName
router.get("/category/:categoryName", (req, res) => {
  const items = products.findAll();
  const filtered = items.filter((p) => p.category === req.params.categoryName);
  res.json(filtered);
});

// GET /products/:id
router.get("/:id", (req, res) => {
  const item = products.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  res.json(item);
});

// POST /products (chỉ admin)
router.post("/", authenticateToken, authorizeRoles("admin"), (req, res) => {
  const { title, price, category } = req.body;
  if (!title || price === undefined || !category) {
    return res.status(400).json({ message: "Thiếu title/price/category" });
  }
  const defaultImg =
    req.body.image ||
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&h=800&q=85&sig=1-1";

  const newProduct = products.create({
    title: req.body.title,
    price: Number(req.body.price),
    oldPrice: req.body.oldPrice ? Number(req.body.oldPrice) : undefined,
    description: req.body.description || "",
    category: req.body.category,
    brand: req.body.brand || "TechStore",
    stock: req.body.stock !== undefined ? Number(req.body.stock) : 10,
    warranty: req.body.warranty || "12 months",
    image: defaultImg,
    images: req.body.images || [defaultImg],
    rating: req.body.rating || { rate: 5.0, count: 1 },
    variants: req.body.variants || {},
    specifications: req.body.specifications || [],
    promotions: req.body.promotions || [],
  });
  res.status(201).json(newProduct);
});

// PUT /products/:id (thay toàn bộ, chỉ admin)
router.put("/:id", authenticateToken, authorizeRoles("admin"), (req, res) => {
  const existing = products.findById(req.params.id);
  if (!existing) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

  const updated = products.updateById(
    req.params.id,
    {
      ...existing,
      ...req.body,
      price: req.body.price !== undefined ? Number(req.body.price) : existing.price,
      stock: req.body.stock !== undefined ? Number(req.body.stock) : existing.stock,
      oldPrice: req.body.oldPrice !== undefined ? Number(req.body.oldPrice) : existing.oldPrice,
    },
    { replace: true },
  );
  res.json(updated);
});

// PATCH /products/:id (cập nhật 1 phần, chỉ admin)
router.patch("/:id", authenticateToken, authorizeRoles("admin"), (req, res) => {
  const updated = products.updateById(req.params.id, req.body, { replace: false });
  if (!updated) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  res.json(updated);
});

// DELETE /products/:id (chỉ admin)
router.delete("/:id", authenticateToken, authorizeRoles("admin"), (req, res) => {
  const deleted = products.deleteById(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  res.json(deleted);
});

module.exports = router;
