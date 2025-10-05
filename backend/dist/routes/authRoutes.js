import { Router } from 'express';
import { signupController, loginController } from '../controllers/authController.js';
const router = Router();
router.post('/register', signupController);
router.post('/login', loginController);
export default router;
