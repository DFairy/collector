const webpack = require('webpack')
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: './',
    chainWebpack(config) {
        config.resolve.alias
            .set('components', resolve('src/components'))
            .set('views', resolve('src/views'))
            .set('common', resolve('src/common'))
        config.plugin('context')
            .use(webpack.ContextReplacementPlugin, [/moment[/\\]locale$/, /zh-cn/])
    },
    /**
     * 打包后没有map
     */
    productionSourceMap: false
}