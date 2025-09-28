export const withCors = (res: any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

export default function handler(req: any, res: any) {
  withCors(res);
  if (req.method === 'OPTIONS') {
    return res.status(204).send('');
  }
  return res.status(200).json({ ok: true });
}
