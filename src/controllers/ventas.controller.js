const { Op } = require("sequelize");
const { Venta } = require("../models/venta");
const { buildDateRange } = require("../utils/dateRange");

async function createVenta(req, res) {
  const { fecha, categoria, monto, descripcion } = req.body || {};

  if (!fecha || !categoria || monto === undefined) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  const venta = await Venta.create({
    fecha,
    categoria,
    monto,
    descripcion,
    userId: req.user.id
  });

  return res.status(201).json(venta);
}

async function listVentas(req, res) {
  const { period, date, startDate, endDate } = req.query;
  const range = buildDateRange({ period, date, startDate, endDate });

  const where = {};
  if (range) {
    where.fecha = { [Op.between]: [range.start, range.end] };
  }

  const ventas = await Venta.findAll({
    where,
    order: [["fecha", "ASC"]]
  });

  return res.json(ventas);
}

async function updateVenta(req, res) {
  const { id } = req.params;
  const { fecha, categoria, monto, descripcion } = req.body || {};

  const venta = await Venta.findByPk(id);
  if (!venta) {
    return res.status(404).json({ message: "Venta no encontrada" });
  }

  await venta.update({
    fecha: fecha ?? venta.fecha,
    categoria: categoria ?? venta.categoria,
    monto: monto ?? venta.monto,
    descripcion: descripcion ?? venta.descripcion
  });

  return res.json(venta);
}

async function deleteVenta(req, res) {
  const { id } = req.params;
  const deleted = await Venta.destroy({ where: { id } });

  if (!deleted) {
    return res.status(404).json({ message: "Venta no encontrada" });
  }

  return res.json({ message: "Venta eliminada" });
}

module.exports = {
  createVenta,
  listVentas,
  updateVenta,
  deleteVenta
};
