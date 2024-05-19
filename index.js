const express = require("express")
const bodyParser = require("body-parser")
const {connectMongoDB} = require("./connection"); 

const app = express()
const PORT = 8000
connectMongoDB("mongodb://127.0.0.1:27017/menu-managment").then(()=>console.log("mongodb connected"))

const categoryRoutes=require("./routes/category")
const subCategoryRoutes = require("./routes/subCategory")
const itemRoutes = require("./routes/item")

app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/categories',categoryRoutes)
app.use('/api/subcategories',subCategoryRoutes)
app.use('/api/items',itemRoutes)

app.get('/', (req, res) => res.send('API is running...'));

app.listen(PORT,()=>console.log("joinedd server"))