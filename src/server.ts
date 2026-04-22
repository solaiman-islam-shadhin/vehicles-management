import dotenv from 'dotenv';
import app from './app';
import { initDatabase } from './config/database';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Initialize database
initDatabase().catch(console.error);

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
export default app;
