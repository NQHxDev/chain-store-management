import dotenv from 'dotenv';

dotenv.config({
   quiet: true,
   override: false,
});

import { createApp } from './src/app.ts';
import { initDatabase } from './src/services/databaseService.ts';
import { initRedis } from './src/services/redisService.ts';

const PORT = Number(process.env.PORT_SV) || 5000;
const HOST = process.env.HOST_SV || '127.0.0.1';

async function startServer() {
   try {
      await initDatabase();
      console.log('[>] Database connected');

      await initRedis();
      console.log('[>] Redis connected');

      const server = await createApp();

      server.listen(PORT, HOST, () => {
         console.log(`\n[>] Server running at http://${HOST}:${PORT}`);
         console.log(`[>] API: http://${HOST}:${PORT}/zeion\n`);
      });
   } catch (err) {
      console.error('[X] Start server failed:', err);
      process.exit(1);
   }
}

startServer();
