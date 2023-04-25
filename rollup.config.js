import babel from 'rollup-plugin-babel'
export default {
    input: './src/index.js',//入口
    output: {
        file: './dist/vue.js',//出口
        name: 'Vue',
        format: 'umd',
        sourecemap: true,//可以调试源码
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        })
    ]
}