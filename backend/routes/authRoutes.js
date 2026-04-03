import express from 'express';
import jwt from 'jsonwebtoken';
import { 
  register, login, setup2FA, verify2FASetup, 
  verify2FALogin, forgotPassword, resetPassword, changePassword
} from '../controllers/authController.js';

const router = express.Router();

// Middleware to protect routes and verify JWT
const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecret');
      req.user = decoded; // Contains id and type
      next();
    } catch (error) {
      res.status(401).json({ error: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ error: 'Not authorized, no token' });
  }
};

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Authenticated Password Change
router.post('/change-password', protect, changePassword);

// 2FA Routes (Protected by either full access token or 2fa_pending token)
router.post('/2fa/setup', protect, setup2FA);
router.post('/2fa/verify-setup', protect, verify2FASetup);
router.post('/2fa/verify-login', protect, verify2FALogin);

export default router;
