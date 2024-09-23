const express = require("express");
const router = express.Router();
const service = require("../services/service");
const flowService = require('../services/flowServices');
const { validateLog } = require("../services/cbCheck.service");

router.post("/validateSchema/:path", (req, res) => {
  const path = req.params.path;
  const data = req.body;
  const result = service.schemaValidation(domain, data, path);
  res.json(result);
});

router.post("/CheckContext/:path", (req, res) => {
  const path = req.params.path;
  const data = req.body.context;
  const result = service.checkContext(data, path);
  res.json(result);
});

router.post("/ValidateLog/:domain", (req, res) => {
  const domain = req.params.domain;
  const logPath = req.body.logPath;
  console.log('path', logPath)
  validateLog(domain,logPath);
  res.json("done");
});

router.post("/createFlow",async(req, res) => {
  await flowService.create_flow_file();
  return res.json("Done");
})

module.exports = router;
