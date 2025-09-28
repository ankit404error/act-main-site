import { getClient } from '../_db.js';

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { MONGODB_URI, DB_NAME = 'act_site' } = process.env;
  if (!MONGODB_URI) return res.status(404).json({ message: 'Not found' });

  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  try {
    const client = await getClient(MONGODB_URI);
    const col = client.db(DB_NAME).collection('blogs');
    const blog = await col.findOne({ slug: req.query.slug }, { projection: { _id: 0 } });
    if (!blog) return res.status(404).json({ message: 'Not found' });
    return res.status(200).json(blog);
  } catch (e) {
    console.error('API Error:', e);
    return res.status(500).json({ message: 'Failed to fetch blog' });
  }
}
