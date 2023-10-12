import mongoose from 'mongoose';
const cartsCollection  = 'carts';
const cartsSchema = new mongoose.Schema({
    description:{
        type: String,
        max:50,
        required:true
    },
    quantity: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
})

export const cartsModel=mongoose.model(cartsCollection, cartsSchema)
//metodos acciones para interactuar con la base de datos
//module.exports = {userModel}
