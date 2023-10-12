import { Router } from 'express';
import { uploader} from '../controllers/multer.js'
 //import { dbInstance } from './api/productsRouter.js';
// Importar todos los routers;
export const router = Router();

router.get("/", async (req, res) => {

    try {
        const { limit } = req.query
        let productos = await dbInstance.getProducts()
        if (limit) arrProduct = arrProduct.slice(0, limit)
        res.render("index",{productos})
    } catch (error) {
        res.sendStatus(500).json({ error:error })
    }
})

router.get("/realtimeproducts", async (req, res) => {

    try {
        res.render("realTimeProducts")
    } catch (error) {
        res.send(500).json({ error:error })
    }
})
//**********Subir Archivo******************/
router.get("/subirArchivo", async (req, res) => {
   res.render('subirArchivo')
})
/*
    try {
        res.render("/subirArchivo")
    } catch (error) {
        res.send(500).json({ error:error })
    }
    */
router.post('/subirArchivo', uploader.single('file'), (req, res)=>{
    if(!req.file) return res.status(400).send({
        status: 'error',
        error: 'No se guardo'
    })
    res.send({
        status:'success',
        payload:'Archivo guardado con exito'
    })
})




