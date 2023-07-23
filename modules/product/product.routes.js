const {Router} = require("express")
const router = Router()
const { createProduct, deleteProduct, getProducts, getOutOfStocks, updateProduct } = require("./product.controller");
const { getExpiringProducts } = require("../stock/stock.controller");

router.post("/",createProduct)
router.patch("/:uuid",updateProduct)
router.get("/",getProducts)
router.get("/out-of-stock",getOutOfStocks)
router.get("/expiring",getExpiringProducts)
router.delete("/:uuid",deleteProduct)

module.exports = router