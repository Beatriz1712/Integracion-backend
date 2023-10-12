import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { router} from "./routes/productsRouter.js";
import { router as viewsRouter } from "./routes/views.router.js";
import mongoose from "mongoose";
import cartsRouter from "./routes/cartsRouter.js";
import messagesRouter from "./routes/messagesRouter.js";
import productsRouter from "./routes/productsRouter.js";
import uploadRouter from "./routes/uploadRouter.js";

/*********config inicial**********/
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use('/products', router);
app.use('/', viewsRouter);

/********handlebars***************************/
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
//css static
app.use('/', express.static(__dirname +"/public"))

const PORT = 8080;

/********Conexion mostrando el puerto********/
const httpServer = app.listen(PORT, () => {
    console.log("Escuchando en puerto " + PORT);
});

/*********handelbars view chat********/
app.get('/chat', async (req,res) => {
    res.render("chat", {
        title:"chat con mongoose"
    })     
 })

/********Config mongoose**********************/

mongoose.connect( "mongodb+srv://beatriz1712sc:soynuevabasededatos@cluster0.2gm0bzy.mongodb.net/test")
.then(()=>{
    console.log("Conectada a la base de datos");
})
.catch(error => 
    console.error("Error al conectar a la base de datos"))

 /**********rutas del CRUD de carts ,messages y products***************/
 app.use('/api/products', productsRouter);
 app.use('/api/carts', cartsRouter);
 app.use('/api/messages', messagesRouter); 
 
 /*********multer*********** */ 
 app.use("/api/upload",uploadRouter)


//config socket
const socketServer = new Server(httpServer);
let p = 0;
socketServer.on('connection', async (socket) => {
    p += 1;
    console.log(`${p} connected`);

    const products = await dbInstance.getProducts();
    socket.emit('productList', products);
//io.on
    socket.on('addProduct', async product => {
        console.log(" agregar producto");
        try {
            let c = await dbInstance.addProduct(product);
            const updatedProducts = await dbInstance.getProducts();
            console.log(updatedProducts);

            if (Array.isArray(updatedProducts)) socketServer.emit('productList', updatedProducts);
        } catch (error) {
            return;
        }
    });

    socket.on('deleteProduct', async (idProduct) => {
        try {
            const c = await dbInstance.deleteProduct(idProduct);
            console.log(c);
            const updatedProducts = await dbInstance.getProducts();
            if (Array.isArray(updatedProducts)) socketServer.emit('productList', updatedProducts);
        } catch (error) {
            return;
        }
    });

    socket.on('disconnect', (mssg) => {
        p -= 1;
        console.log(`${p} connected`);
        console.log(mssg);
    });
});
