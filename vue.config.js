/* eslint-disable */
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    pwa: {
        name: 'Travis CI Dashboard',
        themeColor: '#4DBA87',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        // configure the workbox plugin
        workboxPluginMode: 'GenerateSW',
        workboxOptions: {
            // Exclude images from the precache
            exclude: [/\.(?:png|jpg|jpeg|svg)$/]
        }
    },
    configureWebpack: {
        output: {
            publicPath: process.env.NODE_ENV === 'production' ?
                '' : '/'
        },
        plugins: [
            new CopyWebpackPlugin([{
                from: path.resolve(__dirname, './static'),
                to: path.resolve(__dirname, './dist'),
                ignore: ['.*']
            }]),
        ]
    }
}