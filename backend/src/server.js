import app from './app.js';

const port = process.env.PORT || 5000;

app.listen(port, '0.0.0.0', () => { // Listen on 0.0.0.0
  console.log(`🚀 Server running at http://0.0.0.0:${port}`);
});
