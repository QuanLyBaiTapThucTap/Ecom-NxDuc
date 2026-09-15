const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const JsonCollection = require("../src/db");

test("account, checkout and contact routes work together", async () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "ecom-routes-"));
  for (const filename of ["users.json", "products.json", "carts.json", "orders.json", "contacts.json"]) {
    fs.copyFileSync(path.join(__dirname, "../data", filename), path.join(directory, filename));
  }
  fs.writeFileSync(path.join(directory, "orders.json"), "[]");
  const modulePath = require.resolve("../src/db");
  require.cache[modulePath].exports = class extends JsonCollection {
    constructor(filename) { super(filename); this.filePath = path.join(directory, filename); }
  };
  const server = require("../server").listen(0, "127.0.0.1");
  await new Promise(resolve => server.once("listening", resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  async function request(url, method = "GET", body, token) {
    const response = await fetch(base + url, {method, headers: {"Content-Type": "application/json", ...(token ? {Authorization: `Bearer ${token}`} : {})}, body: body ? JSON.stringify(body) : undefined});
    return {status: response.status, data: await response.json()};
  }
  try {
    assert.equal((await request("/orders")).status, 401);
    const registration = await request("/users", "POST", {username: "route-test", email: "route-test@example.com", password: "test123", name: {firstname: "Route", lastname: "Test"}});
    assert.equal(registration.status, 201);
    assert.equal((await request("/users", "POST", {username: "route-test-2", email: "route-test@example.com", password: "test123"})).status, 409);
    const login = await request("/auth/login", "POST", {username: "route-test@example.com", password: "test123"});
    assert.equal(login.status, 200);
    const token = login.data.accessToken;
    const id = registration.data.id;
    assert.equal((await request(`/users/${id}`, "PATCH", {name: {firstname: "Updated", lastname: "Test"}, role: "admin"}, token)).status, 200);
    const me = await request("/auth/me", "GET", null, token);
    assert.equal(me.data.name.firstname, "Updated");
    assert.equal(me.data.role, "customer");
    assert.equal(me.data.password, undefined);
    assert.equal((await request("/users/1", "PATCH", {phone: "123"}, token)).status, 403);
    const products = (await request("/products")).data;
    const product = products[0];
    const order = {requestId: "checkout-test", items: [{productId: product.id, quantity: 2, price: 0}], shipping: {fullName: "Route Test", phone: "0912345678", email: "route-test@example.com", address: "123 Street", city: "Hanoi", district: "District 1"}, paymentMethod: "cod", voucher: "SAVE10", total: 0};
    assert.equal((await request("/orders", "POST", {...order, items: [{productId: product.id, quantity: -1}]}, token)).status, 400);
    assert.equal((await request("/orders", "POST", {...order, paymentMethod: "card"}, token)).status, 400);
    const created = await request("/orders", "POST", order, token);
    assert.equal(created.status, 201);
    assert.equal(created.data.subtotal, Math.round(product.price * 2 * 100) / 100);
    assert.equal(created.data.discount, Math.round(created.data.subtotal * 10) / 100);
    assert.equal(created.data.paymentStatus, "unpaid");
    const duplicate = await request("/orders", "POST", order, token);
    assert.equal(duplicate.data.id, created.data.id);
    assert.equal((await request("/orders", "GET", null, token)).data.length, 1);
    const other = await request("/auth/login", "POST", {username: "admin", password: "admin123"});
    assert.equal((await request("/orders", "GET", null, other.data.accessToken)).data.length, 0);
    assert.equal((await request("/contacts", "POST", {fullName: "Test", email: "test@example.com", subject: "Help", message: "Please help with this order"})).status, 201);
    assert.equal((await request("/contacts", "POST", {message: "short"})).status, 400);
    assert.equal((await request("/auth/password", "POST", {currentPassword: "wrong", password: "new123"}, token)).status, 400);
    assert.equal((await request("/auth/password", "POST", {currentPassword: "test123", password: "new123"}, token)).status, 200);
    assert.equal((await request("/auth/refresh-token", "POST", {refreshToken: login.data.refreshToken})).status, 401);
    assert.equal((await request("/auth/login", "POST", {username: "route-test", password: "new123"})).status, 200);
  } finally {
    await new Promise(resolve => server.close(resolve));
    require.cache[modulePath].exports = JsonCollection;
    // Only delete the exact temporary directory created by this test.
    if (path.dirname(directory) === os.tmpdir() && path.basename(directory).startsWith("ecom-routes-")) fs.rmSync(directory, {recursive: true, force: true});
  }
});
