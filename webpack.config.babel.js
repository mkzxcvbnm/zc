const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const SRC_PATH = path.resolve(__dirname, 'src');
const DIST_PATH = path.resolve(__dirname, 'dist');
const node_modules = path.resolve(__dirname, 'node_modules');

module.exports = {
    entry: {
        main: path.resolve(SRC_PATH, 'index.js'),
        common: ['vue', 'vue-router', 'vuex', 'vue-resource'],
        //jquery: 'jquery',
        swiper: 'swiper',
        velocity: 'velocity-animate',
        lodash: 'lodash',
        moment: 'moment/min/moment.min.js',
        mk: path.resolve(SRC_PATH, 'js/mk.js'),
        weui: 'weui',
        font: 'font-awesome-webpack',
    },
    output: {
        filename: '[name]-[hash:8].js',
        path: DIST_PATH
    },
    module: {
        noParse: [/moment.min/],//不再扫描这个文件中的依赖
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
                loader: 'url-loader?limit=10000&name=img/[name]-[hash:8].[ext]'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader?name=fonts/[name].[ext]"
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
            'vue$': 'vue/dist/vue.common.js'//vue 独立构建
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist/**/*'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),
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
            //$: 'jquery',
            Vue: 'vue',
            Vuex: 'vuex',
            velocity: 'velocity',
            _: 'lodash',
            moment: 'moment/min/moment.min.js',
            mk: path.resolve(SRC_PATH, 'js/mk.js'),
        }),
        //将公共代码抽离出来合并为一个文件
        new webpack.optimize.CommonsChunkPlugin({
            name: ['main', 'common', 'jquery', 'swiper', 'velocity', 'lodash', 'moment', 'mk', 'weui', 'font'],
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            title: 'demo',
            filename: 'index.html',
            template: path.resolve(SRC_PATH, 'index.html'),//Webpack需要模板的路径
            inject: true,//当传递true或'body'所有javascript资源将放置在body元素的底部。'head'将脚本放置在head元素中
            favicon: path.resolve(SRC_PATH, 'favicon.ico'),//将给定图标路径输出HTML
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