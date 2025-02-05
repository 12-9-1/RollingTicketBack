//purchase.routes.js 
import express from 'express';
import { 
    createPurchase, 
    getPurchasesByUser, 
    getPurchases, 
    getPurchaseById, 
    deletePurchase 
} from '../controllers/purchase.controller.js';
import authMiddleware, { checkRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Crear una compra (solo usuarios autenticados pueden comprar)
router.post('/', authMiddleware, checkRole(['user']), createPurchase);

// Obtener todas las compras (solo administradores pueden ver todas)
router.get('/', authMiddleware, checkRole(['admin']), getPurchases);

// Obtener compras del usuario autenticado
router.get('/me', authMiddleware, getPurchasesByUser);

// Obtener una compra por ID (usuarios ven solo sus compras, admin puede ver cualquier compra)
router.get('/:id', authMiddleware, getPurchaseById);

// Eliminar una compra (solo administradores pueden eliminar)
router.delete('/:id', authMiddleware, checkRole(['admin']), deletePurchase);

export default router;
