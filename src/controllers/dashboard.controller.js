const { Op, fn, col } = require("sequelize");
const { Venta } = require("../models/venta");
const { Gasto } = require("../models/gasto");
const { buildDateRange } = require("../utils/dateRange");

async function lineChart(req, res) {
  const { period, date, startDate, endDate } = req.query;
  const range = buildDateRange({ period, date, startDate, endDate });

  const where = {};
  if (range) {
    where.fecha = { [Op.gte]: range.start, [Op.lte]: range.end };
  }

  const ventas = await Venta.findAll({
    attributes: ["fecha", [fn("sum", col("monto")), "total"]],
    where,
    group: ["fecha"],
    order: [["fecha", "ASC"]]
  });

  const gastos = await Gasto.findAll({
    attributes: ["fecha", [fn("sum", col("monto")), "total"]],
    where,
    group: ["fecha"],
    order: [["fecha", "ASC"]]
  });

  return res.json({ ventas, gastos });
}

module.exports = { lineChart };
