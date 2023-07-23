const {Router} = require("express")
const router = Router()
const { addStock, getStocks, deleteStock, getExpiringProducts, getOutOfStock, getProductStocks } = require("./stock.controller");

router.post("/:uuid",addStock)
router.get("/",getStocks)
router.get("/:uuid",getProductStocks)
router.get("/out-of-stock",getOutOfStock)
router.get("/expiring",getExpiringProducts)
router.delete("/:uuid",deleteStock)

module.exports = router