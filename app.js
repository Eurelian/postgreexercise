const express = require("express");
const app = express();
const { Pool } = require("pg");

require("dotenv").config();

const pool = new Pool({
	user: process.env.PGUSER,
	host: process.env.PGHOST,
	database: process.env.PGDATABASE,
	password: process.env.PGPASSWORD,
	port: process.env.PGPORT,
});

pool.query("SELECT * FROM users", (err, res) => console.log(res));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
