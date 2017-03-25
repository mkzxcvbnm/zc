const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC_PATH = path.resolve(__dirname, 'src');
const DIST_PATH = path.resolve(__dirname, 'dist');
const node_modules = path.resolve(__dirname, 'node_modules');

module.exports = {
    entry: {
        main: path.resolve(SRC_PATH, 'index.js'),
        common: ['vue', 'vue-router', 'vuex'],
        jquery: ['jquery'],
        swiper: path.resolve(SRC_PATH, 'js/swiper.min.js'),
        moment: ['moment']
    },
    output: {
        filename: '[name]-[hash].js',
        path: DIST_PATH
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'style-loader!css-loader!sass-loader'
                    },
                    postcss: [
                        require('autoprefixer')({
                            browsers: [
                                '> 1%',
                                'last 4 versions',
                                'Safari >= 6',
                                'iOS 7'
                            ] 
                        })
                    ]
                }
            },
            {
                test: /\.css|scss|sass$/,
                loaders: 'style-loader!css-loader!postcss-loader!sass-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=6000'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader" 
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015'
            }
        ]
    },
    resolve: {
        //配置别名，在项目中可缩减引用路径
        alias: {
            'vue' : path.resolve(node_modules, 'vue/dist/vue.common.js'),
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            options: {
                babel: {
                    presets: ['es2015', 'stage-0'],
                    plugins: ['transform-runtime']
                },
            }
        }),
        //提供全局的变量，在模块中使用无需用require引入
        new webpack.ProvidePlugin({
            $: 'jquery',
            vue: 'vue',
            vuex: 'vuex',
            mk: path.resolve(SRC_PATH, 'js/mk.js'),
        }),
        //将公共代码抽离出来合并为一个文件
        new webpack.optimize.CommonsChunkPlugin({
            name: ['common', 'jquery', 'moment', 'swiper'],
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            title: 'demo',
            filename: 'index.html',
            template: SRC_PATH + '/index.html',//Webpack需要模板的路径
            inject: true,//当传递true或'body'所有javascript资源将放置在body元素的底部。'head'将脚本放置在head元素中
            favicon: 'src/favicon.ico',//将给定图标路径输出HTML
            minify: {
                removeComments: true,//删除HTML注释
                collapseWhitespace: true//折叠文档树中文本节点间的空白
            },
            hash: true,
            cache: true,
            showErrors: true,//错误的详细信息将被写入HTML页面
            chunks: '',//允许您仅添加一些块（例如，只有单元测试块）
            chunksSortMode: 'auto',//允许控制如何在块被包括到html之前应该如何排序。允许值：'none'| 'auto'| 'dependency'| {function}
            excludeChunks: '',//允许您跳过一些块（例如，不添加单元测试块）
            xhtml: true//如果true将link标签呈现为自我关闭，则符合XHTML
        })
    ]
};