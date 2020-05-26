const express = require("express");
const app = express();
const db = require("./db");

db.query("SELECT * FROM ORDERS", (res, err) => {
	console.log(res);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
