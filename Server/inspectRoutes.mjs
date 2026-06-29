import app from './src/app.js';

console.log('app constructor', app.constructor.name);
console.log('has app.router', !!app.router);
console.log('app.router constructor', app.router?.constructor.name);
console.log('app.router.stack length', app.router?.stack?.length);

app.router?.stack.forEach((layer, i) => {
  console.log('--- layer', i);
  console.log('name:', layer.name);
  console.log('keys:', Object.keys(layer));
  if ('regexp' in layer) console.log('regexp:', layer.regexp, layer.regexp?.toString());
  if ('path' in layer) console.log('path prop:', layer.path);
  if ('route' in layer && layer.route) console.log('route:', { path: layer.route.path, methods: layer.route.methods });
  if (layer.handle && layer.handle.stack) {
    console.log('mounted router handle stack length:', layer.handle.stack.length);
    layer.handle.stack.forEach((sub, j) => {
      console.log('  sub', j, 'name', sub.name, 'keys', Object.keys(sub), 'route', sub.route ? { path: sub.route.path, methods: sub.route.methods } : null);
    });
  }
});
