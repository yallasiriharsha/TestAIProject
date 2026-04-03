import express from 'express';
import { classController } from '../controllers/classController.js';

const router = express.Router();

// Class routes
router.get('/', classController.getAll);
router.get('/:id', classController.getById);
router.post('/', classController.create);
router.put('/:id', classController.update);
router.delete('/:id', classController.delete);

export default router;
