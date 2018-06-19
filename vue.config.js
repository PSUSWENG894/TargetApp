/* eslint-disable */
module.exports = {
    pwa: {
        name: 'Travis CI Dashboard',
        themeColor: '#4DBA87',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        // configure the workbox plugin
        workboxPluginMode: 'GenerateSW'
    },
    configureWebpack: {
        output: {
            publicPath: ''
        }
    }
}