import dotenv from 'dotenv';

dotenv.config({
   quiet: true,
   override: false,
});

import { createApp } from './src/app.ts';
import { initDatabase } from './src/services/databaseService';
import { initRedis } from './src/services/redisService';

const portServer = Number(process.env.PORT_SV) || 5000;
const hostServer = process.env.HOST_SV || '127.0.0.1';

async function startServer() {
   try {
      await initDatabase();
      console.log('[✓] Database Connected Successfully!');

      await initRedis();
      console.log('[✓] Redis Connected Successfully!');

      const server = await createApp({ hostServer, portServer });

      server.listen(portServer, hostServer, () => {
         console.log(`\n[>] Server running at http://${hostServer}:${portServer}`);
         console.log(`[>] API: http://${hostServer}:${portServer}/api\n`);
      });
   } catch (err) {
      console.error('[Error] Start server failed:', err);
      process.exit(1);
   }
}

startServer();
