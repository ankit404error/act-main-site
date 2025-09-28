module.exports = async function handler(req, res) {
  try {
    // Add CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    const { slug } = req.query;

    if (req.method === 'GET') {
      // For now, return 404 since we don't have MongoDB configured
      return res.status(404).json({ message: 'Blog post not found' });
    }

    if (req.method === 'DELETE') {
      // Check admin auth
      const auth = req.headers['authorization'] || '';
      const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
      
      if (token !== 'admin-token') {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // For now, return success since we don't have MongoDB
      return res.status(200).json({ message: 'Blog post deletion simulated (no database)' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Internal server error: ' + error.message });
  }
};
