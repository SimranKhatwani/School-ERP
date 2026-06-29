const urls = [
  'http://127.0.0.1:5000/register',
  'http://127.0.0.1:5000/api/v1/auth/register'
];

for (const url of urls) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com', password: '123456' })
    });
    console.log(url, res.status);
    console.log(await res.text());
  } catch (err) {
    console.error(url, 'ERROR', err.message);
  }
}
