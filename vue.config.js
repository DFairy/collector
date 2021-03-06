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
    },
    /**
     * 打包后没有map
     */
    productionSourceMap: false,
    // devServer: {
    //     proxy: {
    //         '': {
    //             target: 'http://106.13.94.82:3000',
    //             changeOrigin: true,
    //             ws: true

    //         }
    //     }
    // },
}