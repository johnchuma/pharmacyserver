const {Router} = require("express")
const router = Router()
const { createProduct, deleteProduct, getProducts } = require("./product.controller");

router.post("/",createProduct)
router.get("/",getProducts)
router.delete("/:uuid",deleteProduct)

module.exports = router