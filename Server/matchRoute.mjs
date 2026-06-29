import app from './src/app.js';

const paths = ['/register', '/api/v1/auth/register', '/api/v1/auth/login'];
for (const path of paths) {
  const req = { url: path, method: 'POST', headers: {}, socket: {} };
  const res = {};
  const done = (err) => {
    console.log(`path ${path} -> err`, err && err.message);
  };
  try {
    app.handle(req, res, done);
    console.log(`Dispatched ${path}`);
  } catch (err) {
    console.log(`path ${path} threw`, err.message);
  }
}
