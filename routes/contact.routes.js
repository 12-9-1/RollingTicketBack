// contact.routes.js
import express from 'express';
import { createContact } from '../controllers/contact.controller.js';

const router = express.Router();

router.post('/contact', createContact);

export default router;

// contact.controller.js