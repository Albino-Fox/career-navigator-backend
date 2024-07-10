const express = require('express');
import {Request, Response} from "express"; // bruh

const Database = require('@/database.ts')
const config = require('@/config.ts');

let app = express();

const db = new Database();

app.get("/now", (req : Request, res : Response) => {
  res.send(new Date(Date.now()).toString());
});

app.listen(config.port, config.host, () => {
  console.log(`Running on ${config.host} with port ${config.port}`);
})