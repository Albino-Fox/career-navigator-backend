const express = require('express');
import {Request, Response} from "express"; // bruh

const mysql = require('mysql');
const config = require('./src/config.ts');

let app = express();

const db = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.db_password,
  database: config.db_name,
});


app.get("/now", (req : Request, res : Response) => {
  res.send(new Date(Date.now()).toString());
});

app.listen(config.port, config.host, () => {
  console.log(`Running on ${config.host} with port ${config.port}`);
})