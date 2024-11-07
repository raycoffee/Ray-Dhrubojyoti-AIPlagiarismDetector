import http from 'http';
import app from './app.js';

const server = http.createServer(app)

const PORT = process.env.port || 3001;

server.listen(PORT, () => {
  console.log(`App is running on port ${PORT}...`)
})

server.on('error', (err) => {
  console.error('Server error:', err)
  process.exit(1)
})