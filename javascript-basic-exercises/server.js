const express = require("express");
const cors = require("cors");

const { PORT } = require("./src/config");
const authRoutes = require("./src/routes/auth.routes");
const productsRoutes = require("./src/routes/products.routes");
const usersRoutes = require("./src/routes/users.routes");
const cartsRoutes = require("./src/routes/carts.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);
app.use("/carts", cartsRoutes);
app.use("/orders", require("./src/routes/orders.routes"));

app.get("/", (req, res) => {
  res.json({
    message:
      "Mock Store API đang chạy. Xem README.md để biết danh sách endpoint.",
  });
});

app.post("/contacts", (req, res) => {
  const fields = ["fullName", "email", "subject", "message"];
  if (
    fields.some(
      (key) => typeof req.body[key] !== "string" || !req.body[key].trim(),
    ) ||
    req.body.message.trim().length < 10 ||
    req.body.message.length > 1000 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)
  )
    return res.status(400).json({ message: "Invalid contact information" });
  const JsonCollection = require("./src/db");
  const contact = new JsonCollection("contacts.json").create({
    ...Object.fromEntries(fields.map((key) => [key, req.body[key].trim()])),
    createdAt: new Date().toISOString(),
  });
  res.status(201).json({ id: contact.id, message: "Message received" });
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: "Không tìm thấy endpoint" });
});

if (require.main === module)
  app.listen(PORT, () => {
    console.log(`Mock server chạy tại http://localhost:${PORT}`);
  });

module.exports = app;
