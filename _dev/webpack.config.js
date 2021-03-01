const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const LicenseCheckerWebpackPlugin = require('license-checker-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development', // 本番用（開発ならdevelopment（圧縮されない））

    // エントリーポイントの設定
    entry: {
        run: './src/js/index.js',
    },

    // 出力の設定
    output: {
        // 出力ファイルのディレクトリ名
        path: path.join(__dirname, '../js/'),
        // 出力ファイル名
        filename: '[name].js',
    },

    // ローダーの設定
    module: {
        rules: [
            // babel-loader
            {
                test: /\.js$/u,
                exclude: /node_modules/u,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    modules: false,
                                    useBuiltIns: 'usage',
                                    targets: [
                                        '>0.25%',
                                        'ie >= 11',
                                    ],
                                    corejs: 3,
                                    debug: true,
                                }],
                            ],
                        },
                    },
                ],
            },

            // eslint-loader
            // {
            //     enforce: 'pre',
            //     test: /\.js$/u,
            //     exclude: /node_modules/u,
            //     loader: 'eslint-loader',
            //     options: {
            //         fix: true,
            //     },
            // },
        ],
    },

    plugins: [
        new webpack.BannerPlugin({
            banner: 'For license information please see LICENSE.txt',
        }),

        // ライセンスの文言を表示するため
        new LicenseCheckerWebpackPlugin({
            allow: '(Apache-2.0 OR MIT OR W3C-20150513)',
            outputFilename: 'LICENSE.txt',
            override: {
                'intersection-observer@0.11.0': {licenseText: `intersection-observer: https://github.com/w3c/IntersectionObserver

Copyright 2016 Google Inc. All Rights Reserved
Licensed under the W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE

https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document`},
            },
        }),
    ],


    optimization: {
        // js圧縮
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    compress: {
                        // console.log削除
                        drop_console: true,
                    },
                    output: {
                        // コメントアウト削除
                        comments: false,
                    },
                },
            }),
        ],
    },
};
