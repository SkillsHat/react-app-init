### Setup

To get started, create a new directory for your React app. Then, initialize your project with *npm init* and open it in an editor of your choice. It’s also a pretty good time to *git init* as well. In your new project folder, create the following structure:

```
+-- public
+-- src
```

Exclude the built version and our node modules from commits, so let’s go ahead and add a .gitignore file excluding (at least) the directories node_modules and dist.


Our public directory will handle any static assets, and most importantly houses our index.html file, which react will utilize to render your app. The following code was sourced from the react documentation with some very slight modifications. Feel free to copy the following HTML markup into a new file *index.html* inside of the public directory.

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>React Starter</title>
</head>

<body>
  <div id="root"></div>
  <noscript>
    You need to enable JavaScript to run this app.
  </noscript>
  <script src="../dist/bundle.js"></script>
</body>

</html>
```

Now that we’ve got our HTML page set up, we can start getting serious. We’re going to need to set up a few more things. First, we need to make sure the code we write can be compiled, so we’ll need Babel.

### Babel
```
npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/preset-react
```

In the project root, create a file called *.babelrc*. Here, we’re telling babel that we’re going to use the env and react presets.

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

### Webpack
```
npm install --save-dev webpack webpack-cli webpack-dev-server style-loader css-loader babel-loader
```

Create a new file at the root of the project called *webpack.config.js*. This file exports an object with webpack’s configuration.

```js
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
```