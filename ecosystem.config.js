module.exports = [
    {
        script: 'dist/src/main.js',
        name: 'app',
        exec_mode: 'cluster',
        instances: 'max',
    },
]
