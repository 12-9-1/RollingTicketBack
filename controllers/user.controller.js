//user.controller.js
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


// Registrar un nuevo usuario
export const registerUser = async (req, res) => {

  try {
    const { name, email, password, confirmPassword, address } = req.body;

    // Validación de contraseñas
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Las contraseñas no coinciden" });
    }

    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "El usuario ya está registrado" });
    }

    // Crear nuevo usuario
    const user = new User({
      name,
      email,
      password, // Asegúrate de hashear la contraseña antes de guardarla
      address
    });

    await user.save();

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error(error); // Ver errores en la terminal
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Login de usuario
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Genera el token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Responde con el token y el rol
    res.status(200).json({ message: 'Inicio de sesión exitoso', token, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

// Obtener el perfil del usuario
export const getProfile = async (req, res) => {
  try {
    const userId = req.userId; // Asegúrate de que `req.userId` se extrae correctamente del middleware de autenticación

    const user = await User.findById(userId).select('-password'); // Excluir la contraseña

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};


// Actualizar el perfil del usuario
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId); // Asegúrate de que se use req.userId aquí también

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    Object.assign(user, req.body);
    await user.save();

    res.json({ message: "Perfil actualizado", user });
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    res.status(500).json({ message: "Error actualizando el perfil", error });
    
  }
};


const handleAvatarUrlChange = async () => {
  if (newAvatarUrl && isValidImageUrl(newAvatarUrl) && newAvatarUrl !== user.profilePicture) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:4000/api/usuarios/editProfile', {
        ...user,
        profilePicture: newAvatarUrl,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(response.data);
      setNewAvatarUrl('');
    } catch (error) {
      console.error('Error al actualizar la foto de perfil:', error);
      alert('Hubo un error al cambiar la foto de perfil');
    }
  } else {
    alert('La URL no es válida o no es una imagen.');
  }
};



// Asignar rol de admin a un usuario
export const assignAdminRole = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId); // Busca al usuario por ID

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Solo actualizamos el rol sin modificar otros campos
    user.role = 'admin'; 

    // Actualizar el rol del usuario sin afectar el resto del documento
    await User.updateOne({ _id: userId }, { $set: { role: 'admin' } });

    res.status(200).json({ message: 'Rol de administrador asignado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al asignar el rol de admin', error });
  }
};



// Buscar usuarios por nombre o correo
export const searchUsers = async (req, res) => {
    const { searchTerm } = req.query;

    try {
        const users = await User.find({
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { email: { $regex: searchTerm, $options: 'i' } }
            ]
        });
        console.log(users); // Verifica los datos que estás obteniendo
        res.status(200).json({ users, total });
        

    } catch (error) {
        res.status(500).json({ message: 'Error al buscar usuarios', error });
    }
};

// Obtener todos los usuarios (solo admins)
export const getAllUsers = async (req, res) => {
    const { query, page = 1, limit = 10 } = req.query;

    try {
        const filters = query
            ? {
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { email: { $regex: query, $options: 'i' } }
                ]
            }
            : {};

        const users = await User.find(filters)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await User.countDocuments(filters);

       
res.status(200).json({ users, total });



    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios.', error: error.message });
    }
};

// user.controller.js
export const deleteUser = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }
  
      res.json({ message: 'Usuario eliminado correctamente.' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el usuario.', error });
    }
  };