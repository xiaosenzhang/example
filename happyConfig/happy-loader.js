const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 导出 分包 和 总包 的loader配置，配合happypack使用
const path = require('path');
module.exports = {
    normal:[
        // {
        //     test: /\.tsx?$/,
        //     loader: 'ts-loader',
        //     options: { appendTsSuffixTo: [/\.vue$/] }
        // },
        {
            test: /\.(jsx?|babel|es6)$/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        },
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                compilerOptions: {
                    preserveWhitespace: false,
                    whitespace: 'condense'
                }
            }
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
                // 将 JS 字符串生成为 style 节点
                MiniCssExtractPlugin.loader,
                // 将 CSS 转化成 CommonJS 模块
                'css-loader',
                // 将 Sass 编译成 CSS
                'sass-loader',
            ],
        },
        {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader']
        },
        {
            test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
            loader: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024 // 10kb
              }
            }
        }
    ],
    happypack: [
        // {
        //     test: /\.tsx?$/,
        //     use: ['happypack/loader?id=ts'],
        // },
        {
            test: /\.(jsx?|babel|es6)$/,
            use: ['happypack/loader?id=babel'],
        },
        {
          test: /\.vue$/,
          loader: "vue-loader",
          options: {
            loaders: {
              js: "happypack/loader?id=babel"
            },
            compilerOptions: {
              preserveWhitespace: false,
              whitespace: "condense"
            }
          }
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
                // 将 JS 字符串生成为 style 节点
                MiniCssExtractPlugin.loader,
                // 将 CSS 转化成 CommonJS 模块
                'css-loader',
                // 将 Sass 编译成 CSS
                'sass-loader',
            ],
        },
        {
            test: /\.css$/,
            use: ['happypack/loader?id=css'],
        },
        {
            test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
            loader: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024 // 10kb
              }
            }
        }
    ]
}