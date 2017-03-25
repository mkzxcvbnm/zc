# 使用说明
### 安装
npm i
### 开发模式1
npm run hot     (hot inline模式 不会生成文件 预览地址http://localhost:8080)
### 开发模式2
npm run dev     (watch模式会生成文件 输出目录dist)
### 开发模式3
npm run map     (相比开发模式2 多提供一个source map)
### 生产模式
npm run build   (-p 压缩)
- - -
# rem 关系
1rem = 100px = (750 视觉稿)
- - -
# 目录结构
<pre>
┌── dist                        # 打包后生成的文件
│
├── node_modules                # node模块(开发环境)
│
├── .babelrc                    # babel转码配置文件
│
├── .gitattributes              # 指定非文本文件的对比合并方式
│
├── .gitignore                  # 忽略无需git控制的文件  比如 node_modules
│
├── package.json                # 项目配置
│
├── postcss.config.js           # postcss-loader配置文件
│
├── README.md                   # 项目说明
│
├── webpack.config.babel.js     # webpack生产环境配置文件
│
├── webpack.dev.babel.js        # webpack开发环境配置文件
│
└── src                         # 源代码
    │
    ├── css                     # 样式文件
    │
    ├── img                     # 图片资源
    │
    ├── index                   # 首页模块
    │
    ├── js                      # 脚本代码
    │
    ├── partake                 # 众筹项目模块
    │
    ├── project                 # 项目模块
    │
    ├── public                  # 公共模块
    │
    ├── vuex                    # vue状态管理
    │
    ├── favicon.ico             # 网站图标
    │
    ├── index.html              # webpack打包输出模板
    │
    ├── index.js                # vue入口(包含路由)
    │
    └── main.vue                # 路由根
</pre>
