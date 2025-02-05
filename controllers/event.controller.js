import Event from '../models/event.model.js';

// Crear evento
export const createEvent = async (req, res) => {
    try {
        const { title, description, date, location, image, tickets } = req.body;
        const newEvent = new Event({ title, description, date, location, image, tickets });
        const eventSaved = await newEvent.save();
        res.status(201).json(eventSaved);
    } catch (error) {
        console.error('Error al crear evento:', error);
        res.status(500).json({ message: 'Error al crear evento', error: error.message });
    }
};

// Obtener eventos
export const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        console.error('Error al obtener eventos:', error);
        res.status(500).json({ message: 'Error al obtener eventos', error: error.message });
    }
};

// Obtener evento por ID
export const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const eventFound = await Event.findById(id);
        if (!eventFound) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.status(200).json(eventFound);
    } catch (error) {
        console.error('Error al obtener evento:', error);
        res.status(500).json({ message: 'Error al obtener evento', error: error.message });
    }
};

// Actualizar evento
export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, location, image, tickets } = req.body;
        const eventUpdated = await Event.findByIdAndUpdate(id, { title, description, date, location, image, tickets }, { new: true });
        if (!eventUpdated) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.status(200).json(eventUpdated);
    } catch (error) {
        console.error('Error al actualizar evento:', error);
        res.status(500).json({ message: 'Error al actualizar evento', error: error.message });
    }
};

// Eliminar evento
export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const eventDeleted = await Event.findByIdAndDelete(id);
        if (!eventDeleted) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.status(200).json({ message: 'Evento eliminado', event: eventDeleted });
    } catch (error) {
        console.error('Error al eliminar evento:', error);
        res.status(500).json({ message: 'Error al eliminar evento', error: error.message });
    }
};