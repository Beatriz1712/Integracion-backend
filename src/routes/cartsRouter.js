import { Router } from 'express';
import {cartsModel} from '../models/carts.model.js'

export const router = Router();
/********el id lo crea Atlas*********/
/********se crea 4 end pouints*******/
router.get("/", async (req, res) => {

    try {
        let carts = await cartsModel.find()
        res.send({
            result:'success',
            payload: carts
        })
    } catch (error) {
        res.status(500).json({ errror: error })
    }
})

router.post("/", async (req, res) => {
    let{  description, quantity, total } = req.body
    if ( !description  || !quantity || !total ) {
            res.send({
                status: 'error',
                error: 'No se encontró parametros'
            })
        } 
        let result= await cartsModel.create({
            description, quantity, total   
        })
        res.send({
            result: 'success',
            payload: result
        })
})

router.put("/:cid", async (req, res) => {
    let { cid } = req.params
    let cartsToReplace = req.body
    if(!cartsToReplace.description || !cartsToReplace.quantity ||
      !cartsToReplace.total ){
            res.send({
                result: 'error',
                error: 'Debe enviar un id de producto y datos a modificar'
            })  
    }
    let result = await cartsModel.updateOne({
        _id: cid }, cartsToReplace)
    res.send({
        result: 'success',
        payload: result
    })
})
router.delete("/:cid", async (req, res) => {
    let { cid } = req.params
    let result = await cartsModel.deleteOne({
        _id: cid })
        res.send({
            result: 'success',
            payload: result  
        })
})

export default router