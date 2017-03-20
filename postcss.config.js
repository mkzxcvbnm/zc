module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: [
                '> 1%',
                'last 4 versions',
                'Safari >= 6',
                'iOS 7'
            ] 
        })
    ]
}