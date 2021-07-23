import express from 'express';
import authController from '../controllers/authController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.route('/register')
    .post(authController.register);

router.route('/signin')
    .post(authController.signIn);

router.route('/protected')
    .get(authMiddleware.verifyJwt, authController.protectedRouteExample);


export default router;