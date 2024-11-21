import express from 'express';
import apiRoutes from './api/index.js';

const router = express.Router();

router.use('/api', apiRoutes); // Prefix all API routes with `/api`

export default router;
