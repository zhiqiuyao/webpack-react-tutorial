# webpack-react-tutorial
使用webpack手动搭建react应用

创建项目目录
```bash
mkdir webpack-react-tutorial && cd webpack-react-tutorial

mkdir -p src

npm init -y
touch .gitignore
```

填写 .gitignore 文件

```
**/node_modules

```

安装相关安装包
```bash
npm i webpack webpack-cli --save-dev
```

更新 package.json
```json
"scripts": {
  "build": "webpack --mode production"
}
```

在webpack中配置babel
```bash
npm i babel-loader babel-core babel-preset-env babel-preset-react --save-dev
touch .babelrc webpack.config.js
```

填写 .babelrc 文件
```json
{
  "presets": ["env", "react"]
}
```

填写 webpack.config.js 文件
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
```

安装 react 包
```bash
npm i react react-dom prop-types --save-dev

touch src/index.js
mkdir -p src/js/components/{container,presentational}

touch src/js/components/container/FormContainer.js
touch src/js/components/presentational/Input.js
```
index.js
```js
import FormContainer from "./js/components/container/FormContainer";
```

FormContainer.js 内容
```js
import React, { Component } from "react";
import ReactDOM from "react-dom";
class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };
  }
  render() {
    return (
      <form id="article-form">
      </form>
    );
  }
}
export default FormContainer;
```

Input.js
```js
import React from "react";
import PropTypes from "prop-types";
const Input = ({ label, text, type, id, value, handleChange }) => (
  <div className="form-group">
    <label htmlFor={label}>{text}</label>
    <input
      type={type}
      className="form-control"
      id={id}
      value={value}
      onChange={handleChange}
      required
    />
  </div>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};
export default Input;
```

运行```npm run build```，将会看到bundle的文件```./dist/main.js```

```bash
npm i html-webpack-plugin html-loader --save-dev
```
webpack.config.js
```js
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
```

```./src/index.html```
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" >
    <title>How to set up React, Webpack, and Babel</title>
</head>
<body>
    <div class="container">
        <div class="row mt-5">
            <div class="col-md-4 offset-md-1">
                <p>Create a new article</p>
                <div id="create-article-form">
                    <!-- form -->
                </div>
            </div>
        </div>
    </div>
</body>
</html>
```

```./src/js/components/container/FormContainer.js``` 底部新增

```js
const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;
```

```bash
npm i webpack-dev-server --save-dev
```

```json
"scripts": {
  "start": "webpack-dev-server --open --mode development",
  "build": "webpack"
}
```

```bash
npm start
```
