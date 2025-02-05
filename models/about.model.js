import mongoose from "mongoose";
// Definir el esquema
const aboutUsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  img: { type: String, required: true },
  githubLink: { type: String, required: true },
});

  
  export default  mongoose.model('AboutUs', aboutUsSchema);
  