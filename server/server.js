const express = require("express");
const app = express();
const mainRoute = require("./routes/index.js");
const bodyParser = require("body-parser");
const cors= require("cors");

app.use(cors());

const connectDb=require("./config/db");
require("dotenv").config();

connectDb();
let port = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use("/",mainRoute);


app.listen(port, () => {console.log(`Server is running on ${port}`)
});