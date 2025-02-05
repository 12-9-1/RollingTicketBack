//editProfile.routes.js
import express from 'express';
import { editUserProfile } from '../controllers/editProfile.controller.js';

const router = express.Router();

router.put('/:id', editUserProfile);

export default router;
