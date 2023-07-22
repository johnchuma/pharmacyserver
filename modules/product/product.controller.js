const { errorResponse, successResponse } = require("../../utils/responses")
const {Product} = require("../../models")

const createProduct = async(req,res)=>{
    try {
        const {name,quantityType}  = req.body;
        const response = await Product.create({
            name,quantityType
        })
        successResponse(res,response)
    } catch (error) {
         errorResponse(res,error)
    }
}

const getProducts = async(req,res)=>{
    try {
        const response = await Product.findAll()
        successResponse(res,response)
    } catch (error) {
         errorResponse(res,error)
    }
}
const deleteProduct = async(req,res)=>{
    try {
        const uuid = req.params.uuid;
        const product = await Product.findOne({
            where: {
                uuid
            }}
        )
      const response =  await product.destroy()
    successResponse(res,response)
    } catch (error) {
         errorResponse(res,error)
    }
}

module.exports = {
    createProduct,deleteProduct,getProducts
}
