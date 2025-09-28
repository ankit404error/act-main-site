import { MongoClient } from 'mongodb';

let cachedClient = null;

export async function getClient(uri) {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
  await client.connect();
  cachedClient = client;
  return client;
}
