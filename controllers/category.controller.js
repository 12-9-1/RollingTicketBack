import Category from '../models/category.model.js';

// Crear categoría
export const createCategory = async (req, res) => {
    try {
        const { name, description, image } = req.body;
        const newCategory = new Category({ name, description, image });
        const categorySaved = await newCategory.save();
        res.status(201).json(categorySaved);
    } catch (error) {
        console.error('Error al crear categoría:', error);
        res.status(500).json({ message: 'Error al crear categoría', error: error.message });
    }
};

// Obtener categorías
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        res.status(500).json({ message: 'Error al obtener categorías', error: error.message });
    }
};

// Actualizar categoría
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, image } = req.body;
        const categoryUpdated = await Category.findByIdAndUpdate(id, { name, description, image }, { new: true });
        if (!categoryUpdated) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.status(200).json(categoryUpdated);
    } catch (error) {
        console.error('Error al actualizar categoría:', error);
        res.status(500).json({ message: 'Error al actualizar categoría', error: error.message });
    }
};

// Eliminar categoría
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const categoryDeleted = await Category.findByIdAndDelete(id);
        if (!categoryDeleted) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.status(200).json({ message: 'Categoría eliminada', category: categoryDeleted });
    } catch (error) {
        console.error('Error al eliminar categoría:', error);
        res.status(500).json({ message: 'Error al eliminar categoría', error: error.message });
    }
};