const { Op } = require("sequelize");
const { Gasto } = require("../models/gasto");
const { buildDateRange } = require("../utils/dateRange");

async function createGasto(req, res) {
  const { fecha, categoria, monto, descripcion } = req.body || {};

  if (!fecha || !categoria || monto === undefined) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  const gasto = await Gasto.create({
    fecha,
    categoria,
    monto,
    descripcion,
    userId: req.user.id
  });

  return res.status(201).json(gasto);
}

async function listGastos(req, res) {
  const { period, date, startDate, endDate } = req.query;
  const range = buildDateRange({ period, date, startDate, endDate });

  const where = {};
  if (range) {
    where.fecha = { [Op.gte]: range.start, [Op.lte]: range.end };
  }

  const gastos = await Gasto.findAll({
    where,
    order: [["fecha", "ASC"]]
  });

  return res.json(gastos);
}

async function updateGasto(req, res) {
  const { id } = req.params;
  const { fecha, categoria, monto, descripcion } = req.body || {};

  const gasto = await Gasto.findByPk(id);
  if (!gasto) {
    return res.status(404).json({ message: "Gasto no encontrado" });
  }

  await gasto.update({
    fecha: fecha ?? gasto.fecha,
    categoria: categoria ?? gasto.categoria,
    monto: monto ?? gasto.monto,
    descripcion: descripcion ?? gasto.descripcion
  });

  return res.json(gasto);
}

async function deleteGasto(req, res) {
  const { id } = req.params;
  const deleted = await Gasto.destroy({ where: { id } });

  if (!deleted) {
    return res.status(404).json({ message: "Gasto no encontrado" });
  }

  return res.json({ message: "Gasto eliminado" });
}

module.exports = {
  createGasto,
  listGastos,
  updateGasto,
  deleteGasto
};
