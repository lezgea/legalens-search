const path = require('path')

const nextReactSvgConfig = {
    include: path.resolve(__dirname, 'src/assets/icons'),
}


const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
}

const withReactSvg = require('next-react-svg')(nextReactSvgConfig)



module.exports = withReactSvg(nextConfig)
