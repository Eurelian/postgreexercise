const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");

require("dotenv").config();
app.use(bodyParser.json());

// app.get("/", (req, res) => {
// 	db.query("SELECT * FROM users")
// 		.then((data) => res.json(data.rows))
// 		.catch((err) => console.err(err));
// });

app.get("/users/:id", (req, res) => {
	const { id } = req.params;
	db.query("SELECT * FROM users WHERE id=$1", [id])
		.then((data) => res.json(data.rows))
		.catch((err) => console.err(err));
});

app.post("/api/users/", (req, res) => {
	const { first_name, last_name, age, active } = req.body;
	db.query(
		"INSERT INTO users(first_name, last_name, age, active) VALUES ($1, $2, $3, $4) RETURNING *",
		[first_name, last_name, age, active]
	)
		.then((data) => res.json(data.rows))
		.catch((err) => console.err(err));
});

app.put("/api/users/:id", (req, res) => {
	const { id } = req.params;
	const { first_name, last_name, age, active } = req.body;
	db.query(
		"UPDATE users SET first_name=$1, last_name=$2, age=$3, active=$4 WHERE id=$5 RETURNING *",
		[first_name, last_name, age, active, id]
	)
		.then((data) => res.json(data.rows))
		.catch((err) => console.err(err));
});

app.delete("/api/users/:id", (req, res) => {
	const { id } = req.params;
	db.query("DELETE FROM users WHERE id=$1 RETURNING * ", [id])
		.then((data) => res.json(data.rows))
		.catch((err) => console.err(err));
});

// ORDERS

app.get("/", (req, res) => {
	db.query("SELECT * FROM orders")
		.then((data) => res.json(data.rows))
		.catch((err) => console.err(err));
});

app.get("/orders/:id", (req, res) => {
	const { id } = req.params;
	db.query("SELECT * FROM orders WHERE id=$1", [id])
		.then((data) => res.json(data.rows))
		.catch((err) => console.err(err));
});

app.post("/orders/", (req, res) => {
	const { price, date, user_id } = req.body;
	db.query(
		"INSERT INTO orders(price, date, user_id) VALUES ($1, $2, $3) RETURNING *",
		[price, date, user_id]
	)
		.then((data) => res.json(data.rows))
		.catch((err) => console.err(err));
});

app.put("/orders/:id", (req, res) => {
	const { id } = req.params;
	const { price, date, user_id } = req.body;
	db.query(
		"UPDATE orders SET price=$1, date=$2 user_id=$3 WHERE id=$4 RETURNING *",
		[price, date, user_id, id]
	)
		.then((data) => res.json(data.rows))
		.catch((err) => console.err(err));
});

app.delete("/orders/:id", (req, res) => {
	const { id } = req.params;
	db.query("DELETE FROM orders WHERE id=$1 RETURNING *", [id]).then((data) =>
		res.json(data.rows).catch((err) => console.err(err))
	);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
