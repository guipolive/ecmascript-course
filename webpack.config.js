module.exports = {
    entry: ['@babel/polyfill', './src/main.js'], // carregando a lib babel polyfill e depois nosso arquivo principal
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: __dirname + '/public',
        // historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ],
    },
};