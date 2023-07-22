const express = require('express')
const bodyParser = require("body-parser");
const UserRoutes = require("./modules/user/user.routes")
const ProductRoutes = require("./modules/product/product.routes")
const SaleRoutes = require("./modules/sale/sale.routes")
const StockRoutes = require("./modules/stock/stock.routes")








const cors = require('cors')
const app = express()
app.use(cors());
app.use(express.json());
app.use(express.static("files"));
app.use(bodyParser.text({ type: "/" }));


app.use("/user",UserRoutes)
app.use("/sale",SaleRoutes)
app.use("/stock",StockRoutes)
app.use("/product",ProductRoutes)



app.get('/',(req,res)=>{
    res.send("It is running well")
})

app.listen(7000,()=>{
  console.log("Server started at port 7000")
})