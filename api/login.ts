import { withCors } from './health';

export default function handler(req: any, res: any) {
  withCors(res);
  if (req.method === 'OPTIONS') return res.status(204).send('');

  const { email, password } = req.body || {};
  if (email === 'admin@gmail.com' && password === 'act@123') {
    return res.status(200).json({ token: 'admin-token', name: 'admin' });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
}
