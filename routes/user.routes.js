//user.routes.js
import express from 'express';
import { 
  registerUser, 
  loginUser, 
  getProfile, 
  updateUserProfile, 
  assignAdminRole, 
  searchUsers, 
  getAllUsers,
  deleteUser 
} from '../controllers/user.controller.js';
import { authMiddleware, authenticateToken, adminRole, verifyRole, checkRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Ruta de registro
router.post('/register', registerUser);

// Ruta de login
router.post('/login', loginUser);

// Ruta para obtener el perfil del usuario
router.get('/profile', authMiddleware, getProfile);

// Ruta para actualizar el perfil del usuario
router.put('/editProfile', authenticateToken, updateUserProfile);

// Ruta para asignar rol de admin
router.put('/assign-admin/:userId', assignAdminRole);

// Ruta para obtener todos los usuarios
router.get('/usuarios', getAllUsers);

// Ruta para buscar usuarios
router.get('/search-users', searchUsers);

// Ruta para eliminar un usuario
router.delete('/usuarios/:userId', deleteUser);

export default router;