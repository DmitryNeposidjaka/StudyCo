// webpack.config.js

module.exports = {
    rules: [
        {
            test: /\.s(c|a)ss$/,
            use: [
                'vue-style-loader',
                'css-loader',
                {
                    loader: 'sass-loader',
                    // Requires sass-loader@^7.0.0
                    options: {
                        implementation: require('sass'),
                        fiber: require('fibers'),
                        indentedSyntax: true // optional
                    }
                }
            ]
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
                'file-loader'
            ]
        },
    ],
    plugins: [
        new CopyWebpackPlugin([
            {from:'src/images/*',to:'dist/images'}
        ]),
    ]
}