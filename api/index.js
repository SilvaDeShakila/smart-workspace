import app from '../server/app.js';
import { connectDB } from '../server/config/db.js';

let dbPromise;

export default async function handler(req, res) {
  try {
    if (!dbPromise) {
      dbPromise = connectDB();
    }

    await dbPromise;

    const requestedPath = req.query?.path;

    if (typeof requestedPath === 'string') {
      const url = new URL(req.url, 'http://localhost');
      url.searchParams.delete('path');

      const query = url.searchParams.toString();
      req.url = `/api/${requestedPath.replace(/^\/+/, '')}${query ? `?${query}` : ''}`;
    }

    return app(req, res);
  } catch (error) {
    console.error('API request failed:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
