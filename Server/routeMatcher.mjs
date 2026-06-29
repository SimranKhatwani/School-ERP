import app from './src/app.js';

const layer = app.router.stack.find((l) => l.name === 'router' && l.handle && l.handle.stack);
console.log('found router layer:', !!layer);
if (!layer) process.exit(0);
console.log('layer.matchers', layer.matchers);
console.log('matchers length', layer.matchers?.length);
if (layer.matchers?.length) {
  for (const matcher of layer.matchers) {
    console.log('matcher', matcher.toString());
    console.log('test /api/v1/auth/register', matcher('/api/v1/auth/register'));
    console.log('test /register', matcher('/register'));
  }
}
for (const sub of layer.handle.stack) {
  console.log('sub route', sub.route.path, Object.keys(sub.route.methods));
  if (sub.regexp) console.log('sub regexp', sub.regexp.toString());
}
