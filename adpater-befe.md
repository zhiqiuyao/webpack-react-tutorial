如何引入一个未publish的代码（既没有发布到npmjs，也无法通过npm install by git-repo引入）？

答案是 [git submodule](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97)!

创建子模块目录```packages```
```bash
mkdir packages
cd packages
git submodule add ssh://g@gitlab.baidu.com:8022/be-fe/erp-comps-react-mobx.git
```

```bash
npm i babel-preset-stage-1 babel-plugin-transform-decorators-legacy css-loader style-loader file-loader url-loader html-loader less less-loader -D
# autoprefixer-loader 
npm i classnames mobx mobx-react detect-browser -S
```

