const { Router } = require("express");
const { lineChart } = require("../controllers/dashboard.controller");

const router = Router();

router.get("/line-chart", lineChart); // totla de gastos y ventas 

module.exports = router;
