import express from 'express';
import {
    loginUser,
    registerUser,
    adminLogin,
    getProfile,
    updateProfile,
    changePassword
} from '../controllers/userController.js';
import authUser from '../middleware/authMiddleware.js';

const userRouter = express.Router();

// Public Routes
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);

// Protected Routes
userRouter.get('/profile', authUser, getProfile);
userRouter.put('/profile', authUser, updateProfile);
userRouter.put('/changepassword', authUser, changePassword);

export default userRouter;
