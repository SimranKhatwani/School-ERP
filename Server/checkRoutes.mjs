import app from './src/app.js';

console.log('has app.router', !!app.router);
console.log('router stack length', app.router?.stack?.length);
app.router?.stack.forEach((layer, i) => {
  console.log('--- layer', i);
  console.log('name:', layer.name);
  if (layer.regexp) console.log('regexp:', layer.regexp.toString());
  if (layer.path) console.log('path:', layer.path);
  if (layer.route) console.log('route:', { path: layer.route.path, methods: layer.route.methods });
  if (layer.handle && layer.handle.stack) {
    console.log('mounted router handle stack:');
    layer.handle.stack.forEach((sub, j) => {
      console.log('   sub', j, 'name', sub.name, 'path', sub.route?.path, 'methods', sub.route?.methods);
    });
  }
});
