const { Router } = require("express");
const {
  createVenta,
  listVentas,
  updateVenta,
  deleteVenta,
} = require("../controllers/ventas.controller");
const { requireAuth } = require("../middlewares/auth.middleware");

const router = Router();

router.post("/", requireAuth, createVenta); // creacion de una venta
router.get("/", listVentas); // Listado de ventas
router.put("/:id", requireAuth, updateVenta); // Modificacion de una venta
router.delete("/:id", requireAuth, deleteVenta); // Eliminacion de una venta

module.exports = router;
