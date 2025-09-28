const { MongoClient } = require('mongodb');

let cachedClient = null;

async function getClient(uri) {
  if (cachedClient && cachedClient.topology && cachedClient.topology.isConnected()) {
    return cachedClient;
  }
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
  await client.connect();
  cachedClient = client;
  return client;
}

module.exports = { getClient };
