import { getClient } from '../_db.js';

function requireAdmin(req, res) {
  const auth = req.headers['authorization'] || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (token !== 'admin-token') return res.status(401).json({ message: 'Unauthorized' });
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf-8') || '{}';
  return JSON.parse(raw);
}

export default async function handler(req, res) {
  const { MONGODB_URI, DB_NAME = 'act_site' } = process.env;
  if (!MONGODB_URI) return res.status(500).json({ message: 'Missing MONGODB_URI' });

  const client = await getClient(MONGODB_URI);
  const col = client.db(DB_NAME).collection('blogs');

  if (req.method === 'GET') {
    try {
      const blogs = await col.find({}, { projection: { _id: 0 } }).sort({ publishedAt: -1 }).toArray();
      return res.status(200).json(blogs);
    } catch (e) {
      return res.status(500).json({ message: 'Failed to fetch blogs' });
    }
  }

  if (req.method === 'POST') {
    const unauthorized = requireAdmin(req, res);
    if (unauthorized) return; // response was already sent
    try {
      const { title, slug, metaDescription, content, imageUrl, tags = [], featured = false } = await readJson(req);
      if (!title || !slug || !metaDescription || !content) return res.status(400).json({ message: 'Missing required fields' });

      const existing = await col.findOne({ slug });
      if (existing) return res.status(409).json({ message: 'Slug already exists' });

      const words = String(content).split(/\s+/).filter(Boolean);
      const readTime = Math.max(1, Math.ceil(words.length / 200));
      const doc = {
        id: slug,
        slug,
        title,
        metaDescription,
        content,
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1472&q=80',
        author: { name: 'Admin', avatar: '/lovable-uploads/9a295041-b715-4e21-8400-d0ea69a1e49e.png' },
        publishedAt: new Date().toISOString(),
        tags: Array.isArray(tags) ? tags : String(tags).split(',').map((t) => t.trim()).filter(Boolean),
        readTime,
        featured: Boolean(featured),
      };
      await col.insertOne(doc);
      return res.status(201).json(doc);
    } catch (e) {
      return res.status(500).json({ message: 'Failed to create blog' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
