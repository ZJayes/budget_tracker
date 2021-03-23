const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
    entry: "./public/index.js",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    mode: "",
    pluggins: [
        new WebpackPwaManifest({
           fingerprints: false,
           name: "Budget Tracker",
           short_name: "Budget App",
           description:"An application that allows you to create and track a budget.",
           theme_color: '#ffffff',
           'theme-color': '#ffffff',
           start_url: '/', 
           icons: [
               {
                   src: path.resolve("public/icons/icon-192x192.png"),
                   size: [192, 512]
               }
           ]
        })
    ]
}

module.exports = config;