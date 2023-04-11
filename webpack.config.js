const path = require("path");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const Components = require("./components.json");
const args = require("minimist")(process.argv.slice(2));
// const config = require('./build-config');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const happyConfig = require("./happyConfig/happy-config");
const loaderConfig = require("./happyConfig/happy-loader");

// 大驼峰转中横线
const kebabCase = function (str) {
  const hyphenateRE = /([^-])([A-Z])/g;
  return str
    .replace(hyphenateRE, "$1-$2")
    .replace(hyphenateRE, "$1-$2")
    .toLowerCase();
};

const conversionComponents = {};

if (Components && Object.keys(Components).length) {
  let _keyList = Object.keys(Components);
  _keyList.forEach((_comp) => {
    conversionComponents[kebabCase(_comp)] = Components[_comp];
  });
}

process.env.NODE_ENV = "production";
const argsList = args["comp"] && args["comp"].split(",");
let _Components = {};
if (argsList) {
  let compKeys = Object.keys(conversionComponents);
  compKeys.forEach((comp) => {
    if (argsList.includes(comp)) {
      _Components[comp] = conversionComponents[comp];
    }
  });
} else {
  _Components = conversionComponents;
}

const webpackConfig = {
  mode: "production",
  entry: _Components,
  output: {
    path: path.resolve(process.cwd(), "./packages/"),
    publicPath: "/dist/",
    filename: "[name]/[name].js",
    chunkFilename: "[id].js",
    libraryTarget: "commonjs2",
  },
  resolve: {
    extensions: [".js", ".vue", ".json", ".ts"],
    alias: {
      src: path.resolve(__dirname, "../src"),
    },
    modules: ["node_modules"],
  },
  externals: [{vue: 'vue'}],
  performance: {
    hints: false,
  },
  stats: "none",
  module: {
    rules: loaderConfig.happypack || loaderConfig.normal,
  },
  plugins: [
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    // new BundleAnalyzerPlugin()
    ...happyConfig,
    new MiniCssExtractPlugin({
      filename: "../style/[name].css",
    }),
    new OptimizeCssAssetsPlugin({
      sourceMap: false,
      cssnanoOptions: {
        preset: [
          "default",
          {
            mergeLonghand: false,
            cssDeclarationSorter: false,
          },
        ],
      },
    }),
  ],
};

module.exports = webpackConfig;
