import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

// router.post('/update/:id', verifyToken, updateUser);
router.post('/update/:id', updateUser);

router.delete('/delete/:id', deleteUser);

export default router;