import express from 'express';
import bcrypt from 'bcrypt';
import { signup, login } from '../../controllers/authController.js';

const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Test bcrypt hashing and comparison
router.post('/test-bcrypt', async (req, res) => {
  const { password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Generated Hash:', hashedPassword);

    // Compare the password
    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log('Comparison Result:', isMatch);

    res.status(200).json({ hashedPassword, isMatch });
  } catch (error) {
    console.error('Bcrypt Test Error:', error);
    res.status(500).json({ message: 'Bcrypt test failed', error });
  }
});

export default router;
