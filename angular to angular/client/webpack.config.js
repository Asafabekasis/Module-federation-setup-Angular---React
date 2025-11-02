const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

module.exports = {
  output: {
    uniqueName: "angularRemote",
    publicPath: "auto",
    scriptType: 'text/javascript'
  },
  optimization: {
    runtimeChunk: false
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "angularRemote",
      filename: "remoteEntry.js",
      library: { type: "var", name: "angularRemote" },
      exposes: {
        './RemoteComponent': path.resolve(__dirname, './src/app/remote.component.ts'),
      },
      shared: {
        "@angular/core": { 
          singleton: true, 
          strictVersion: false,
          eager: false
        },
        "@angular/common": { 
          singleton: true, 
          strictVersion: false,
          eager: false
        },
        "@angular/common/http": { 
          singleton: true, 
          strictVersion: false,
          eager: false
        },
        "@angular/router": { 
          singleton: true, 
          strictVersion: false,
          eager: false
        },
        "@angular/platform-browser": { 
          singleton: true, 
          strictVersion: false,
          eager: false
        },
        "@angular/platform-browser-dynamic": { 
          singleton: true, 
          strictVersion: false,
          eager: false
        },
      }
    })
  ]
};
