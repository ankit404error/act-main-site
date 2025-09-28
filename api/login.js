export default async function handler(req, res) {
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
    return res.status(400).json({ message: 'Bad request' });
  }
}
