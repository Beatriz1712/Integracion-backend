import { Router } from 'express';
import {messagesModel} from '../models/messages.model.js'

export const router = Router();

router.get("/", async (req, res) => {

    try {
        let messages = await messagesModel.find()
        return  res.render(
            'chat',{messages}
        )   
    } catch (error) {
        res.status(500).json({ errror: error })
    }
})

router.post("/", async (req, res) => {
    let{  user, message } = req.body
    if ( !user  || !message ) {
            res.send({
                status: 'error',
                error: 'No se encontró parametros'
            })
        } 
        let result= await messagesModel.create({
            user, message   
        })
        res.send({
            result: 'success',
            payload: result
        })
})

router.put("/:mid", async (req, res) => {
    let { mid } = req.params
    let messagesToReplace = req.body
    if(!messagesToReplace.user || !messagesToReplace.message){
            res.send({
                result: 'error',
                error: 'Debe enviar un id de producto y datos a modificar'
            })  
    }
    let result = await messagesModel.updateOne({
        _id: mid }, messagesToReplace)
    res.send({
        result: 'success',
        payload: result
    })
})
router.delete("/:mid", async (req, res) => {
    let { mid } = req.params
    let result = await messagesModel.deleteOne({
        _id:mid })
        res.send({
            result: 'success',
            payload: result  
        })
})

export default router