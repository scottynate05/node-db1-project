const express = require("express");
const accountsRouter = require('../router/accounts-router');
const db = require("../data/dbConfig.js");

const server = express();

server.use('/api/accounts', accountsRouter);
server.use(express.json());

server.get("/", (req, res) => {
    res.status(200).json('Welcome to your accounts api!');
  });

module.exports = server;
