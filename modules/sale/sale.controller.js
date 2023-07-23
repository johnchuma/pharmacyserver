const { errorResponse, successResponse } = require("../../utils/responses")
const {Sale,Product,User,Stock} = require("../../models");
const { Op } = require("sequelize");

const addSale = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const {amount,user_uuid,stock_uuid} = req.body;

        const stock = await Stock.findOne({
            where:{
                uuid:stock_uuid
            }
        })
         const user = await User.findOne({
            where:{
                uuid:user_uuid
            }
         })
        const product = await Product.findOne({
            where:{
                uuid
            }
        })
         
        const response = await Sale.create({
            amount,
            productId:product.id,
            stockId:stock.id,
            userId:user.id,
        })
        successResponse(res,response)
    } catch (error) {
         errorResponse(res,error)
    }
}

const getProductSales = async(req,res)=>{
    try {
        const uuid = req.params.uuid
       
        const product = await Product.findOne({
            where:{
                uuid
            }
        })
        const sales = await Sale.findAll({
            where:{
                productId:product.id
            },
            include:[Product,User,Stock]
        })
        successResponse(res,sales)
    } catch (error) {
        errorResponse(res,error)
    }
}

const getSales = async(req,res)=>{
    try {
        const response = await Sale.findAll({
            include:[User,Product,Stock]
            })
         
        successResponse(res,response);
    } catch (error) {
         errorResponse(res,error)
    }
}

const getTodaySales = async (req, res) => {
    try {
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        
        const response = await Sale.findAll({
            include: [User,Product,Stock],
            where: {
                createdAt: {
                    [Op.gte]: startOfDay,
                    [Op.lt]: endOfDay,
                }
            }
        });

        
        successResponse(res, response);
    } catch (error) {
        errorResponse(res, error);
    }
}

module.exports = {
    addSale,getSales,getTodaySales,getProductSales
}
