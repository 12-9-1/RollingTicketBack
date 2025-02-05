//purchase.controller.js
import mongoose from 'mongoose';
import Purchase from '../models/purchase.model.js';

// Crear una compra
export const createPurchase = async (req, res) => {
    const { items, total, paymentMethod } = req.body;
    const { userId } = req;

    try {
        console.log("Datos recibidos en createPurchase:", { userId, items, total, paymentMethod });

        // Validar que cada item tenga los campos requeridos
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'La compra debe incluir al menos un producto' });
        }

        // Validar cada item antes de guardarlo
        const validatedItems = items.map(item => {
            if (!item.productId || !mongoose.Types.ObjectId.isValid(item.productId)) {
                throw new Error(`El productId '${item.productId}' no es válido.`);
            }
            if (!item.price || isNaN(item.price)) {
                throw new Error('Cada producto debe tener un precio válido.');
            }
            if (!item.itemTitle || typeof item.itemTitle !== 'string') {
                throw new Error('Cada producto debe tener un título válido.');
            }

            return {
                productId: new mongoose.Types.ObjectId(item.productId),
                quantity: item.quantity || 1,
                price: item.price,
                itemTitle: item.itemTitle,
            };
        });

        const newPurchase = new Purchase({
            items: validatedItems,
            total,
            userId,
            paymentMethod,
        });

        await newPurchase.save();
        console.log("Compra guardada exitosamente:", newPurchase);

        return res.status(201).json(newPurchase);

    } catch (error) {
        console.error('Error en createPurchase:', error.message);
        res.status(500).json({ message: 'Error al crear la compra', error: error.message });
    }
};

// Obtener compras de un usuario
export const getPurchasesByUser = async (req, res) => {
    const { userId } = req;
    
    try {
        const purchases = await Purchase.find({ userId }).populate('items.productId');
        return res.json(purchases);
    } catch (error) {
        console.error('Error al obtener las compras:', error);
        res.status(500).json({ message: 'Error al obtener las compras', error: error.message });
    }
};

// Eliminar una compra
// Eliminar una compra (solo el dueño puede eliminarla)
export const deletePurchase = async (req, res) => {
    const { id } = req.params;
    const { userId } = req; // Obtener el userId del token

    try {
        const purchase = await Purchase.findById(id);

        if (!purchase) {
            return res.status(404).json({ message: 'Compra no encontrada' });
        }

        // Verificar que la compra pertenezca al usuario autenticado
        if (purchase.userId.toString() !== userId) {
            return res.status(403).json({ message: 'No autorizado para eliminar esta compra' });
        }

        await Purchase.findByIdAndDelete(id);
        res.json({ message: 'Compra eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la compra', error: error.message });
    }
};


// Obtener todas las compras (solo admin)
export const getPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find().populate('userId', 'name email');
        res.json(purchases);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener todas las compras', error: error.message });
    }
};

// Obtener una compra por ID
export const getPurchaseById = async (req, res) => {
    try {
        const purchase = await Purchase.findById(req.params.id).populate('userId', 'name email');
        if (!purchase) {
            return res.status(404).json({ message: 'Compra no encontrada' });
        }
        res.json(purchase);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la compra', error: error.message });
    }
};
