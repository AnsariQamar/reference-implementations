const express = require('express')
const router = require("../routes/routes")
const app = express()
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(router)

app.listen(port, () => {
  console.log(`Log Validation running on PORT ${port}`)
})