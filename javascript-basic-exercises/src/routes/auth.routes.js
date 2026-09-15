const express = require("express");
const jwt = require("jsonwebtoken");
const JsonCollection = require("../db");
const {
  ACCESS_SECRET,
  REFRESH_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} = require("../config");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();
const usersCollection = new JsonCollection("users.json");

// Lưu refresh token hợp lệ trong bộ nhớ (đủ dùng cho học tập, thực tế nên lưu DB)
let validRefreshTokens = [];

function signTokens(userSafe) {
  const accessToken = jwt.sign(userSafe, ACCESS_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
  const refreshToken = jwt.sign(userSafe, REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
  return { accessToken, refreshToken };
}

// ===== LOGIN =====
router.post("/login", (req, res) => {
  const { username, email, password } = req.body;
  const users = usersCollection.findAll();
  const user = users.find(
    (u) =>
      (u.username === username || u.email === email || u.email === username) &&
      u.password === password,
  );

  if (!user) {
    return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu" });
  }

  const { password: _, ...userSafe } = user; // không trả password về client
  const { accessToken, refreshToken } = signTokens(userSafe);
  validRefreshTokens.push(refreshToken);

  res.json({ accessToken, refreshToken, user: userSafe });
});

// ===== REFRESH TOKEN =====
router.post("/refresh-token", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken || !validRefreshTokens.includes(refreshToken)) {
    return res.status(401).json({ message: "Refresh token không hợp lệ" });
  }

  jwt.verify(refreshToken, REFRESH_SECRET, (err, payload) => {
    if (err) {
      // refresh token hết hạn/không hợp lệ -> loại khỏi danh sách luôn
      validRefreshTokens = validRefreshTokens.filter((t) => t !== refreshToken);
      return res.status(401).json({ message: "Refresh token hết hạn" });
    }

    const { iat, exp, ...userSafe } = payload;
    const newAccessToken = jwt.sign(userSafe, ACCESS_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });

    res.json({ newAccessToken }); // đúng tên field config.js đang destructure
  });
});

// ===== LOGOUT =====
router.post("/logout", (req, res) => {
  const { refreshToken } = req.body;
  validRefreshTokens = validRefreshTokens.filter((t) => t !== refreshToken);
  res.json({ message: "Đăng xuất thành công" });
});

// ===== ME (protected) =====
router.get("/me", authenticateToken, (req, res) => {
  const user = usersCollection.findById(req.user.id);
  if (!user) return res.status(401).json({ message: "Account no longer exists" });
  const { password, ...userSafe } = user;
  res.json(userSafe);
});

router.post("/password", authenticateToken, (req, res) => {
  const user = usersCollection.findById(req.user.id);
  if (!user || user.password !== req.body.currentPassword) return res.status(400).json({ message: "Current password is incorrect" });
  if (typeof req.body.password !== "string" || req.body.password.length < 6) return res.status(400).json({ message: "Password must contain at least 6 characters" });
  usersCollection.updateById(user.id, { password: req.body.password });
  validRefreshTokens = validRefreshTokens.filter(token => jwt.decode(token)?.id !== user.id);
  res.json({ message: "Password updated" });
});

module.exports = router;
