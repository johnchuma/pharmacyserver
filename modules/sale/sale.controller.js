const { errorResponse, successResponse } = require("../../utils/responses")
const {Sale,Product,User} = require("../../models");
const { Op } = require("sequelize");

const addSale = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const {amount,price,user_uuid} = req.body;
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
            userId:user.id,
            price
        })
        successResponse(res,response)
    } catch (error) {
         errorResponse(res,error)
    }
}


const getSales = async(req,res)=>{
    try {
        const response = await Sale.findAll({
            include:[User,Product]
            })
          // Calculate total sales
          const totalSales = response.reduce((total, sale) => {
            return total + sale.amount * sale.price;
        }, 0);

        // Add totalSales to the response object
        const responseObject = {
            sales: response,
            totalSales: totalSales,
        };

        successResponse(res, responseObject);
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
            include: [User, Product],
            where: {
                createdAt: {
                    [Op.gte]: startOfDay,
                    [Op.lt]: endOfDay,
                }
            }
        });

        // Calculate total sales
        const totalSales = response.reduce((total, sale) => {
            return total + sale.amount * sale.price;
        }, 0);

        // Add totalSales to the response object
        const responseObject = {
            sales: response,
            totalSales: totalSales,
        };

        successResponse(res, responseObject);
    } catch (error) {
        errorResponse(res, error);
    }
}

module.exports = {
    addSale,getSales,getTodaySales
}
