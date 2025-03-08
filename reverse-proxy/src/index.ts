var express = require("express");
var app = express();
var httpProxy = require("http-proxy");
import cors from "cors";
import { config } from "dotenv";

config();

const SERVER_IP = process.env.SERVER_IP;
const PORT = process.env.PORT;

var apiProxy = httpProxy.createProxyServer();
var backend = SERVER_IP;

app.use(cors());

app.all("/*", function (req: any, res: any) {
  try {
    console.log("COntrol reached...");
    apiProxy.web(req, res, { target: backend });
  } catch (e: any) {
    console.log(e);
  }
});

var server = require("http").createServer(app);

server.listen(PORT, () => console.log(`App running on ${PORT}`));
