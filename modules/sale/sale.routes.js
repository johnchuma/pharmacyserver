const {Router} = require("express")
const router = Router()
const { addSale, getSales, getTodaySales, getProductSales } = require("./sale.controller");

router.post("/:uuid",addSale)
router.get("/today",getTodaySales)
router.get("/:uuid",getProductSales)
router.get("/",getSales)


module.exports = router