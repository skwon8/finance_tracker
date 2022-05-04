const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");

require('dotenv').config();
const cookieParser = require('cookie-parser');

app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());

require("./server/config/finance.config")

require("./server/routes/finance.route")(app)

require("./server/routes/user.route")(app)











app.listen(port, () => console.log(`Listening on port: ${port}`));