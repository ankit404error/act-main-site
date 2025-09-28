import { isAuthorizedAdmin } from '../_auth';
import { getClient, getDbName } from '../_db';

export const withCors = (res: any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

export default async function handler(req: any, res: any) {
  withCors(res);
  if (req.method === 'OPTIONS') return res.status(204).send('');

  try {
    const client = await getClient();
    const col = client.db(getDbName()).collection('blogs');

    if (req.method === 'GET') {
      const blog = await col.findOne({ slug: req.query.slug }, { projection: { _id: 0 } });
      if (!blog) return res.status(404).json({ message: 'Not found' });
      return res.status(200).json(blog);
    }

    if (req.method === 'PUT') {
      if (!isAuthorizedAdmin(req.headers['authorization'] as string | undefined)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const { title, metaDescription, content, imageUrl, tags, featured } = req.body || {};
      const update: any = { $set: { updatedAt: new Date().toISOString() } };
      if (typeof title === 'string' && title.trim()) update.$set.title = title;
      if (typeof metaDescription === 'string') update.$set.metaDescription = metaDescription;
      if (typeof content === 'string' && content.trim()) {
        update.$set.content = content;
        const words = String(content).split(/\s+/).filter(Boolean);
        update.$set.readTime = Math.max(1, Math.ceil(words.length / 200));
      }
      if (typeof imageUrl === 'string') update.$set.imageUrl = imageUrl;
      if (Array.isArray(tags)) update.$set.tags = tags;
      if (typeof featured !== 'undefined') update.$set.featured = Boolean(featured);

      const result = await col.findOneAndUpdate(
        { slug: req.query.slug },
        update,
        { returnDocument: 'after', projection: { _id: 0 } }
      );
      if (!result.value) return res.status(404).json({ message: 'Blog post not found' });
      return res.status(200).json(result.value);
    }

    if (req.method === 'DELETE') {
      if (!isAuthorizedAdmin(req.headers['authorization'] as string | undefined)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const result = await col.deleteOne({ slug: req.query.slug });
      if (result.deletedCount === 0) return res.status(404).json({ message: 'Blog post not found' });
      return res.status(204).send('');
    }

    res.setHeader('Allow', 'GET, PUT, DELETE, OPTIONS');
    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ message: 'Failed to process request' });
  }
}
