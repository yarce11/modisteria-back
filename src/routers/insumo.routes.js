const { Router } = require("express");
const {
  getAllInsumos,
  getInsumoById,
  createInsumo,
  updateInsumo,
  deleteInsumo,
  statusInsumo,
  getInsumosByCategoria,
  reponerInsumo,
  cantidadInsumos,
} = require("../controllers/insumo.controller");
const { verifyToken } = require("../utils/verifyToken");
const { buscarPermiso } = require("../validators/validations.validator");
const router = Router();

router.get(
  "/getAllInsumos",
  [verifyToken, buscarPermiso("Insumos")],
  getAllInsumos
);

router.get(
  "/getInsumoById/:id",
  [verifyToken, buscarPermiso("Insumos")],
  getInsumoById
);

router.get(
  "/getInsumoByCategoria/:categoriaId",
  [verifyToken, buscarPermiso("Insumos")],
  getInsumosByCategoria
);

router.put(
  "/reponerInsumo",
  [verifyToken, buscarPermiso("Insumos")],
  reponerInsumo
);

router.put("/cantidadInsumos", cantidadInsumos)

router.post(
  "/createInsumo",
  [verifyToken, buscarPermiso("Insumos")],
  createInsumo
);

router.put(
  "/updateInsumo/:id",
  [verifyToken, buscarPermiso("Insumos")],
  updateInsumo
);

router.put(
  "/statusInsumo/:id",
  [verifyToken, buscarPermiso("Insumos")],
  statusInsumo
);

router.delete(
  "/deleteInsumo/:id",
  [verifyToken, buscarPermiso("Insumos")],
  deleteInsumo
);

module.exports = router;
