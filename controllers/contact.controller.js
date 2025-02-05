// contact.controller.js
import { Contact } from '../models/contact.model.js'; // Asegúrate de tener un modelo de Contacto

export const createContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const newContact = new Contact({
            name,
            email,
            subject,
            message
        });

        await newContact.save();

        res.status(201).json({ message: 'Mensaje enviado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al enviar el mensaje', error: error.message });
    }
};