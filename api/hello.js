export default function handler(request, response) {
  response.status(200).json({
    name: 'Hello from Vercel!',
    timestamp: new Date().toISOString()
  });
}