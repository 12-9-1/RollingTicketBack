//app.js
import express from 'express'; // Importa express
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import userRoutes from './routes/user.routes.js'; // Asegúrate de importar estas rutas
import eventRoutes from './routes/event.routes.js';
import categoryRoutes from './routes/category.routes.js';
import purchaseRoutes from './routes/purchase.routes.js';
import contactRoutes from './routes/contact.routes.js';
import aboutusRoutes from './routes/aboutus.routes.js';
import { createRole } from './utils/roles.js';

// Inicializa express
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());

// Crear roles predeterminados
createRole();

// Rutas
app.use('/api/usuarios', userRoutes);
app.use('/api/eventos', eventRoutes);
app.use('/api/categorias', categoryRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api', contactRoutes);
app.use('/api/AboutUs', aboutusRoutes);

export default app;


