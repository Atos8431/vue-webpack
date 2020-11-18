const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    autoprefixer(),
  ],
}
//postcss是后处理css，stylus编译成css后，使用postcss优化css