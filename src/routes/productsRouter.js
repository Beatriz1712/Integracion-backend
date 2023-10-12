import { Router } from 'express';
import {productsModel} from '../models/products.model.js'
//import ProductManager from "../../../ProductManager.js"
//const db = new ProductManager("productos.json")
export const router = Router();
// Trae los productos
router.get("/", async (req, res) => {

    try {
        //const { limit } = req.query
        let products = await productsModel.find()
        //if (limit) arrProduct = arrProduct.slice(0, limit)
        res.send({
            result:'success',
            payload:products
        })
    } catch (error) {
        res.status(500).json({ errror: error })
    }
})


router.post("/", async (req, res) => {
    let{ title, description, code, price, stock } = req.body
    if (!title ||  !description  || !code || !price  ||!stock  ) {
            res.send({
                status: 'error',
                error: 'Nos encontró parametros'
            })
        }  // error: "Datos incompletos" })
        let result= await productsModel.create({
            title, description, code, price, stock   
        })
        res.send({
            result: 'success',
            payload: result
        })
})



router.put("/:pid", async (req, res) => {
    let { pid } = req.params
    let productsToReplace = req.body
    if(!productsToReplace.title ||  !productsToReplace.description  || !productsToReplace.code ||
         !productsToReplace.price  || !productsToReplace.stock ){
            res.send({
                result: 'error',
                error: 'Debe enviar un id de producto  y datos a modificar'
            })  
    }
    let result = await productsModel.updateOne({
        _id: pid}, productsToReplace)
    res.send({
        result: 'success',
        payload: result
    })
})

router.delete("/:pid", async (req, res) => {
    let { pid } = req.params
    let result = await productsModel.deleteOne({
        _id:pid })
        res.send({
            result: 'success',
            payload: result  
        })
})

export default router



