//  const { createProxyMiddleware } = require('http-proxy-middleware');
// const createProxyMiddleware = require('http-proxy-middleware');

//     module.exports = function(app) {
//     app.use(
//         '/getproducts', //this is your api
//         createProxyMiddleware({
//           target:'http://localhost/training/payment/Atompay/sample.php', //this is your whole endpoint link
//           changeOrigin: true,
//         })
//       );
//       app.use(
//         '/createmassbooking', //this is your api
//         createProxyMiddleware({
//           target:'http://172.104.76.206:8081/api/create-mass-booking', //this is your whole endpoint link
//           changeOrigin: true,
//         })
//       );
//     };

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/getproducts', {
      target: 'http://localhost/training/payment/Atompay/sample.php', // API endpoint 1
      changeOrigin: true,
      pathRewrite: {
        "^/getproducts": "",
      },
      headers: {
        Connection: "keep-alive"
      }
    })
  );
  app.use(
    createProxyMiddleware('/massbook', {
      target: 'http://172.104.76.206:8081/api', // API endpoint 2
      changeOrigin: true,
      pathRewrite: {
        "^/massbook": "",
      },
      headers: {
        Connection: "keep-alive"
      }
    })
  );
}