//purchase.model.js
import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({

    itemTitle: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    },
    paymentMethod: {  // Nuevo campo para el método de pago
        type: String,
        default: "No especificado",
    },
    items: [{  // Nuevo campo para los items en la compra
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },  // Asegúrate de tener un modelo de Product
        productName: String,
        quantity: Number,
        price: Number
    }],
    total: {  // Nuevo campo para el total de la compra
        type: Number,
        required: true,
    }
});

export default mongoose.model("Purchase", purchaseSchema);