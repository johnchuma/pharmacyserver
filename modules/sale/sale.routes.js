const {Router} = require("express")
const router = Router()
const { addSale, getSales, getTodaySales } = require("./sale.controller");

router.post("/:uuid",addSale)
router.get("/",getSales)
router.get("/today",getTodaySales)


module.exports = router