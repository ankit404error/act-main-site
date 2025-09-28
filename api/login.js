export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const body = JSON.parse(Buffer.concat(chunks).toString() || '{}');

    const { email, password } = body;
    if (email === 'admin@gmail.com' && password === 'act@123') {
      return res.status(200).json({ token: 'admin-token', name: 'admin' });
    }
    
    return res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    return res.status(400).json({ message: 'Invalid request' });
  }
}
