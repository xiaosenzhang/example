const os = require('os');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = [
    new HappyPack({
        id: 'babel',
        loaders: [{
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }],
        threadPool: happyThreadPool
    }),
    // new HappyPack({
    //     id: 'ts',
    //     loaders: [{
    //         loader: 'ts-loader',
    //         query: { happyPackMode: true },
    //         options: { appendTsSuffixTo: [/\.vue$/] }
    //     }],
    //     threadPool: happyThreadPool
    // }),
    new HappyPack({
        id: 'sass',
        loaders: [
            // 将 JS 字符串生成为 style 节点
            MiniCssExtractPlugin.loader,
            // 将 CSS 转化成 CommonJS 模块
            'css-loader',
            // 将 Sass 编译成 CSS
            'sass-loader'
        ],
        threadPool: happyThreadPool
    }),
    new HappyPack({
        id: 'css',
        loaders: [MiniCssExtractPlugin.loader, 'css-loader'],
        threadPool: happyThreadPool
    })
]

module.exports = config;