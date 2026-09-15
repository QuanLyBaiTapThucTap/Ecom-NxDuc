const express = require("express");
const JsonCollection = require("../db");
const { authenticateToken } = require("../middleware/auth");
const router = express.Router();
const orders = new JsonCollection("orders.json");
const products = new JsonCollection("products.json");
router.use(authenticateToken);
router.get("/", (req, res) => {
  const all = orders.findAll();
  if (req.user.role === "admin" && (req.query.all === "true" || req.query.scope === "all")) {
    return res.json(all.reverse());
  }
  res.json(all.filter(order => order.userId === req.user.id).reverse());
});

router.get("/:id", (req, res) => {
  const order = orders.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });
  if (req.user.role !== "admin" && order.userId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }
  res.json(order);
});

router.put("/:id/status", (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin permission required" });
  }
  const allowedStatuses = ["pending", "confirmed", "completed", "cancelled"];
  const { status, paymentStatus } = req.body;
  if (status && !allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid order status" });
  }
  const patch = {};
  if (status) patch.status = status;
  if (paymentStatus) patch.paymentStatus = paymentStatus;
  const updated = orders.updateById(req.params.id, patch, { replace: false });
  if (!updated) return res.status(404).json({ message: "Order not found" });
  res.json(updated);
});
router.post("/", (req, res) => {
  const { items, shipping, paymentMethod, voucher, requestId } = req.body;
  if (typeof requestId !== "string" || !requestId || requestId.length > 100) return res.status(400).json({message: "Invalid request ID"});
  const previous = orders.findAll().find(order => order.userId === req.user.id && order.requestId === requestId);
  if (previous) return res.json(previous);
  if (!Array.isArray(items) || !items.length || items.length > 100 || !shipping || ["fullName", "phone", "email", "address", "city", "district"].some(key => typeof shipping[key] !== "string" || !shipping[key].trim())) return res.status(400).json({message: "Items and shipping information are required"});
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shipping.email) || !/^(0|\+84)\d{9,10}$/.test(shipping.phone.replace(/\s/g, ""))) return res.status(400).json({message: "Invalid email or phone"});
  if (paymentMethod !== "cod") return res.status(400).json({message: "Only cash on delivery is currently available"});
  if (voucher && voucher !== "SAVE10") return res.status(400).json({message: "Invalid voucher"});
  const catalog = products.findAll();
  const seen = new Set();
  const orderItems = [];
  for (const item of items) {
    if (!item || !Number.isSafeInteger(item.quantity) || item.quantity < 1 || item.quantity > 999 || seen.has(item.productId)) return res.status(400).json({message: "Invalid quantity or duplicate product"});
    const product = catalog.find(p => p.id === item.productId);
    if (!product || !Number.isFinite(product.price) || product.price < 0) return res.status(400).json({message: "Product is unavailable"});
    if (product.stock !== undefined && item.quantity > product.stock) return res.status(400).json({message: "Requested quantity exceeds stock"});
    seen.add(item.productId);
    orderItems.push({productId: product.id, title: product.title, image: product.image, price: product.price, quantity: item.quantity});
  }
  const round = value => Math.round(value * 100) / 100;
  const subtotal = round(orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0));
  const discount = voucher === "SAVE10" ? round(subtotal * .1) : 0;
  const shippingFee = subtotal >= 100 ? 0 : 10;
  const safeShipping = Object.fromEntries(["fullName", "phone", "email", "address", "city", "district", "note"].map(key => [key, typeof shipping[key] === "string" ? shipping[key].trim() : ""]));
  res.status(201).json(orders.create({userId: req.user.id, requestId, items: orderItems, shipping: safeShipping, paymentMethod, status: "pending", paymentStatus: "unpaid", subtotal, discount, shippingFee, total: round(subtotal - discount + shippingFee), createdAt: new Date().toISOString()}));
});
module.exports = router;
