const { Router } = require("express");
const { ftCatalogo } = require("../controllers/ficha.controller");
const { createCatalogoInsumos } = require("../controllers/catalogo_insumo.contoller");
const router = Router();

router.post('/createCatIns', createCatalogoInsumos)
/* router.get('/getCatalogo',ftCatalogo ) */
router.get('/getFTCatalogo', ftCatalogo )
// router.get('/getInfo', prueba )

module.exports = router;