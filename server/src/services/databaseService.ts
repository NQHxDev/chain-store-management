import mysql from 'mysql2/promise';
import type { Pool, PoolConnection } from 'mysql2/promise';

import { DB_STATUS, getOptionConnect } from '@/configs/cfgDatabase';

const MAX_RETRY = 10;
const RETRY_DELAY = 3_000;

type DBConnect = {
   status: (typeof DB_STATUS)[keyof typeof DB_STATUS];
   instance: Pool | null;
};

let connectDB: DBConnect = {
   status: DB_STATUS.DISCONNECT,
   instance: null,
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const initDatabase = async (): Promise<Pool> => {
   if (connectDB.instance && connectDB.status === DB_STATUS.CONNECTED) {
      return connectDB.instance;
   }

   let attempt = 0;

   while (attempt < MAX_RETRY) {
      try {
         console.log(
            attempt === 0
               ? '[-] Connecting to Database...'
               : `[-] Reconnecting to Database Attempt: ${attempt}`
         );
         attempt++;
         const pool = mysql.createPool(getOptionConnect());

         const connection = await pool.getConnection();
         await connection.ping();
         connection.release();

         connectDB = {
            status: DB_STATUS.CONNECTED,
            instance: pool,
         };

         return pool;
      } catch (error) {
         console.error('Init Database Error:', error);
         connectDB.status = DB_STATUS.ERROR;

         if (attempt >= MAX_RETRY) {
            console.error('[Error] MySQL Connection Failed After Retries...');
            throw error;
         }

         console.log(`[/] Retrying in ${RETRY_DELAY / 1000}s...`);
         await sleep(RETRY_DELAY);
      }
   }

   throw new Error('[*] Unreachable Database init State');
};

export const getConnectionDB = async (): Promise<PoolConnection> => {
   try {
      if (connectDB.instance && connectDB.status === DB_STATUS.CONNECTED) {
         return connectDB.instance.getConnection();
      }
      const pool = await initDatabase();
      return pool.getConnection();
   } catch (error) {
      console.error('Get Connection Error:', error);
      throw error;
   }
};

export const executeQuery = async <T = any>(
   strQuery: string,
   params: any[] = [],
   connection: PoolConnection | null = null
): Promise<T> => {
   let shouldRelease = false;

   if (!connection) {
      connection = await getConnectionDB();
      shouldRelease = true;
   }
   try {
      const [result] = await connection.execute<T & any>(strQuery, params);
      return result as T;
   } catch (error) {
      console.error('Execute Query Error:', error);
      throw error;
   } finally {
      if (shouldRelease && connection) connection.release();
   }
};

export const transactionQuery = async <T = any>(
   payload: (conn: PoolConnection) => Promise<T>
): Promise<T> => {
   const connection = await getConnectionDB();
   try {
      await connection.beginTransaction();
      const result = await payload(connection);
      await connection.commit();
      return result;
   } catch (error) {
      await connection.rollback();
      console.error('Transaction Query Error:', error);
      throw error;
   } finally {
      if (connection) connection.release();
   }
};
