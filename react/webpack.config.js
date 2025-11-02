const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'reactApp',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
        './react': 'react',
        './react-dom': 'react-dom',
        './react-dom/client': 'react-dom/client',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.2.0',
          strictVersion: false,
          eager: false,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.2.0',
          strictVersion: false,
          eager: false,
        },
      },
      runtimePlugins: [],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:4200, http://localhost:3000',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    },
    setupMiddlewares: (middlewares, devServer) => {
      devServer.app.use((req, res, next) => {
        const origin = req.headers.origin;
        const referer = req.headers.referer;
        const allowedOrigins = ['http://localhost:4200', 'http://localhost:3000'];
        
        // Allow direct browser access (no origin header)
        if (!origin && !referer) {
          return next();
        }
        
        // Block requests from origins other than allowed origins
        if (origin && !allowedOrigins.includes(origin)) {
          console.log(`❌ Blocked request from origin: ${origin}`);
          return res.status(403).send('Access forbidden: Origin not allowed');
        }
        
        if (referer && !allowedOrigins.some(allowed => referer.startsWith(allowed))) {
          console.log(`❌ Blocked request from referer: ${referer}`);
          return res.status(403).send('Access forbidden: Referer not allowed');
        }
        
        next();
      });
      
      return middlewares;
    },
  }
};
