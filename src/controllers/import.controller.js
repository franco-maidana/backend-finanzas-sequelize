const { Venta } = require("../models/venta");
const { Gasto } = require("../models/gasto");

async function importJson(req, res) {
  const { ventas = [], gastos = [] } = req.body || {};

  if (!Array.isArray(ventas) && !Array.isArray(gastos)) {
    return res.status(400).json({ message: "Formato invalido" });
  }

  const ventasPayload = ventas.map((venta) => ({
    ...venta,
    userId: venta.userId ?? req.user.id
  }));

  const gastosPayload = gastos.map((gasto) => ({
    ...gasto,
    userId: gasto.userId ?? req.user.id
  }));

  const createdVentas = ventasPayload.length
    ? await Venta.bulkCreate(ventasPayload, { validate: true })
    : [];
  const createdGastos = gastosPayload.length
    ? await Gasto.bulkCreate(gastosPayload, { validate: true })
    : [];

  return res.status(201).json({
    ventas: createdVentas.length,
    gastos: createdGastos.length
  });
}

module.exports = { importJson };
