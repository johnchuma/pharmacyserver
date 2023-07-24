const { errorResponse, successResponse } = require("../../utils/responses")
const {Stock,Product,Sale, Sequelize} = require("../../models");
const { addMonths, startOfDay } = require('date-fns'); // Import date-fns library for date manipulation

const getExpiringProducts = async (req, res) => {
    try {
        const today = new Date();
        const oneMonthFromToday = addMonths(today, 1);

        const latestStocks = await Stock.findAll({
            attributes: ['productId', [Sequelize.fn('max', Sequelize.col('createdAt')), 'latestCreatedAt']],
            group: ['productId'],
            raw: true,
        });

        // Extract the productIds and latestCreatedAt values from the result
        const productIds = latestStocks.map((stock) => stock.productId);
        const latestCreatedAtValues = latestStocks.map((stock) => stock.latestCreatedAt);

        // Use the productIds and latestCreatedAt values to fetch the full stock information
        const response = await Stock.findAll({
            where: {
                productId: { [Op.in]: productIds },
                createdAt: { [Op.in]: latestCreatedAtValues },
                expireDate: { [Op.between]: [startOfDay(today), startOfDay(oneMonthFromToday)] },
            },
            include: [Product],
        });

        successResponse(res, response);
    } catch (error) {
        errorResponse(res, error);
    }
}

const addStock = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const {sellingPrice,buyingPrice,expireDate,amount}  = req.body;
        const product = await Product.findOne({
            where:{
                uuid
            }
        })
        const response = await Stock.create({
            amount,sellingPrice,expireDate,buyingPrice,productId:product.id
        })
        successResponse(res,response)
    } catch (error) {
         errorResponse(res,error)
    }
}
const { Op } = require('sequelize');

const getOutOfStock = async (req, res) => {
    try {
        const latestStocks = await Stock.findAll({
            attributes: ['productId', [Sequelize.fn('max', Sequelize.col('createdAt')), 'latestCreatedAt']],
            group: ['productId'],
            raw: true,
        });

        // Extract the productIds and latestCreatedAt values from the result
        const productIds = latestStocks.map((stock) => stock.productId);
        const latestCreatedAtValues = latestStocks.map((stock) => stock.latestCreatedAt);

        // Use the productIds and latestCreatedAt values to fetch the full stock information
        const stocks = await Stock.findAll({
            where: {
                productId: { [Op.in]: productIds },
                createdAt: { [Op.in]: latestCreatedAtValues },
            },
            include: [Product],
        });

        // Calculate total sales amount for each product
        const salesAmountByProduct = await Sale.findAll({
            attributes: ['productId', [Sequelize.fn('sum', Sequelize.col('amount')), 'totalSalesAmount']],
            where: {
                productId: { [Op.in]: productIds },
                createdAt: { [Op.in]: latestCreatedAtValues },
            },
            group: ['productId'],
            raw: true,
        });
        
        // Create a mapping of productId to total sales amount
        const salesAmountMap = {};
        salesAmountByProduct.forEach((sale) => {
            salesAmountMap[sale.productId] = sale.totalSalesAmount;
        });

        // Filter out-of-stock products
        const outOfStockProducts = stocks.filter((stock) => {
            const totalStockAmount = stock.amount; // Assuming the 'amount' field stores the total stock amount
            const totalSalesAmount = salesAmountMap[stock.productId] || 0;
            return totalSalesAmount === totalStockAmount;
        });

        successResponse(res, outOfStockProducts);
    } catch (error) {
        errorResponse(res, error);
    }
}
const getProductStocks = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const product = await Product.findOne({
            where:{
                uuid
            }
            
        })
        const stock = await Stock.findAll({
            where:{
                productId:product.id
            },
            include:[Product]
        })
        successResponse(res,stock)
    } catch (error) {
        errorResponse(res,error)
    }
}
const getStocks = async(req,res)=>{
    try {
        const latestStocks = await Stock.findAll({
            attributes: ['productId', [Sequelize.fn('max', Sequelize.col('createdAt')), 'latestCreatedAt']],
      group: ['productId'],
      raw: true,
    })
     // Extract the productIds and latestCreatedAt values from the result
     const productIds = latestStocks.map((stock) => stock.productId);
     const latestCreatedAtValues = latestStocks.map((stock) => stock.latestCreatedAt);
 
     // Use the productIds and latestCreatedAt values to fetch the full stock information
    const response = await Stock.findAll({
       where: {
         productId: { [Op.in]: productIds },
         createdAt: { [Op.in]: latestCreatedAtValues },
       },
       include: [Product],
     });
        successResponse(res,response)
    } catch (error) {
         errorResponse(res,error)
    }
}
const deleteStock =  async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const stock = await Stock.findOne({
            where:{
                uuid
            }
    })
        await stock.destroy()
        successResponse(res,response)
    } catch (error) {
         errorResponse(res,error)
    }
}

module.exports = {
    addStock,getStocks,deleteStock,getExpiringProducts,getOutOfStock,getProductStocks
}
