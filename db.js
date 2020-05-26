const { Pool } = require("pg");

require("dotenv").config();

const pool = new Pool();

exports.module = { query: (text, params) => pool.query(text, params) };
