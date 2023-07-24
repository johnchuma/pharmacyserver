const { errorResponse, successResponse } = require("../../utils/responses")
const {Product,Stock,Sale} = require("../../models")

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

const updateProduct = async(req,res)=>{
    try {
        const uuid = req.params.uuid;
        const {name,quantityType}  = req.body;
        const product = await Product.findOne({
            where:{
                uuid
            }
        })
        const response = await product.update({
            name,quantityType
        })
        successResponse(res,response)
    } catch (error) {
         errorResponse(res,error)
    }
}

const getProducts = async (req, res) => {
    try {
      // Fetch all products along with their associated stock entries and sales
      const products = await Product.findAll({
        include: [
          {
            model: Stock,
            as: "stocks",
          },
          {
            model: Sale,
            as: "sales",
          },
        ],
      });
  
      // Calculate the total stock amount and total sales amount for each product
      const productsWithStockInfo = products.map((product) => {
        const totalStockAmount = product.stocks.reduce((acc, stock) => acc + stock.amount, 0);
        const totalSaleAmount = product.sales.reduce((acc, sale) => acc + sale.amount, 0);
        const currentStock = totalStockAmount - totalSaleAmount;
  
        return {
          id: product.id,
          uuid: product.uuid,
          name: product.name,
          quantityType: product.quantityType,
          createdAt: product.createdAt,
          currentStock,
        };
      });
  
      successResponse(res, productsWithStockInfo);
    } catch (error) {
      errorResponse(res, error);
    }
  };
  
const getOutOfStocks = async(req,res)=>{
    try {
        const products = await Product.findAll()

        const response = await Promise.all(products.map(async(item)=>{
           const stocks =  await Stock.sum('amount',{where:{
                productId:item.id
            }})
            const sales = await Sale.sum('amount',{where:{
                productId:item.id
            }})
            let totalStocks = stocks??0;
            let totalSales = sales??0
            let currentStock =totalStocks- totalSales 
            if(currentStock === 0){
                return  {
                    id:item.id,
                    uuid:item.uuid,name:item.name,
                    quantityType:item.quantityType,
                    createdAt:item.createdAt,
                    currentStock}
            }
            else{
                return null
            }
         }))
         const outOfStockProducts = response.filter(item => item !== null);     
        successResponse(res,outOfStockProducts)
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
            },
        }
        )
      const response =  await product.destroy()
    successResponse(res,response)
    } catch (error) {
         errorResponse(res,error)
    }
}

module.exports = {
    createProduct,deleteProduct,getProducts,getOutOfStocks,updateProduct
}
