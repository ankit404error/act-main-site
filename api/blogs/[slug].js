const { getClient } = require('../_db.js');

module.exports = async function handler(req, res) {
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

  if (req.method === 'GET') {
    // Get individual blog post
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

  if (req.method === 'DELETE') {
    console.log('DELETE request received for slug:', req.query.slug);
    
    // Delete blog post (admin only)
    const auth = req.headers['authorization'] || '';
    console.log('Authorization header:', auth);
    
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
    console.log('Extracted token:', token ? 'Present' : 'Missing');
    
    if (token !== 'admin-token') {
      console.log('Unauthorized delete attempt');
      return res.status(401).json({ message: 'Unauthorized - Invalid or missing admin token' });
    }

    if (!MONGODB_URI) {
      console.log('No MongoDB URI configured, cannot delete from database');
      return res.status(500).json({ message: 'Database not configured' });
    }

    try {
      console.log('Attempting to connect to MongoDB...');
      const client = await getClient(MONGODB_URI);
      const col = client.db(DB_NAME).collection('blogs');
      
      console.log('Attempting to delete blog with slug:', req.query.slug);
      const result = await col.deleteOne({ slug: req.query.slug });
      console.log('Delete result:', result);
      
      if (result.deletedCount === 0) {
        console.log('No blog found with slug:', req.query.slug);
        return res.status(404).json({ message: 'Blog post not found' });
      }
      
      console.log('Blog deleted successfully!');
      return res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (e) {
      console.error('Delete API Error:', e);
      return res.status(500).json({ message: 'Failed to delete blog: ' + e.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
};
