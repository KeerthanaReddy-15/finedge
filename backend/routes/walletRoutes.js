import express from 'express';
import jwt from 'jsonwebtoken';
import { getBalance, deposit, transfer, executeTrade, getTransactions } from '../controllers/walletController.js';

const router = express.Router();

const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecret');
      req.user = decoded; 
      next();
    } catch (error) {
      res.status(401).json({ error: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ error: 'Not authorized, no token' });
  }
};

router.get('/balance', protect, getBalance);
router.get('/transactions', protect, getTransactions);
router.post('/deposit', protect, deposit);
router.post('/transfer', protect, transfer);
router.post('/trade', protect, executeTrade);

export default router;
