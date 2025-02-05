import AboutUs from "../models/about.model.js";
// Crear evento
export const createAboutUs = async (req, res) => {
  try {
    const { title, text, img, githubLink, } = req.body;
    const newAboutUs = new AboutUs({title, text, img, githubLink,});
    const AboutUsSaved = await newAboutUs.save();
    res.status(201).json(AboutUsSaved);
  } catch (error) {
    console.error("Error al crear card about us:", error);
    res
      .status(500)
      .json({ message: "Error al crear card about us", error: error.message });
  }
};

// Obtener eventos
export const getAboutUs = async (req, res) => {
  try {
    const aboutuss = await AboutUs.find();
    res.status(200).json(aboutuss);
  } catch (error) {
    console.error("Error al obtener info aboutus:", error);
    res
      .status(500)
      .json({ message: "Error al obtener info aboutus", error: error.message });
  }
};


// Actualizar evento
export const updateAboutUs = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, text, img, githubLink, } = req.body;
    const aboutusUpdated = await AboutUs.findByIdAndUpdate(
      id,
      { title, text, img, githubLink },
      { new: true }
  );
  
    if (!aboutusUpdated) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    res.status(200).json(aboutusUpdated);
  } catch (error) {
    console.error("Error al actualizar aboutus:", error);
    res
      .status(500)
      .json({ message: "Error al actualizar aboutus", error: error.message });
  }
};

// Eliminar evento
export const deleteAboutUs = async (req, res) => {
  try {
    const { id } = req.params;
    const aboutusDeleted = await AboutUs.findByIdAndDelete(id);

    if (!aboutusDeleted) {
      return res.status(404).json({ message: "about us no encontrado" });
    }
    res.status(200).json({ message: "about us eliminado", AboutUs: aboutusDeleted});
  } catch (error) {
    console.error("Error al eliminar about us:", error);
    res
      .status(500)
      .json({ message: "Error al eliminar about us", error: error.message });
  }
};
