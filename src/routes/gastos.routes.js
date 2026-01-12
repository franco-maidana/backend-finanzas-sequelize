const { Router } = require("express");
const {
  createGasto,
  listGastos,
  updateGasto,
  deleteGasto
} = require("../controllers/gastos.controller");
const { requireAuth } = require("../middlewares/auth.middleware");

const router = Router();

router.post("/", requireAuth, createGasto); // creacion de un gasto 
router.get("/", listGastos); // listados de todos los gastos
router.put("/:id", requireAuth, updateGasto); // modificacion de un gasto 
router.delete("/:id", requireAuth, deleteGasto); // eliminacion de un gasto 

module.exports = router;
