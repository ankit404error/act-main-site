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

  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const raw = Buffer.concat(chunks).toString('utf-8') || '{}';
    const body = JSON.parse(raw);

    const { email, password } = body || {};
    if (email === 'admin@gmail.com' && password === 'act@123') {
      return res.status(200).json({ token: 'admin-token', name: 'admin' });
    }
    return res.status(401).json({ message: 'Invalid credentials' });
  } catch (e) {
    console.error('Login error:', e);
    return res.status(400).json({ message: 'Bad request: ' + e.message });
  }
};
