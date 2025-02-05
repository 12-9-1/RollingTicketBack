import User from '../models/user.model.js'; // Asegúrate de importar el modelo correcto

export const editUserProfile = async (req, res) => {
  const { id } = req.params; // ID del usuario desde los parámetros
  const updatedData = req.body; // Datos actualizados del cuerpo

  try {
    const user = await User.findByIdAndUpdate(id, updatedData, { new: true });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    res.status(200).json({ message: 'Perfil actualizado con éxito', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el perfil', error });
  }
};
