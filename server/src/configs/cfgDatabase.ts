import dotenv from 'dotenv';

dotenv.config({
   quiet: true,
   override: false,
});

const DB_STATUS = {
   DISCONNECT: 'DISCONNECT',
   CONNECTED: 'CONNECTED',
   ERROR: 'ERROR',
} as const;

const getOptionConnect = () => {
   return {
      host: process.env.HOST_DB || 'mysql',
      port: Number(process.env.PORT_DB) || 3306,
      user: process.env.USER_DB,
      password: process.env.PASS_DB,
      database: process.env.NAME_DB,

      // Option
      timezone: '+07:00',
      connectTimeout: 5_000,

      supportBigNumbers: true,
      bigNumberStrings: false,
      multipleStatements: false,
      charset: 'utf8mb4_general_ci',
      dateStrings: true,

      connectionLimit: 10,
      waitForConnections: true,
      queueLimit: 0,
   };
};

export { DB_STATUS, getOptionConnect };
