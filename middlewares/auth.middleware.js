//auth.middleware.js
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Correcto

  if (!token) {
    return res.status(401).json({ message: 'No autorizado, token no proporcionado' });
  }

  try {
    // Decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token descodificado:", decoded);
    req.userId = decoded.userId; // Asignar el userId al objeto de la solicitud
    req.role = decoded.role;      // Asignar el rol también si es necesario

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token no válido', error: error.message });
  }
};

// Solo una exportación por defecto
export default authMiddleware;


export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Acceso no autorizado' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'Token no válido' });
      req.userId = user.id;  // Asegúrate de que el token contiene el id del usuario
      next();
  });
};


// Las otras exportaciones permanecen como están
export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // 'Bearer <token>'
  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    req.userId = decoded.userId; // El 'userId' que viene del token
    next();
  });
};

export const adminRole = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'No tienes permisos para esta acción. Necesitas rol de administrador.' });
  }
  next();
};

export const verifyRole = (role) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (userRole !== role) {
      return res.status(403).json({ message: 'Acceso denegado. Rol insuficiente.' });
    }
    next();
  };
};

export const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    try {
      const userRole = req.user.role;
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: 'No tienes permiso para realizar esta acción. Rol no permitido.' });
      }
      next();
    } catch (error) {
      res.status(500).json({ message: 'Error interno del servidor al verificar roles.', error: error.message });
    }
  };
};
