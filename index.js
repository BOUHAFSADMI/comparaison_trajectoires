import express from "express";
import bodyParser from "body-parser";
import routes from "./src/routes/routes";

var app = express();
var PORT = 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app);

app.get("/", (req, res) => 
  res.send(`server is running in port: ${PORT}`) 
);

app.listen(PORT, () =>
    console.log(`server is running in port: ${PORT}`)
);