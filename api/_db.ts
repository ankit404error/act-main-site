import { MongoClient } from 'mongodb';

let cachedClient: MongoClient | null = null;

export async function getClient(): Promise<MongoClient> {
  if (cachedClient) return cachedClient;
  const uri = process.env.MONGODB_URI as string;
  if (!uri) {
    throw new Error('Missing MONGODB_URI');
  }
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
  await client.connect();
  cachedClient = client;
  return client;
}

export function getDbName(): string {
  return (process.env.DB_NAME as string) || 'act_site';
}
