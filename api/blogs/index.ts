import { isAuthorizedAdmin } from '../_auth';
import { getClient, getDbName } from '../_db';
import type { MongoClient } from 'mongodb';

export const withCors = (res: any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

export default async function handler(req: any, res: any) {
  withCors(res);
  if (req.method === 'OPTIONS') return res.status(204).send('');

  try {
    let client: MongoClient;
    let dbName = getDbName();

    if (req.method === 'GET') {
      client = await getClient();
      const col = client.db(dbName).collection('blogs');
      const blogs = await col
        .find({}, { projection: { _id: 0 } })
        .sort({ publishedAt: -1 })
        .toArray();
      return res.status(200).json(blogs);
    }

    if (req.method === 'POST') {
      if (!isAuthorizedAdmin(req.headers['authorization'] as string | undefined)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const { title, slug, metaDescription, content, imageUrl, tags = [], featured = false } = req.body || {};
      if (!title || !slug || !metaDescription || !content) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      client = await getClient();
      const col = client.db(dbName).collection('blogs');
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
        tags: Array.isArray(tags) ? tags : String(tags).split(',').map((t: string) => t.trim()).filter(Boolean),
        readTime,
        featured: Boolean(featured),
      };

      await col.insertOne(doc as any);
      return res.status(201).json(doc);
    }

    res.setHeader('Allow', 'GET, POST, OPTIONS');
    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ message: 'Failed to process request' });
  }
}
