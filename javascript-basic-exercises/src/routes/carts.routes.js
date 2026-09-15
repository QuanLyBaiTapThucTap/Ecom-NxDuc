const express = require("express");
const JsonCollection = require("../db");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();
const carts = new JsonCollection("carts.json");

// GET /carts?startdate=...&enddate=...&limit=...  -> giống fakestoreapi (bỏ qua filter ngày cho đơn giản)
router.get("/", (req, res) => {
  let items = carts.findAll();
  const { limit, sort } = req.query;

  if (sort === "asc") items = [...items].sort((a, b) => a.id - b.id);
  if (sort === "desc") items = [...items].sort((a, b) => b.id - a.id);
  if (limit) items = items.slice(0, Number(limit));

  res.json(items);
});

// GET /carts/user/:userId
router.get("/user/:userId", (req, res) => {
  const items = carts.findAll().filter((c) => c.userId === Number(req.params.userId));
  res.json(items);
});

// GET /carts/:userId (lấy giỏ hàng theo userId, nếu chưa có thì trả về giỏ rỗng)
router.get("/:userId", (req, res) => {
  const targetId = Number(req.params.userId);
  const allCarts = carts.findAll();
  // Ưu tiên tìm theo userId, nếu không thấy tìm theo id giỏ hàng
  const userCart = allCarts.find((c) => c.userId === targetId) || allCarts.find((c) => c.id === targetId);
  if (userCart) {
    return res.json(userCart);
  }
  res.json({ id: 0, userId: targetId, products: [], date: new Date().toISOString() });
});

// POST /carts (cần đăng nhập)
router.post("/", authenticateToken, (req, res) => {
  const { userId, products: cartProducts, date } = req.body;
  if (!userId || !Array.isArray(cartProducts)) {
    return res.status(400).json({ message: "Thiếu userId hoặc products" });
  }
  const newCart = carts.create({
    userId,
    date: date || new Date().toISOString(),
    products: cartProducts,
  });
  res.status(201).json(newCart);
});

// PUT /carts/:userId (cập nhật hoặc tạo mới giỏ hàng theo userId)
router.put("/:userId", (req, res) => {
  const targetId = Number(req.params.userId);
  const allCarts = carts.findAll();
  const existingCart = allCarts.find((c) => c.userId === targetId) || allCarts.find((c) => c.id === targetId);

  const cartProducts = req.body.products || (Array.isArray(req.body) ? req.body : []);

  if (existingCart) {
    const updated = carts.updateById(
      existingCart.id,
      {
        ...existingCart,
        products: cartProducts,
        date: new Date().toISOString(),
      },
      { replace: true },
    );
    return res.json(updated);
  }

  // Nếu chưa có giỏ hàng cho user này, tạo mới
  const created = carts.create({
    userId: targetId,
    products: cartProducts,
    date: new Date().toISOString(),
  });
  res.json(created);
});

// PATCH /carts/:id (cập nhật 1 phần)
router.patch("/:id", (req, res) => {
  const updated = carts.updateById(req.params.id, req.body, { replace: false });
  if (!updated) return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
  res.json(updated);
});

// DELETE /carts/:id
router.delete("/:id", (req, res) => {
  const deleted = carts.deleteById(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
  res.json(deleted);
});

module.exports = router;
