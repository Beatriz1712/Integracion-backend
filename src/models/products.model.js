import mongoose from 'mongoose';

const productsCollection  = 'products';
const productsSchema = new mongoose.Schema({
    title:{
        type: String,
        max:50,
        required:true
    },
    description:{
        type: String,
        max:50,
        required:true
    },
    code: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
})

export const productsModel =mongoose.model(productsCollection, productsSchema)