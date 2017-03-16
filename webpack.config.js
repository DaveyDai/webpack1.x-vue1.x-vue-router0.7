var path = require('path');
var webpack = require('webpack');
var vue = require("vue-loader");

//定义了文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src/main.js');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

var plugins = [
	//压缩js 
	//	 new webpack.optimize.UglifyJsPlugin({minimize: true}),
	//提公用js到common.js文件中
	new webpack.optimize.CommonsChunkPlugin('common.js'),
	//jq
	new webpack.ProvidePlugin({
      $:"jquery",
      jQuery:"jquery",
      "window.jQuery":"jquery"
    })
	//将样式统一发布到style.css中
	//new ExtractTextPlugin("style.css", {
	//  allChunks: true
	//}),
	// 使用 ProvidePlugin 加载使用率高的依赖库
	//new webpack.ProvidePlugin({
	//  $: 'webpack-zepto'
	//})
];
module.exports = {
	//项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
	entry: {
		build: APP_PATH
	},
	//输出的文件名 合并以后的js会命名为bundle.js
	output: {
		path: BUILD_PATH,
		filename: '[name].js',
		// 指向异步加载的路径
		publicPath: './build/',
		// 非主文件的命名规则
		chunkFilename: '[id].build.js?[chunkhash]'
	},
    // 服务器配置相关，自动刷新！
    devServer: {
        historyApiFallback: true,
        hot: false,
        inline: true,
        grogress: true
    },	
	// 加载器
	module: {
		// 加载器
		loaders: [
			// 解析.vue文件
			{
				test: /\.vue$/,
				loader: 'vue'
			},
			// 转化ES6的语法
			// { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
			// 编译css并自动添加css前缀
			{
				test: /\.css$/,
				loader: 'style!css'
			},
			//.scss 文件想要编译，scss就需要这些东西！来编译处理
			//install css-loader style-loader sass-loader node-sass --save-dev
			// {test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
			// 图片转化，小于8K自动转化为base64的编码
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'url-loader?limit=8192'
			},
			//html模板编译？
			{
				test: /\.(html|tpl)$/,
				loader: 'html-loader'
			},
		]
	},
	// .vue的配置。需要单独出来配置，其实没什么必要--因为我删了也没保错，不过这里就留这把，因为官网文档里是可以有单独的配置的。
	vue: {
		loaders: {
			css: 'style!css',
		}
	},
	plugins: plugins
};