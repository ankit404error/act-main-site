import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME || 'act_site';

if (!MONGODB_URI) {
  console.error('Missing MONGODB_URI in environment');
  process.exit(1);
}

let cachedClient = null;

async function getClient() {
  if (cachedClient && cachedClient.topology?.isConnected && cachedClient.topology.isConnected()) return cachedClient;
  const client = new MongoClient(MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
  await client.connect();
  cachedClient = client;
  return client;
}

app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Health
app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

// Admin login - check static credentials
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (email === 'admin@gmail.com' && password === 'act@123') {
    return res.json({ token: 'admin-token', name: 'admin' });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
});

// Blogs
app.get('/api/blogs', async (_req, res) => {
  try {
    const client = await getClient();
    const col = client.db(DB_NAME).collection('blogs');
    const blogs = await col
      .find({}, { projection: { _id: 0 } })
      .sort({ publishedAt: -1 })
      .toArray();
    res.json(blogs);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Failed to fetch blogs' });
  }
});

app.get('/api/blogs/:slug', async (req, res) => {
  try {
    const client = await getClient();
    const col = client.db(DB_NAME).collection('blogs');
    const blog = await col.findOne({ slug: req.params.slug }, { projection: { _id: 0 } });
    if (!blog) return res.status(404).json({ message: 'Not found' });
    res.json(blog);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Failed to fetch blog' });
  }
});

function requireAdmin(req, res, next) {
  const auth = req.headers['authorization'] || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (token !== 'admin-token') return res.status(401).json({ message: 'Unauthorized' });
  next();
}

app.post('/api/blogs', requireAdmin, async (req, res) => {
  try {
    const { title, slug, metaDescription, content, imageUrl, tags = [], featured = false } = req.body || {};
    if (!title || !slug || !metaDescription || !content) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const client = await getClient();
    const col = client.db(DB_NAME).collection('blogs');

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
    res.status(201).json(doc);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Failed to create blog' });
  }
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
