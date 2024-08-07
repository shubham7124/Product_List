const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'https://intern-task-api.bravo68web.workers.dev',
      changeOrigin: true,
      pathRewrite: {
        '^/auth': '', // Remove /auth prefix when forwarding the request
      },
    })
  );
};
