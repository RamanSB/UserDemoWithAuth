import express from 'express';
import authController from '../controllers/authController.js';
import dataController from '../controllers/dataController.js';
import authMiddleware from '../middlewares/auth.js';


const router = express.Router();

router.route('/register')
    .post(authController.register);

router.route('/signin')
    .post(authController.signIn);

router.route('/main')
    .get(authMiddleware.verifyJwt, authController.protectedRouteExample);

router.route('/main/increment')
    .post(authMiddleware.verifyJwt, authController.incrementCounter)

export default router;