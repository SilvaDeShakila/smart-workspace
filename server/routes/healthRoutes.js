import express from 'express';
import { sendSuccess } from '../utils/response.js';

const router = express.Router();

router.get('/', (req, res) => {
  sendSuccess(res, { status: 'ok' });
});

export default router;
