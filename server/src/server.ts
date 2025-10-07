import express from 'express';

const app = express();
const PORT = 3000;

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express + TypeScript!' });
});

app.listen(PORT, () => {
  console.log(`Express server is running at http://localhost:${PORT}`);
});