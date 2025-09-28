export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(404).json({ message: 'Blog post not found' });
  }

  if (req.method === 'DELETE') {
    const auth = req.headers['authorization'] || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
    
    if (token !== 'admin-token') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    return res.status(200).json({ message: 'Blog post deletion simulated' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
